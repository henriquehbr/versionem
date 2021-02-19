import chalk from 'chalk'
import writePackage from 'write-pkg'

import { dryRun } from './cli'

const { log } = console

export const updatePackage = async (cwd, pkg, version) => {
  if (dryRun) {
    log(chalk`{yellow Skipping package.json update}`)
    return
  }

  log(chalk`{blue Updating} package.json`)
  const pkgJson = Object.assign({}, pkg)
  pkgJson.version = version
  await writePackage(cwd, pkgJson)
}
