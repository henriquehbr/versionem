import execa from 'execa'

/**
 * @typedef {Object} GetCommitHashOptions
 * @property {string} [ref='HEAD'] - Reference used to locate commit
 * @property {boolean} [short=true] - Whether to return shortened git hash
 * @property {string} cwd - Directory to execute git commands
 */

/** @type {(options: GetCommitHashOptions) => Promise<string>} */
export const getCommitHash = async ({ ref = 'HEAD', short = true, cwd }) => {
  const execaOptions = { cwd }

  let params = ['rev-parse', short ? '--short' : '', ref]
  const { stdout: commitHash } = await execa('git', params, execaOptions)
  return commitHash
}
