import { readFileSync, statSync } from 'fs'
import { join } from 'path'

import outdent from 'outdent'

import { generateExampleRepo } from './utils/generate-example-repo'
import { dirname } from '../src/dirname'
import { versionem } from '../src/index'
import { commit } from './utils/commit'

const __dirname = dirname(import.meta.url)
const exampleRepoPath = join(__dirname, 'example-repo')

it('--regenChangelog flag works', async () => {
  await generateExampleRepo()

  const firstCommitHash = await commit('fix: hello world', { cwd: exampleRepoPath })
  await versionem({ cwd: exampleRepoPath, noPush: true, silent: true })

  const secondCommitHash = await commit('feat: lipsum', { cwd: exampleRepoPath })
  await versionem({ cwd: exampleRepoPath, noPush: true, silent: true })

  const thirdCommitHash = await commit('chore!: foobar', { cwd: exampleRepoPath })
  await versionem({ cwd: exampleRepoPath, noPush: true, silent: true })

  await commit('refactor: versionem', { cwd: exampleRepoPath })
  // Unreleased mode doesn't commit it's changes
  await versionem({
    cwd: exampleRepoPath,
    unreleased: true,
    regenChangelog: true,
    noPush: true,
    silent: true
  })

  const changelogPath = join(exampleRepoPath, 'CHANGELOG.md')

  /* Use last modified time instead actual date to avoid possible 1% edge cases conflicts where
    the changelog is generated exactly 23:59 and the tests are run at 00:00 */
  // FIXME: return "lastModified" from API (inside object)
  const [lastModified] = statSync(changelogPath).mtime.toISOString().split('T')

  const changelogContent = readFileSync(changelogPath, 'utf-8')

  const expectedChangelog = outdent`
    # Changelog

    ## Unreleased

    ### Updates

    - versionem (HEAD)

    ## 1.0.0

    _${lastModified}_
    
    ### Breaking changes

    - chore!: foobar (${thirdCommitHash})

    ## 0.1.0

    _${lastModified}_

    ### Features

    - lipsum (${secondCommitHash})

    ## 0.0.1

    _${lastModified}_

    ### Bugfixes

    - hello world (${firstCommitHash})
  `

  expect(changelogContent).toBe(expectedChangelog)
}, 30000)
