import { existsSync, writeFileSync, rmSync } from 'fs'
import { join } from 'path'

import { dirname } from '../src/dirname'
import { versionem } from '../src/index'
import { generateExampleRepo } from './utils/generate-example-repo'
import { commit } from './utils/commit'

const __dirname = dirname(import.meta.url)
const exampleRepoPath = join(__dirname, 'example-repo')

// TODO: replace this with `read-pkg`
const getPackageJsonVersion = async cwd => {
  const packageJsonPath = join(cwd, 'package.json')
  const {
    default: { version }
  } = await import(packageJsonPath)
  return version
}

it('--noBump flag works properly', async () => {
  await generateExampleRepo()

  writeFileSync(join(exampleRepoPath, 'index.js'), 'console.log("Hello World!")\n', 'utf-8')

  await commit('chore: add "Hello World!"', { cwd: exampleRepoPath })

  const beforeVersion = await getPackageJsonVersion(exampleRepoPath)

  await versionem({ cwd: exampleRepoPath, noPush: true, silent: true })

  const afterVersion = await getPackageJsonVersion(exampleRepoPath)

  expect(beforeVersion).toBe(afterVersion)
})
