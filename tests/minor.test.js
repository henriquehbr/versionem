import { join } from 'path'

import execa from 'execa'

import { generateExampleRepo } from './utils/generate-example-repo'
import { dirname } from '../src/dirname'
import { versionem } from '../src/index'
import { commit } from './utils/commit'

const __dirname = dirname(import.meta.url)
const exampleRepoPath = join(__dirname, 'example-repo')

it('--minor works', async () => {
  await generateExampleRepo()
  await commit('fix: hello world', { cwd: exampleRepoPath })
  await versionem({ cwd: exampleRepoPath, minor: true, noPush: true, silent: true })

  let params = ['describe', '--tags', '--abbrev=0']
  const { stdout: latestGitTag } = await execa('git', params, { cwd: exampleRepoPath })

  expect(latestGitTag).toBe('v0.1.0')
})
