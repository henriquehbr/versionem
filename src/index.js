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
    const { dryRun, regenChangelog, packageName, cwd } = parsedOptions

    // FIXME: Problematic on Windows, requires `pathToFileURL`
    const { default: packageJson } = await import(pathToFileURL(join(cwd, 'package.json')))

    dryRun && log(chalk`{magenta DRY RUN:} No files will be modified`)

    regenChangelog && (await regenerateChangelog(options))

    log(chalk`{cyan Publishing \`${packageName}\`} from {grey packages/${packageName}}`)

    const commits = await getCommits({ packageName: packageName, ...parsedOptions })

    if (!commits.length)
      throw chalk`\n{red No commits found!} did you mean to publish ${packageName}?`

    log(chalk`{blue Found} {bold ${commits.length}} commits`)

    const newVersion = getNewVersion(packageJson.version, commits)

    log(chalk`{blue New version}: ${newVersion}\n`)

    await updatePackage({ packageJson, version: newVersion, ...parsedOptions })
    updateChangelog({ commits, version: newVersion, ...parsedOptions })
    await commitChanges({ version: newVersion, ...parsedOptions })
    await tag({ version: newVersion, ...parsedOptions })
    await push(options)
  } catch (e) {
    log(e)
  }
}
