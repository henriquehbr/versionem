import { existsSync, writeFileSync, rmSync } from 'fs'
import { join } from 'path'

import { generateExampleRepo } from './generate-example-repo'
import { dirname } from '../src/dirname'
import { versionem } from '../src/index'
import { commit } from './utils/commit'
import { getCommitHash } from './utils/get-commit-hash'

const __dirname = dirname(import.meta.url)
const exampleRepoPath = join(__dirname, 'example-repo')

it('--noCommit flag works properly', async () => {
  await generateExampleRepo()

  writeFileSync(join(exampleRepoPath, 'index.js'), 'console.log("Hello World!")\n', 'utf-8')

  await commit('chore: add "Hello World!"', { cwd: exampleRepoPath })

  const beforeCommitHash = await getCommitHash({ cwd: exampleRepoPath })

  await versionem({ cwd: exampleRepoPath, noCommit: true, noPush: true, silent: true })

  const afterCommitHash = await getCommitHash({ cwd: exampleRepoPath })

  expect(beforeCommitHash).toBe(afterCommitHash)
})
