import { join } from 'path'

import execa from 'execa'
import writePkg from 'write-pkg'

import { dirname } from '../src/dirname'

const __dirname = dirname(import.meta.url)

export const generateExampleRepo = async () => {
  const cwd = join(__dirname, 'example-repo')

  let params = ['init', '--shared=0777', cwd]
  await execa('git', params)

  writePkg(cwd, { name: 'example-repo', version: '0.0.0' })

  params = ['add', '.']
  await execa('git', params, { cwd })

  params = ['commit', '-m', 'chore: create package.json']
  await execa('git', params, { cwd })

  params = ['rev-parse', 'HEAD']
  const { stdout: latestCommitHash } = await execa('git', params, { cwd })

  params = ['tag', 'v0.0.0', latestCommitHash]
  await execa('git', params, { cwd })
}
