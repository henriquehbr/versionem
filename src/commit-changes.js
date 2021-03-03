import { basename } from 'path'

import chalk from 'chalk'
import execa from 'execa'

const { log } = console

/** @type {import('../types/generic').Generic} */
export const commitChanges = async ({
  cwd,
  packageName,
  unreleased,
  version,
  dryRun,
  noCommit,
  silent
}) => {
  if (dryRun || noCommit) {
    !silent && log(chalk`{yellow Skipping Git commit}`)
    return
  }

  !silent && log(chalk`{blue Committing} CHANGELOG.md, package.json`)

  // TODO: Deduplicate this
  const isMonorepoPackage = basename(cwd) === 'packages'
  const packagePrefix = isMonorepoPackage ? packageName + '-' : ''

  let params = ['add', '.']
  await execa('git', params, { cwd })

  params = [
    'commit',
    ...(unreleased
      ? ['--amend', '--no-edit', '--no-verify']
      : ['-m', `chore(release): ${packagePrefix}v${version}`])
  ]

  await execa('git', params, { cwd, extendEnv: false, env: { HUSKY: 0 } })
}
