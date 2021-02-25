import { join } from 'path'
import { existsSync, unlinkSync } from 'fs'

import chalk from 'chalk'

const { log } = console

import { getTags } from './get-tags'
import { getCommits } from './get-commits'
import { updateChangelog } from './update-changelog'

export const regenerateChangelog = async ({ cwd, packageName, silent, dryRun }) => {
  !silent && log(chalk`{magenta REGENERATE:} Changelog will be generated from scratch`)

  const tags = await getTags(cwd, packageName)

  if (!tags.length) throw chalk`\n{red No Git tags found!}`

  existsSync && unlinkSync(join(cwd, 'CHANGELOG.md'))

  for (let [i, tag] of tags.entries()) {
    const toTag = tags[i + 1]
    if (!toTag) break
    const [, version] = toTag.split('v')
    const commits = await getCommits({ cwd, packageName, originTag: tag, silent })

    !silent && log(chalk`{blue Found} {bold ${commits.length}} commits`)

    updateChangelog({ commits, cwd, packageName, version, dryRun, silent })
  }
}
