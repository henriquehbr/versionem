import { existsSync, readFileSync, writeFileSync, statSync } from 'fs'
import { join } from 'path'

import outdent from 'outdent'
import rimraf from 'rimraf'
import execa from 'execa'

import { generateExampleRepo } from './generate-example-repo'
import { dirname } from '../src/dirname'
import { versionem } from '../src/index'

const __dirname = dirname(import.meta.url)
const exampleRepoPath = join(__dirname, 'example-repo')

beforeAll(async () => {
  existsSync(exampleRepoPath) && rimraf.sync(exampleRepoPath)
  await generateExampleRepo()
})

describe('changelog', () => {
  test('single chore', async () => {
    writeFileSync(join(exampleRepoPath, 'index.js'), 'console.log("Hello World!")\n', 'utf-8')

    let params = ['add', '.']
    await execa('git', params, { cwd: exampleRepoPath })

    params = ['commit', '-m', 'chore: add "Hello World!"']
    await execa('git', params, { cwd: exampleRepoPath })

    await versionem({ cwd: exampleRepoPath, noPush: true, silent: true })

    const changelogPath = join(exampleRepoPath, 'CHANGELOG.md')
    const changelogContent = readFileSync(changelogPath, 'utf-8')

    /* Use last modified time instead actual date to avoid possible 1% edge cases conflicts where
    the changelog is generated exactly 23:59 and the tests are run at 00:00 */
    const [lastModified] = statSync(changelogPath).mtime.toISOString().split('T')

    params = ['rev-parse', '--short', 'v0.0.1~1']
    const { stdout: latestCommitHash } = await execa('git', params, { cwd: exampleRepoPath })

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
