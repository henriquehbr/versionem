import { existsSync, writeFileSync, readFileSync, statSync, rmSync } from 'fs'
import { join } from 'path'

import execa from 'execa'
import outdent from 'outdent'

import { generateExampleRepo } from './generate-example-repo'
import { dirname } from '../src/dirname'
import { versionem } from '../src/index'

const __dirname = dirname(import.meta.url)
const exampleRepoPath = join(__dirname, 'example-repo')

// TODO: create commit util for testing purposes that returns the hash
it('--unreleased flag works properly', async () => {
  existsSync(exampleRepoPath) && rmSync(exampleRepoPath, { recursive: true, force: true })
  await generateExampleRepo()

  const changelogPath = join(exampleRepoPath, 'CHANGELOG.md')

  writeFileSync(join(exampleRepoPath, 'index.js'), 'console.log("Hello World!")\n', 'utf-8')

  let params = ['add', '.']
  await execa('git', params, { cwd: exampleRepoPath })

  params = ['commit', '-m', 'chore: add "Hello World!"']
  await execa('git', params, { cwd: exampleRepoPath })

  params = ['rev-parse', '--short', 'HEAD']
  const { stdout: firstCommitHash } = await execa('git', params, { cwd: exampleRepoPath })

  await versionem({ cwd: exampleRepoPath, noPush: true, silent: true })

  /* Use last modified time instead actual date to avoid possible 1% edge cases conflicts where
    the changelog is generated exactly 23:59 and the tests are run at 00:00 */
  const [lastModified] = statSync(changelogPath).mtime.toISOString().split('T')

  writeFileSync(join(exampleRepoPath, 'lipsum.js'), 'console.log("Lipsum!")\n', 'utf-8')

  params = ['add', '.']
  await execa('git', params, { cwd: exampleRepoPath })

  params = ['commit', '-m', 'feat: add "Lipsum"']
  await execa('git', params, { cwd: exampleRepoPath })

  params = ['rev-parse', '--short', 'HEAD']
  const { stdout: secondCommitHash } = await execa('git', params, { cwd: exampleRepoPath })

  await versionem({ cwd: exampleRepoPath, unreleased: true, noPush: true, silent: true })

  const changelogContent = readFileSync(changelogPath, 'utf-8')

  const expectedChangelog = outdent`
    # Changelog

    ## Unreleased

    ### Features

    - add "Lipsum" (${secondCommitHash})

    ## 0.0.1

    _${lastModified}_

    ### Updates

    - add "Hello World!" (${firstCommitHash})
  `

  expect(expectedChangelog).toBe(changelogContent)
})
