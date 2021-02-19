import chalk from 'chalk'
import execa from 'execa'

import { basename } from 'path'

import { dryRun, noTag } from './cli'

const { log } = console

export const tag = async (cwd, packageName, version) => {
  if (dryRun || noTag) {
    log(chalk`{yellow Skipping Git tag}`)
    return
  }

  // TODO: Deduplicate this
  const releaseOnCwd = packageName === basename(process.cwd())
  const tagPrefix = releaseOnCwd ? '' : packageName + '-'

  const tagName = `${tagPrefix}v${version}`
  log(chalk`\n{blue Tagging} {grey ${tagName}}`)
  await execa('git', ['tag', tagName], { cwd, stdio: 'inherit' })
}
