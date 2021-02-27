import { basename } from 'path'

import chalk from 'chalk'
import execa from 'execa'
import parser from 'conventional-commits-parser'

import { getTags } from './get-tags'

const { log } = console
const parserOptions = {
  noteKeywords: ['BREAKING CHANGE', 'Breaking change']
}

const reBreaking = new RegExp(`(${parserOptions.noteKeywords.join(')|(')})`)

/** @type {import('../types/generic').Generic} */
export const getCommits = async ({ cwd, packageName, originTag, silent }) => {
  // TODO: Deduplicate this
  // TODO: replace `cwd` with `packagePath`
  const isMonorepoPackage = basename(cwd) === 'packages'

  const tags = await getTags(cwd, packageName)

  const fromTag = originTag || tags.pop()
  const toTag = originTag ? tags[tags.indexOf(originTag) + 1] + '~1' : 'HEAD'

  !silent &&
    (originTag
      ? log(chalk`{blue Gathering commits between} {grey ${fromTag} and {grey ${toTag}}}`)
      : log(chalk`{blue Gathering commits since} {grey ${fromTag}}`))

  // NOTE: ~1 means to not include release commit
  let params = ['--no-pager', 'log', `${fromTag}..${toTag}`, '--format=%B%n-hash-%n%H🐒💨🙊']
  const commitSubjectRegex = isMonorepoPackage ? `\\(${packageName}\\)` : ''
  const commitRegex = new RegExp(`^[\\w\\!]+${commitSubjectRegex}`, 'i')
  const { stdout } = await execa('git', params, { cwd })
  const commits = stdout
    .split('🐒💨🙊')
    .filter(commit => {
      const chunk = commit.trim()
      return chunk && commitRegex.test(chunk)
    })
    .map(commit => {
      const node = parser.sync(commit)

      // TODO: Review
      node.breaking = reBreaking.test(node.body || node.footer) || /!:/.test(node.header)

      return node
    })

  return commits
}
