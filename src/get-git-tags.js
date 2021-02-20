import { basename } from 'path'

import execa from 'execa'

export const getGitTags = async packageName => {
  // TODO: Deduplicate this
  const releaseOnCwd = packageName === basename(process.cwd())
  const tagPrefix = releaseOnCwd ? '' : packageName + '-'

  let params = ['tag', '--list', `${tagPrefix}v*`, '--sort', '-v:refname']
  const { stdout } = await execa('git', params)
  const tags = stdout.split('\n').reverse()

  return tags
}
