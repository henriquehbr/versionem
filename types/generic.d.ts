import type { JSONSchemaForNPMPackageJsonFiles } from '@schemastore/package'
import type { Commit } from 'conventional-commits-parser'

import { ParsedOptions } from './parse-options'

type Commits = Commit<string | number | symbol>[]

interface CustomParsedOptions extends ParsedOptions {
  version?: string
  packageJson?: JSONSchemaForNPMPackageJsonFiles
  commits?: Commits
  originTag: string
}

type Generic = (options: CustomParsedOptions) => Promise<void>

export { Generic }
