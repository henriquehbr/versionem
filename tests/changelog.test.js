import { readFileSync, statSync } from 'fs'
import { join } from 'path'

import outdent from 'outdent'

import { dirname } from '../src/dirname'
import { versionem } from '../src/index'
import { generateExampleRepo } from './utils/generate-example-repo'
import { commit } from './utils/commit'

const __dirname = dirname(import.meta.url)
const exampleRepoPath = join(__dirname, 'example-repo')

it('Generates a single entry on "Updates" section', async () => {
  await generateExampleRepo()
  const commitHash = await commit('chore: hello world', { cwd: exampleRepoPath })
  await versionem({ cwd: exampleRepoPath, noPush: true, silent: true })

  const changelogPath = join(exampleRepoPath, 'CHANGELOG.md')
  const changelogContent = readFileSync(changelogPath, 'utf-8')

  /* Use last modified time instead actual date to avoid possible 1% edge cases conflicts where
    the changelog is generated exactly 23:59 and the tests are run at 00:00 */
  const [lastModified] = statSync(changelogPath).mtime.toISOString().split('T')

  const expectedChangelog = outdent`
    # Changelog

    ## 0.0.1

    _${lastModified}_

    ### Updates

    - hello world (${commitHash})
  `

  expect(changelogContent).toBe(expectedChangelog)
})
