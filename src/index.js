// Updated with 521d776
// https://github.com/rollup/plugins/commit/521d7767c9ded5c054d72c174a2c65ebc816ccc6

import { join, basename } from 'path'
import { pathToFileURL } from 'url'

import chalk from 'chalk'

import { getCommits } from './get-commits'
import { getNewVersion } from './get-new-version'
import { updatePackage } from './update-package'
import { updateChangelog } from './update-changelog'
import { commitChanges } from './commit-changes'
import { tag } from './tag'
import { regenerateChangelog } from './regenerate-changelog'
import { push } from './push'
import { parseOptions } from './parse-options'

const { log } = console

export const versionem = async options => {
  try {
    const parsedOptions = await parseOptions(options)

    // FIXME: Problematic on Windows, requires `pathToFileURL`
    const { default: packageJson } = await import(
      pathToFileURL(join(parsedOptions.cwd, 'package.json'))
    )

    parsedOptions.dryRun && log(chalk`{magenta DRY RUN:} No files will be modified`)

    parsedOptions.regenChangelog && (await regenerateChangelog(options))

    log(
      chalk`{cyan Publishing \`${parsedOptions.packageName}\`} from {grey packages/${parsedOptions.packageName}}`
    )

    const commits = await getCommits({ packageName: parsedOptions.packageName, ...options })

    if (!commits.length)
      throw chalk`\n{red No commits found!} did you mean to publish ${parsedOptions.packageName}?`

    log(chalk`{blue Found} {bold ${commits.length}} commits`)

    const newVersion = getNewVersion(packageJson.version, commits)

    log(chalk`{blue New version}: ${newVersion}\n`)

    await updatePackage({ packageJson, version: newVersion, ...options })
    updateChangelog({ commits, version: newVersion, ...options })
    await commitChanges({ version: newVersion, ...options })
    await tag({ version: newVersion, ...options })
    await push(options)
  } catch (e) {
    log(e)
  }
}
