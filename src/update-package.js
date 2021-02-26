import chalk from 'chalk'
import writePackage from 'write-pkg'

const { log } = console

export const updatePackage = async ({ cwd, packageJson, version, dryRun, noBump, silent }) => {
  if (dryRun || noBump) {
    !silent && log(chalk`{yellow Skipping package.json update}`)
    return
  }

  !silent && log(chalk`{blue Updating} package.json`)

  // A copy is necessary to allow directly making modifications to `package.json`
  const packageJsonCopy = Object.assign({}, packageJson)
  packageJsonCopy.version = version
  await writePackage(cwd, packageJsonCopy)
}
