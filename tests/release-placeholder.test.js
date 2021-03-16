import { join } from 'path'
import { statSync, readFileSync } from 'fs'

import { outdent } from 'outdent'

import { dirname } from '../src/dirname'
import { versionem } from '../src/index'
import { generateExampleRepo } from './utils/generate-example-repo'
import { commit } from './utils/commit'

const __dirname = dirname(import.meta.url)
const exampleRepoPath = join(__dirname, 'example-repo')

it('Display custom placeholder message on release with unknown commits', async () => {
  await generateExampleRepo()

  const firstCommitHash = await commit('chore: hello world', { cwd: exampleRepoPath })
  await versionem({ cwd: exampleRepoPath, noPush: true, silent: true })

  const changelogPath = join(exampleRepoPath, 'CHANGELOG.md')

  /* Use last modified time instead actual date to avoid possible 1% edge cases conflicts where
  the changelog is generated exactly 23:59 and the tests are run at 00:00 */
  const [lastModified] = statSync(changelogPath).mtime.toISOString().split('T')

  await commit('alpha: lipsum', { cwd: exampleRepoPath })
  await versionem({
    cwd: exampleRepoPath,
    force: true,
    unreleased: true,
    releasePlaceholder: 'No notable changes here',
    noPush: true,
    silent: true
  })

  const changelogContent = readFileSync(changelogPath, 'utf-8')

  const expectedChangelog = outdent`
    # Changelog

    ## Unreleased

    - No notable changes here

    ## 0.0.1

    _${lastModified}_

    ### Updates

    - hello world (${firstCommitHash})
  `

  expect(changelogContent).toBe(expectedChangelog)
})
