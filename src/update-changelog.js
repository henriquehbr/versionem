import { join, basename } from 'path'
import { readFileSync, writeFileSync, existsSync } from 'fs'

import chalk from 'chalk'

const { log } = console

export const updateChangelog = ({ commits, cwd, packageName, version, dryRun, silent }) => {
  !silent && log(chalk`{blue Gathering changes...}`)

  // TODO: Deduplicate this
  const isMonorepoPackage = basename(cwd) === 'packages'

  const title = `# ${isMonorepoPackage ? `\`${packageName}\` changelog` : 'Changelog'}`
  const [date] = new Date().toISOString().split('T')
  const logPath = join(cwd, 'CHANGELOG.md')

  const logFile = existsSync(logPath) ? readFileSync(logPath, 'utf-8') : ''
  const oldNotes = logFile.startsWith(title) ? logFile.slice(title.length).trim() : logFile
  const notes = { breaking: [], fixes: [], features: [], updates: [] }

  for (const { breaking, hash, header, type } of commits) {
    // Prevent the inclusion of commits without types (eg: merge commits)
    if (!type) continue

    // Issues in commit message, like: (#1)
    // Maybe transform these in links leading to actual issues/commits
    const ref = /\(#\d+\)/.test(header) ? '' : ` (${hash.substring(0, 7)})`

    // Remove package name as it's redundant inside the package changelog
    // Remove the commit type as it's redundant inside it's respective changelog section
    const message = header.trim().replace(`(${packageName})`, '').replace(`${type}: `, '') + ref

    if (breaking) notes.breaking.push(message)

    switch (type) {
      case 'fix':
        notes.fixes.push(message)
      case 'feat':
        notes.features.push(message)
      default:
        notes.updates.push(message)
    }
  }

  const parts = [
    `## v${version}`,
    `_${date}_`,
    notes.breaking.length ? `### Breaking changes\n\n- ${notes.breaking.join('\n- ')}`.trim() : '',
    notes.fixes.length ? `### Bugfixes\n\n- ${notes.fixes.join('\n- ')}`.trim() : '',
    notes.features.length ? `### Features\n\n- ${notes.features.join('\n- ')}`.trim() : '',
    notes.updates.length ? `### Updates\n\n- ${notes.updates.join('\n- ')}`.trim() : ''
  ].filter(Boolean) // remove those who are falsy (empty)

  // Divide sections with a line break
  const newLog = parts.join('\n\n')

  if (dryRun) {
    !silent && log(chalk`{blue New changelog}:\n${newLog}`)
    return
  }

  !silent && log(chalk`{blue Updating} CHANGELOG.md`)
  const content = [title, newLog, oldNotes].filter(Boolean).join('\n\n')
  writeFileSync(logPath, content, 'utf-8')
}
