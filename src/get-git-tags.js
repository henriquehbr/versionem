import { basename } from 'path'

import execa from 'execa'

export const getGitTags = async ({ cwd, packageName }) => {
  // TODO: Deduplicate this
  const isMonorepoPackage = basename(cwd) === 'packages'
  const tagPrefix = isMonorepoPackage ? packageName + '-' : ''

  let params = ['tag', '--list', `${tagPrefix}v*`, '--sort', '-v:refname']
  const { stdout } = await execa('git', params, { cwd })
  const tags = stdout.split('\n').reverse()

  return tags
}
