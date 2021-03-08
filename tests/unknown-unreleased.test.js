import { join } from 'path'

import chalk from 'chalk'

import { dirname } from '../src/dirname'
import { versionem } from '../src/index'
import { generateExampleRepo } from './utils/generate-example-repo'
import { commit } from './utils/commit'

const __dirname = dirname(import.meta.url)
const exampleRepoPath = join(__dirname, 'example-repo')

it("Don't show commits with unknown types on unreleased", async () => {
  await generateExampleRepo()

  await commit('chore: hello world', { cwd: exampleRepoPath })
  await versionem({ cwd: exampleRepoPath, noPush: true, silent: true })

  await commit('alpha: lipsum', { cwd: exampleRepoPath })

  await expect(
    versionem({ cwd: exampleRepoPath, unreleased: true, noPush: true, silent: true })
  ).rejects.toThrow(
    chalk`\n{yellow No eligible commits found!} are you following a commit naming standard?`
  )
})
