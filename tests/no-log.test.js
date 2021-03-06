import { existsSync } from 'fs'
import { join } from 'path'

import { generateExampleRepo } from './utils/generate-example-repo'
import { dirname } from '../src/dirname'
import { versionem } from '../src/index'
import { commit } from './utils/commit'

const __dirname = dirname(import.meta.url)
const exampleRepoPath = join(__dirname, 'example-repo')

it('--noLog flag works', async () => {
  await generateExampleRepo()
  await commit('chore: hello world', { cwd: exampleRepoPath })
  await versionem({ cwd: exampleRepoPath, noLog: true, noPush: true, silent: true })

  const logPath = join(exampleRepoPath, 'CHANGELOG.md')
  const changelogExists = existsSync(logPath)

  expect(changelogExists).toBeFalsy()
})
