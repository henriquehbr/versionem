import type { ParsedArgs } from 'minimist'

type Parameters =
  | 'publish'
  | 'dryRun'
  | 'unreleased'
  | 'noPush'
  | 'noCommit'
  | 'noLog'
  | 'noTag'
  | 'noBump'
  | 'regenChangelog'
  | 'silent'

type Options = ParsedArgs & Record<Parameters, boolean>

export { Options }
