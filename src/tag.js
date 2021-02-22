import chalk from 'chalk'
import execa from 'execa'

import { basename } from 'path'

const { log } = console

export const tag = async ({ cwd, packageName, version, dryRun, noTag }) => {
  if (dryRun || noTag) {
    log(chalk`{yellow Skipping Git tag}`)
    return
  }

  // TODO: Deduplicate this
  const isMonorepoPackage = basename(cwd)
  const tagPrefix = isMonorepoPackage ? packageName + '-' : ''

  const tagName = `${tagPrefix}v${version}`
  log(chalk`\n{blue Tagging} {grey ${tagName}}`)
  await execa('git', ['tag', tagName], { cwd, stdio: 'inherit' })
}
