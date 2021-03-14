import { basename } from 'path'

import execa from 'execa'

/** @type {import('../types/generic').Generic} */
export const getTags = async ({ cwd, tag, packageName }) => {
  // TODO: Deduplicate this
  const isMonorepoPackage = basename(cwd) === 'packages'
  const tagPrefix = isMonorepoPackage ? packageName + '-' : ''

  let params = ['tag', '--list', tag || `${tagPrefix}v*`, '--sort', '-v:refname']
  const { stdout } = await execa('git', params, { cwd })
  const tags = stdout.split('\n').reverse()

  return tags
}
