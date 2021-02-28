import type { Options } from './options'

interface ParsedOptions extends Options {
  cwd: string
  packageName: string
}

type ParseOptions = (options: Options) => Promise<ParsedOptions>

export { ParseOptions, ParsedOptions }
