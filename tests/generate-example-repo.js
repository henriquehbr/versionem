import { existsSync, rmSync } from 'fs'
import { join } from 'path'

import execa from 'execa'
import writePkg from 'write-pkg'

import { dirname } from '../src/dirname'

const __dirname = dirname(import.meta.url)

export const generateExampleRepo = async () => {
  const exampleRepoPath = join(__dirname, 'example-repo')
  existsSync(exampleRepoPath) && rmSync(exampleRepoPath, { recursive: true, force: true })

  let params = ['init', '--shared=0777', exampleRepoPath]
  await execa('git', params)

  writePkg(exampleRepoPath, { name: 'example-repo', version: '0.0.0' })

  params = ['add', '.']
  await execa('git', params, { cwd: exampleRepoPath })

  params = ['commit', '-m', 'chore: create package.json']
  await execa('git', params, { cwd: exampleRepoPath })

  params = ['rev-parse', 'HEAD']
  const { stdout: latestCommitHash } = await execa('git', params, { cwd: exampleRepoPath })

  params = ['tag', 'v0.0.0', latestCommitHash]
  await execa('git', params, { cwd: exampleRepoPath })
}
