// Updated with 521d776
// https://github.com/rollup/plugins/commit/521d7767c9ded5c054d72c174a2c65ebc816ccc6

import { join } from 'path'
import { pathToFileURL } from 'url'

import chalk from 'chalk'

import { getCommits } from './get-commits'
import { parseCommits } from './parse-commits'
import { getNewVersion } from './get-new-version'
import { updatePackage } from './update-package'
import { updateChangelog } from './update-changelog'
import { commitChanges } from './commit-changes'
import { tag } from './tag'
import { regenerateChangelog } from './regenerate-changelog'
import { push } from './push'
import { parseOptions } from './parse-options'
import { publishNpm } from './publish-npm'

const { log } = console

export const versionem = async options => {
  const parsedOptions = await parseOptions(options)
  const { dryRun, regenChangelog, unreleased, publish, silent, packageName, cwd } = parsedOptions

  // FIXME: Problematic on Windows, requires `pathToFileURL`
  const { default: packageJson } = await import(pathToFileURL(join(cwd, 'package.json')))

  !silent && dryRun && log(chalk`{magenta DRY RUN:} No files will be modified`)

  regenChangelog && (await regenerateChangelog(parsedOptions))

  !silent && log(chalk`{cyan Releasing \`${packageName}\`}`)

  const unparsedCommits = await getCommits({ packageName: packageName, ...parsedOptions })

  if (!unparsedCommits.length)
    throw chalk`\n{red No commits found!} did you mean to publish ${packageName}?`

  const commits = parseCommits({ unparsedCommits, ...parsedOptions })

  if (!commits.length)
    throw new Error(
      chalk`\n{yellow No eligible commits found!} are you following a commit naming standard?`
    )

  !silent && log(chalk`{blue Found} {bold ${commits.length}} commits`)

  const newVersion = getNewVersion({ version: packageJson.version, commits, ...parsedOptions })

  !silent && log(chalk`{blue New version}: ${newVersion}\n`)

  await updateChangelog({ commits, version: newVersion, ...parsedOptions })
  await updatePackage({ packageJson, version: newVersion, ...parsedOptions })
  await commitChanges({ version: newVersion, ...parsedOptions })
  await tag({ version: newVersion, ...parsedOptions })
  await push(options)
  publish && (await publishNpm(parsedOptions))
}
