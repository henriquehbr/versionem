import { existsSync, writeFileSync, rmSync } from 'fs'
import { join } from 'path'

import { generateExampleRepo } from './generate-example-repo'
import { dirname } from '../src/dirname'
import { versionem } from '../src/index'
import { commit } from './utils/commit'

const __dirname = dirname(import.meta.url)
const exampleRepoPath = join(__dirname, 'example-repo')

it('--noLog flag works properly', async () => {
  existsSync(exampleRepoPath) && rmSync(exampleRepoPath, { recursive: true, force: true })
  await generateExampleRepo()

  writeFileSync(join(exampleRepoPath, 'index.js'), 'console.log("Hello World!")\n', 'utf-8')

  await commit('chore: add "Hello World!"', { cwd: exampleRepoPath })

  await versionem({ cwd: exampleRepoPath, noLog: true, noPush: true, silent: true })

  const logPath = join(exampleRepoPath, 'CHANGELOG.md')

  expect(existsSync(logPath)).toBeFalsy()
})
