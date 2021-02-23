import { basename } from 'path'

export const parseOptions = options => {
  // Try retrieving from API parameter, then fallback to CLI flag, lastly get the cwd
  const cwd = options.cwd || options._?.[0] || process.cwd()
  const packageName = basename(cwd)
  const optionsWithoutUnderline = (({ _, ...options }) => options)(options)

  return { cwd, packageName, ...optionsWithoutUnderline }
}
