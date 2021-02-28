import { join, basename } from 'path'
import { readFileSync, writeFileSync, existsSync } from 'fs'

import chalk from 'chalk'
import { sentenceCase } from 'sentence-case'

const { log } = console

/** @type {import('../types/generic').Generic} */
export const updateChangelog = ({ commits, cwd, packageName, version, dryRun, noLog, silent }) => {
  !silent && log(chalk`{blue Gathering changes...}`)

  // TODO: Deduplicate this
  const isMonorepoPackage = basename(cwd) === 'packages'

  const title = `# ${isMonorepoPackage ? `\`${packageName}\` changelog` : 'Changelog'}`
  const [date] = new Date().toISOString().split('T')
  const logPath = join(cwd, 'CHANGELOG.md')

  const logFile = existsSync(logPath) ? readFileSync(logPath, 'utf-8') : ''
  const oldNotes = logFile.startsWith(title) ? logFile.slice(title.length).trim() : logFile
  //const notes = { breaking: [], fixes: [], features: [], updates: [] }

  // TODO: load this from a external config
  const notes = {
    breakingChanges: {
      commits: []
    },
    features: {
      prefix: 'feat',
      commits: []
    },
    bugfixes: {
      prefix: 'fix',
      commits: []
    },
    updates: {
      prefix: ['chore', 'refactor'],
      commits: []
    }
  }

  // TODO: add flag to allow including all commit types
  const validCommitTypes = Object.values(notes).flatMap(({ prefix }) => prefix)

  for (const { breaking, hash, header, type } of commits) {
    // Prevent the inclusion of commits without types (eg: merge commits)
    if (!validCommitTypes.includes(type)) continue

    // Issues in commit message, like: (#1)
    // Maybe transform these in links leading to actual issues/commits
    const ref = /\(#\d+\)/.test(header) ? '' : ` (${hash.substring(0, 7)})`

    // Remove package name as it's redundant inside the package changelog
    // Remove the commit type as it's redundant inside it's respective changelog section
    const message = header.trim().replace(`(${packageName})`, '').replace(`${type}: `, '') + ref

    const getCategoryByPrefix = ([, { prefix }]) => prefix?.includes(type) || prefix === type
    const [categoryName] = Object.entries(notes).filter(getCategoryByPrefix).flat()
    const category = breaking || categoryName || 'updates'
    notes[category].commits.push(message)
  }

  const categorizedCommits = Object.entries(notes)
    .filter(([, { commits }]) => commits.length)
    .map(([title, { commits }]) => {
      const formattedTitle = `### ${sentenceCase(title)}\n\n`
      const formattedCommits = '- ' + commits.join('\n- ').trim()
      return formattedTitle + formattedCommits
    })
    .join('\n\n')

  const parts = [`## v${version}`, `_${date}_`, categorizedCommits]

  // Divide sections with a line break
  const newLog = parts.join('\n\n')

  if (dryRun || noLog) {
    !silent && log(chalk`{blue New changelog}:\n${newLog}`)
    return
  }

  !silent && log(chalk`{blue Updating} CHANGELOG.md`)
  const content = [title, newLog, oldNotes].filter(Boolean).join('\n\n')
  writeFileSync(logPath, content, 'utf-8')
}
