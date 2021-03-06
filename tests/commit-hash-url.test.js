import { writeFileSync, readFileSync, statSync } from 'fs'
import { join } from 'path'

import execa from 'execa'
import outdent from 'outdent'

import { dirname } from '../src/dirname'
import { versionem } from '../src/index'
import { generateExampleRepo } from './utils/generate-example-repo'
import { commit } from './utils/commit'

const __dirname = dirname(import.meta.url)
const exampleRepoPath = join(__dirname, 'example-repo')

it('properly fetch remote repo url for commit hash links', async () => {
  await generateExampleRepo()

  writeFileSync(join(exampleRepoPath, 'index.js'), 'console.log("Hello World!")\n', 'utf-8')
  const firstCommitHash = await commit('chore: hello world', { cwd: exampleRepoPath })

  await versionem({ cwd: exampleRepoPath, noPush: true, silent: true })

  let params = ['remote', 'add', 'origin', 'https://github.com/henriquehbr/versionem']
  await execa('git', params, { cwd: exampleRepoPath })

  writeFileSync(join(exampleRepoPath, 'foobar.js'), 'console.log("foobar")\n', 'utf-8')
  const secondCommitHash = await commit('feat: foobar', { cwd: exampleRepoPath })

  writeFileSync(join(exampleRepoPath, 'lipsum.js'), 'console.log("lorem ipsum")\n', 'utf-8')
  await commit('fix: lipsum', { cwd: exampleRepoPath })

  await versionem({ cwd: exampleRepoPath, unreleased: true, noPush: true, silent: true })

  const changelogPath = join(exampleRepoPath, 'CHANGELOG.md')
  const changelogContent = readFileSync(changelogPath, 'utf-8')

  /* Use last modified time instead actual date to avoid possible 1% edge cases conflicts where
    the changelog is generated exactly 23:59 and the tests are run at 00:00 */
  const [lastModified] = statSync(changelogPath).mtime.toISOString().split('T')

  params = ['config', '--get', 'remote.origin.url']
  const { stdout: remoteUrl } = await execa('git', params, { cwd: exampleRepoPath })

  const expectedChangelog = outdent`
    # Changelog

    ## Unreleased

    ### Features

    - foobar ([${secondCommitHash}](${remoteUrl}/commit/${secondCommitHash}))

    ### Bugfixes

    - lipsum ([HEAD](${remoteUrl}/commit/HEAD))

    ## 0.0.1

    _${lastModified}_

    ### Updates

    - hello world (${firstCommitHash})
  `

  expect(changelogContent).toBe(expectedChangelog)
})
