import chalk from 'chalk'
import execa from 'execa'

import { getTags } from './get-tags'

const { log } = console

/** @type {import('../types/generic').Generic} */
export const getCommits = async ({ cwd, packageName, originTag, silent }) => {
  const tags = await getTags({ cwd, packageName })

  const fromTag = originTag || tags.pop()
  const toTag = originTag ? tags[tags.indexOf(originTag) + 1] + '~1' : 'HEAD'

  !silent &&
    (originTag
      ? log(chalk`{blue Gathering commits between} {grey ${fromTag} and {grey ${toTag}}}`)
      : log(chalk`{blue Gathering commits since} {grey ${fromTag}}`))

  // NOTE: ~1 means to not include release commit
  let params = ['--no-pager', 'log', `${fromTag}..${toTag}`, '--format=%B%n-hash-%n%H🐒💨🙊']
  const { stdout: unparsedCommits } = await execa('git', params, { cwd })

  return unparsedCommits
}
