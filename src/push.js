import execa from 'execa'
import chalk from 'chalk'

const { log } = console

/** @type {import('../types/generic').Generic} */
export const push = async ({ cwd, dryRun, noPush, unreleased, noCommit, silent }) => {
  if (dryRun || unreleased || noCommit || noPush) {
    !silent && log(chalk`{yellow Skipping Git push}`)
    return
  }

  !silent && log(chalk`{blue Pushing release and tags}`)
  await execa('git', ['push'], { cwd })
  await execa('git', ['push', '-f', '--tags'], { cwd })
}
