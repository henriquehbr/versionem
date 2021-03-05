import { join, basename } from 'path'
import { readFileSync, writeFileSync, existsSync } from 'fs'

import chalk from 'chalk'
import readPkg from 'read-pkg'

import { categorizeCommits } from './categorize-commits'
import { formatChangelogEntry } from './format-changelog-entry'

const { log } = console

/** @type {import('../types/generic').Generic} */
export const updateChangelog = async ({
  commits,
  cwd,
  unreleased,
  packageName,
  version,
  dryRun,
  noLog,
  silent
}) => {
  !silent && log(chalk`{blue Gathering changes...}`)
  // TODO: Deduplicate this
  const isMonorepoPackage = basename(cwd) === 'packages'
  const title = `# ${isMonorepoPackage ? `\`${packageName}\` changelog` : 'Changelog'}`
  const logPath = join(cwd, 'CHANGELOG.md')

  const { version: latestVersion } = await readPkg({ cwd, normalize: false })

  const logFile = existsSync(logPath) ? readFileSync(logPath, 'utf-8') : ''
  const unreleasedSectionLength = logFile.split(`## ${latestVersion}`)[0].length
  const oldNotes = logFile.startsWith(title) ? logFile.slice(unreleasedSectionLength) : logFile

  const categorizedCommits = await categorizeCommits({ cwd, packageName, commits, unreleased })
  const formattedChangelogEntry = formatChangelogEntry({ unreleased, version, categorizedCommits })

  if (dryRun || noLog) {
    !silent && log(chalk`{blue New changelog}:\n${formattedChangelogEntry}`)
    return
  }

  !silent && log(chalk`{blue Updating} CHANGELOG.md`)
  const content = [title, formattedChangelogEntry, oldNotes].filter(Boolean).join('\n\n')
  writeFileSync(logPath, content, 'utf-8')
}
