import { join } from 'path'

import { generateExampleRepo } from './generate-example-repo'
import { dirname } from '../src/dirname'
import { versionem } from '../src/index'

const __dirname = dirname(import.meta.url)

beforeAll(generateExampleRepo)

describe('changelog', () => {
  test('single chore', async () => {
    const cwd = join(__dirname, 'example-repo')
    await versionem({ cwd })
  }, 9999)
})
