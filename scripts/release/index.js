// Updated with 521d776
// https://github.com/rollup/plugins/commit/521d7767c9ded5c054d72c174a2c65ebc816ccc6

import { join, parse } from 'path'
import { pathToFileURL } from 'url'

import chalk from 'chalk'

import { __dirname } from '../../utils/dirname'
import { getCommits } from './get-commits'
import { getNewVersion } from './get-new-version'
import { updatePackage } from './update-package'
import { updateChangelog } from './update-changelog'
import { commitChanges } from './commit-changes'
import { tag } from './tag'
import { push } from './push'
import { _, dryRun } from './cli'

const { log } = console

try {
  const cwd = _[0] || process.cwd()
  const { name: packageName } = parse(cwd)

  // FIXME: Problematic on Windows, requires `pathToFileURL`
  const { default: packageJson } = await import(pathToFileURL(join(cwd, 'package.json')))

  dryRun && log(chalk`{magenta DRY RUN:} No files will be modified`)

  log(chalk`{cyan Publishing \`${packageName}\`} from {grey packages/${packageName}}`)

  const commits = await getCommits(packageName)

  if (!commits.length) {
    throw chalk`\n{red No commits found!} did you mean to publish ${packageName}?`
  }

  log(chalk`{blue Found} {bold ${commits.length}} commits`)

  const newVersion = getNewVersion(packageJson.version, commits)

  log(chalk`{blue New version}: ${newVersion}\n`)
  await updatePackage(cwd, packageJson, newVersion)
  // FIXME: probably `await` is not needed here
  await updateChangelog(commits, cwd, packageName, newVersion)
  await commitChanges(cwd, packageName, newVersion)
  await tag(cwd, packageName, newVersion)
  await push()
} catch (e) {
  log(e)
}
