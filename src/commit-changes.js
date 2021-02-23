import { basename } from 'path'

import chalk from 'chalk'
import execa from 'execa'

const { log } = console

export const commitChanges = async ({ cwd, packageName, version, dryRun, silent }) => {
  if (dryRun) {
    !silent && log(chalk`{yellow Skipping Git commit}`)
    return
  }

  !silent && log(chalk`{blue Committing} CHANGELOG.md, package.json`)

  // TODO: Deduplicate this
  const isMonorepoPackage = basename(cwd) === 'packages'
  const packagePrefix = isMonorepoPackage ? packageName + '-' : ''

  let params = ['add', cwd]
  await execa('git', params, { cwd })

  params = ['commit', '-m', `chore(release): ${packagePrefix}v${version}`]
  await execa('git', params, { cwd })
}
