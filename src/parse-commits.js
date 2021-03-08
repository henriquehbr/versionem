import parser from 'conventional-commits-parser'
import { basename } from 'path'

import { validCommitTypes } from './categories-metadata'

const parserOptions = {
  noteKeywords: ['BREAKING CHANGE', 'Breaking change']
}

export const parseCommits = ({ cwd, unparsedCommits }) => {
  // TODO: Deduplicate this
  // TODO: replace `cwd` with `packagePath`
  const isMonorepoPackage = basename(cwd) === 'packages'

  const isBreakingChangeRegex = new RegExp(`(${parserOptions.noteKeywords.join(')|(')})`)
  const commitTypesRegex = validCommitTypes.join('|')
  const commitSubjectRegex = isMonorepoPackage ? `\\(${packageName}\\)` : ''

  // Prevent the inclusion of commits without types (eg: merge commits)
  const commitRegex = new RegExp(`^(${commitTypesRegex})!?${commitSubjectRegex}`, 'i')

  const parsedCommits = unparsedCommits
    .split('🐒💨🙊')
    .filter(commit => {
      const chunk = commit.trim()
      return chunk && commitRegex.test(chunk)
    })
    .map(commit => {
      const node = parser.sync(commit)

      // TODO: Review
      node.breaking = isBreakingChangeRegex.test(node.body || node.footer) || /!:/.test(node.header)

      return node
    })

  return parsedCommits
}
