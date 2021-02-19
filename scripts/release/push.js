import execa from 'execa'
import chalk from 'chalk'

import { dryRun, noPush } from './cli'

const { log } = console

export const push = async () => {
  if (dryRun || noPush) {
    log(chalk`{yellow Skipping Git push}`)
    return
  }

  log(chalk`{blue Pushing release and tags}`)
  await execa('git', ['push'])
  await execa('git', ['push', '--tags'])
}
