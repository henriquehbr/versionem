import { existsSync, readFileSync, statSync } from 'fs'
import { join } from 'path'

import outdent from 'outdent'
import rimraf from 'rimraf'
import execa from 'execa'

import { generateExampleRepo } from './generate-example-repo'
import { dirname } from '../src/dirname'
import { versionem } from '../src/index'

const __dirname = dirname(import.meta.url)
const exampleRepo = join(__dirname, 'example-repo')

beforeAll(async () => {
  existsSync(exampleRepo) && rimraf.sync(exampleRepo)
  await generateExampleRepo()
})

describe('changelog', () => {
  test('single chore', async () => {
    await versionem({ cwd: exampleRepo, noPush: true })

    const changelogPath = join(exampleRepo, 'CHANGELOG.md')
    const changelogContent = readFileSync(changelogPath, 'utf-8')

    /* Use last modified time instead actual date to avoid possible 1% edge cases conflicts where
    the changelog is generated exactly 23:59 and the tests are run at 00:00 */
    const [lastModified] = statSync(changelogPath).mtime.toISOString().split('T')

    let params = ['rev-parse', '--short', 'v0.0.1~1']
    const { stdout: latestCommitHash } = await execa('git', params, { cwd: exampleRepo })

    const expectedChangelog = outdent`
      # Changelog

      ## v0.0.1

      _${lastModified}_

      ### Updates

      - add "Hello World!" (${latestCommitHash})
    `

    expect(changelogContent).toBe(expectedChangelog)
  })
})
