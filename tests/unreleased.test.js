import { writeFileSync, readFileSync, statSync } from 'fs'
import { join } from 'path'

import outdent from 'outdent'

import { dirname } from '../src/dirname'
import { versionem } from '../src/index'
import { generateExampleRepo } from './utils/generate-example-repo'
import { commit } from './utils/commit'
import { getCommitHash } from './utils/get-commit-hash'

const __dirname = dirname(import.meta.url)
const exampleRepoPath = join(__dirname, 'example-repo')

it('--unreleased flag works', async () => {
  await generateExampleRepo()

  const changelogPath = join(exampleRepoPath, 'CHANGELOG.md')

  writeFileSync(join(exampleRepoPath, 'index.js'), 'console.log("Hello World!")\n', 'utf-8')
  const firstCommitHash = await commit('chore: hello world', { cwd: exampleRepoPath })
  await versionem({ cwd: exampleRepoPath, noPush: true, silent: true })

  /* Use last modified time instead actual date to avoid possible 1% edge cases conflicts where
    the changelog is generated exactly 23:59 and the tests are run at 00:00 */
  const [lastModified] = statSync(changelogPath).mtime.toISOString().split('T')

  writeFileSync(join(exampleRepoPath, 'lipsum.js'), 'console.log("Lipsum!")\n', 'utf-8')
  await commit('feat: lipsum', { cwd: exampleRepoPath })
  await versionem({ cwd: exampleRepoPath, unreleased: true, noPush: true, silent: true })
  const secondCommitHash = await getCommitHash({ cwd: exampleRepoPath })

  writeFileSync(join(exampleRepoPath, 'foobar.js'), 'console.log("foobar")\n', 'utf-8')
  await commit('fix: foobar', { cwd: exampleRepoPath })
  await versionem({ cwd: exampleRepoPath, unreleased: true, noPush: true, silent: true })

  const changelogContent = readFileSync(changelogPath, 'utf-8')

  const expectedChangelog = outdent`
    # Changelog

    ## Unreleased

    ### Features

    - lipsum (${secondCommitHash})

    ### Bugfixes

    - foobar (HEAD)

    ## 0.0.1

    _${lastModified}_

    ### Updates

    - hello world (${firstCommitHash})
  `

  expect(expectedChangelog).toBe(changelogContent)
})
