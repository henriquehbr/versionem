import { writeFileSync } from 'fs'
import { join } from 'path'

import readPkg from 'read-pkg'

import { dirname } from '../src/dirname'
import { versionem } from '../src/index'
import { generateExampleRepo } from './utils/generate-example-repo'
import { commit } from './utils/commit'

const __dirname = dirname(import.meta.url)
const exampleRepoPath = join(__dirname, 'example-repo')

it('--noBump flag works properly', async () => {
  await generateExampleRepo()

  writeFileSync(join(exampleRepoPath, 'index.js'), 'console.log("Hello World!")\n', 'utf-8')

  await commit('chore: add "Hello World!"', { cwd: exampleRepoPath })

  const { version: beforeVersion } = await readPkg({ cwd: exampleRepoPath, normalize: false })

  await versionem({ cwd: exampleRepoPath, noBump: true, noPush: true, silent: true })

  const { version: afterVersion } = await readPkg({ cwd: exampleRepoPath, normalize: false })

  expect(beforeVersion).toBe(afterVersion)
})
