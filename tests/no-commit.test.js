import { existsSync, writeFileSync, rmSync } from 'fs'
import { join } from 'path'

import execa from 'execa'

import { generateExampleRepo } from './generate-example-repo'
import { dirname } from '../src/dirname'
import { versionem } from '../src/index'

const __dirname = dirname(import.meta.url)
const exampleRepoPath = join(__dirname, 'example-repo')

const getLatestCommitHash = async cwd => {
  const params = ['rev-parse', '--short', 'HEAD']
  const { stdout: latestCommitHash } = await execa('git', params, { cwd })
  return latestCommitHash
}

it('--noCommit flag works properly', async () => {
  existsSync(exampleRepoPath) && rmSync(exampleRepoPath, { recursive: true, force: true })
  await generateExampleRepo()

  writeFileSync(join(exampleRepoPath, 'index.js'), 'console.log("Hello World!")\n', 'utf-8')

  let params = ['add', '.']
  await execa('git', params, { cwd: exampleRepoPath })

  params = ['commit', '-m', 'chore: add "Hello World!"']
  await execa('git', params, { cwd: exampleRepoPath })

  const beforeCommitHash = await getLatestCommitHash(exampleRepoPath)

  await versionem({ cwd: exampleRepoPath, noCommit: true, noPush: true, silent: true })

  const afterCommitHash = await getLatestCommitHash(exampleRepoPath)

  expect(beforeCommitHash).toBe(afterCommitHash)
})
