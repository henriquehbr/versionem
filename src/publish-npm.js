import chalk from 'chalk'
import execa from 'execa'

const { log } = console

export const publishNpm = async ({ cwd, packageName, dryRun, silent }) => {
  !silent &&
    log(
      chalk`${dryRun ? `{yellow Skipping npm publish}` : `{blue Publishing ${packageName} to npm}`}`
    )
  let params = ['publish', dryRun ? '--dry-run' : '']
  await execa('npm', params, { cwd })
}
