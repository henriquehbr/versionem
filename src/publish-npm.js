import chalk from 'chalk'
import execa from 'execa'

const { log } = console

/** @type {import('../types/generic').Generic} */
export const publishNpm = async ({ cwd, packageName, dryRun, silent }) => {
  !silent &&
    log(
      dryRun ? chalk`{yellow Skipping npm publish}` : chalk`{blue Publishing ${packageName} to npm}`
    )
  let params = ['publish', dryRun ? '--dry-run' : '']
  await execa('npm', params, { cwd, stdio: 'inherit', shell: true })
}
