import execa from 'execa'

import { getCommitHash } from './get-commit-hash'

/**
 * @typedef {Object} CommitOptions
 * @property {string} cwd - Directory to execute git commands
 * @property {string[]} files - Files to be commited
 */

/** @type {(msg: string, options: CommitOptions) => Promise<string>} */
export const commit = async (msg, { cwd, files = '.' }) => {
  const execaConfig = { cwd }

  let params = ['add', files]
  await execa('git', params, execaConfig)

  params = ['commit', '-m', msg]
  await execa('git', params, execaConfig)

  const hash = await getCommitHash({ cwd })
  return hash
}
