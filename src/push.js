import execa from 'execa'
import chalk from 'chalk'

const { log } = console

export const push = async ({ dryRun, noPush }) => {
  if (dryRun || noPush) {
    log(chalk`{yellow Skipping Git push}`)
    return
  }

  log(chalk`{blue Pushing release and tags}`)
  await execa('git', ['push'])
  await execa('git', ['push', '--tags'])
}
