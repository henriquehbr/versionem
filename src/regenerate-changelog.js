import chalk from 'chalk'

const { log } = console

import { getGitTags } from './get-git-tags'
import { getCommits } from './get-commits'
import { updateChangelog } from './update-changelog'

export const regenerateChangelog = async (cwd, packageName) => {
  log(chalk`{magenta REGENERATE:} Changelog will be generated from scratch`)

  const tags = await getGitTags(packageName)

  if (!tags.length) throw chalk`\n{red No Git tags found!}`

  for (let [i, tag] of tags.entries()) {
    const toTag = tags[i + 1]
    if (!toTag) break
    const [, version] = toTag.split('v')
    const commits = await getCommits(packageName, tag)

    log(chalk`{blue Found} {bold ${commits.length}} commits`)

    updateChangelog(commits, cwd, packageName, version)
  }
}
