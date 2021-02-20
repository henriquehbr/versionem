import { basename } from 'path'

import chalk from 'chalk'
import execa from 'execa'
import parser from 'conventional-commits-parser'

import { getGitTags } from './get-git-tags'

const { log } = console
const parserOptions = {
  noteKeywords: ['BREAKING CHANGE', 'Breaking change']
}

const reBreaking = new RegExp(`(${parserOptions.noteKeywords.join(')|(')})`)

export const getCommits = async (packageName, originTag) => {
  // TODO: Deduplicate this
  const releaseOnCwd = packageName === basename(process.cwd())

  const tags = await getGitTags(packageName)

  const fromTag = originTag || tags.pop()
  const toTag = originTag ? tags[tags.indexOf(originTag) + 1] : 'HEAD'

  originTag
    ? log(chalk`{blue Gathering commits between} {grey ${fromTag} and {grey ${toTag}}}`)
    : log(chalk`{blue Gathering commits since} {grey ${fromTag}}`)

  // NOTE: ~1 means to not include release commit
  let params = ['--no-pager', 'log', `${fromTag}..${toTag}~1`, '--format=%B%n-hash-%n%H🐒💨🙊']
  const commitSubjectRegex = releaseOnCwd ? '' : `\\(${packageName}\\)`
  const commitRegex = new RegExp(`^[\\w\\!]+${commitSubjectRegex}`, 'i')
  const { stdout } = await execa('git', params)
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
