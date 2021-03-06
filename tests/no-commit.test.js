import { join } from 'path'

import { generateExampleRepo } from './utils/generate-example-repo'
import { dirname } from '../src/dirname'
import { versionem } from '../src/index'
import { commit } from './utils/commit'
import { getCommitHash } from './utils/get-commit-hash'

const __dirname = dirname(import.meta.url)
const exampleRepoPath = join(__dirname, 'example-repo')

it('--noCommit flag works', async () => {
  await generateExampleRepo()
  const beforeCommitHash = await commit('chore: hello world', { cwd: exampleRepoPath })
  await versionem({ cwd: exampleRepoPath, noCommit: true, noPush: true, silent: true })
  const afterCommitHash = await getCommitHash({ cwd: exampleRepoPath })

  expect(beforeCommitHash).toBe(afterCommitHash)
})
