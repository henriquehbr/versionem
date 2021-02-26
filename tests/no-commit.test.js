import { existsSync, writeFileSync } from 'fs'
import { join } from 'path'

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

const getLatestCommitHash = async cwd => {
  const params = ['rev-parse', '--short', 'HEAD']
  const { stdout: latestCommitHash } = await execa('git', params, { cwd })
  return latestCommitHash
}

it('--no-commit flag works properly', async () => {
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
