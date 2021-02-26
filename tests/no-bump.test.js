import { existsSync, writeFileSync } from 'fs'
import { join } from 'path'

import rimraf from 'rimraf'
import execa from 'execa'

import { generateExampleRepo } from './generate-example-repo'
import { dirname } from '../src/dirname'
import { versionem } from '../src/index'

const __dirname = dirname(import.meta.url)
const exampleRepoPath = join(__dirname, 'example-repo')

const getPackageJsonVersion = async cwd => {
  const packageJsonPath = join(cwd, 'package.json')
  const {
    default: { version }
  } = await import(packageJsonPath)
  return version
}

it('--noBump flag works properly', async () => {
  existsSync(exampleRepoPath) && rimraf.sync(exampleRepoPath)
  await generateExampleRepo()

  writeFileSync(join(exampleRepoPath, 'index.js'), 'console.log("Hello World!")\n', 'utf-8')

  let params = ['add', '.']
  await execa('git', params, { cwd: exampleRepoPath })

  params = ['commit', '-m', 'chore: add "Hello World!"']
  await execa('git', params, { cwd: exampleRepoPath })

  const beforeVersion = await getPackageJsonVersion(exampleRepoPath)

  await versionem({ cwd: exampleRepoPath, noPush: true, silent: true })

  const afterVersion = await getPackageJsonVersion(exampleRepoPath)

  expect(beforeVersion).toBe(afterVersion)
})
