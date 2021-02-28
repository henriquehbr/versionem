import { existsSync, readFileSync, writeFileSync, statSync, rmSync } from 'fs'
import { join } from 'path'

import outdent from 'outdent'

import { generateExampleRepo } from './generate-example-repo'
import { dirname } from '../src/dirname'
import { versionem } from '../src/index'
import { commit } from './utils/commit'
import { getCommitHash } from './utils/get-commit-hash'

const __dirname = dirname(import.meta.url)
const exampleRepoPath = join(__dirname, 'example-repo')

it('Generates a single entry on "Updates" section', async () => {
  await generateExampleRepo()

  writeFileSync(join(exampleRepoPath, 'index.js'), 'console.log("Hello World!")\n', 'utf-8')

  await commit('chore: add "Hello World!"', { cwd: exampleRepoPath })

  await versionem({ cwd: exampleRepoPath, noPush: true, silent: true })

  const changelogPath = join(exampleRepoPath, 'CHANGELOG.md')
  const changelogContent = readFileSync(changelogPath, 'utf-8')

  /* Use last modified time instead actual date to avoid possible 1% edge cases conflicts where
    the changelog is generated exactly 23:59 and the tests are run at 00:00 */
  const [lastModified] = statSync(changelogPath).mtime.toISOString().split('T')

  const commitBeforeReleaseHash = await getCommitHash({ ref: 'v0.0.1~1', cwd: exampleRepoPath })

  const expectedChangelog = outdent`
      # Changelog

      ## 0.0.1

      _${lastModified}_

      ### Updates

      - add "Hello World!" (${commitBeforeReleaseHash})
    `

  expect(changelogContent).toBe(expectedChangelog)
})
