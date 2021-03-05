import { join, basename } from 'path'
import { readFileSync, writeFileSync, existsSync } from 'fs'

import chalk from 'chalk'
import { sentenceCase } from 'sentence-case'
import execa from 'execa'

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
  const [date] = new Date().toISOString().split('T')
  const logPath = join(cwd, 'CHANGELOG.md')

  let params = ['describe', '--tags', '--abbrev=0']
  const { stdout: latestGitTag } = await execa('git', params, { cwd })
  const latestVersion = latestGitTag.slice(1)

  // TODO: refactor this
  const logFile = existsSync(logPath) ? readFileSync(logPath, 'utf-8') : ''
  const unreleasedSectionLength = logFile.split(`## ${latestVersion}`)[0].length
  const oldNotes = logFile.startsWith(title) ? logFile.slice(unreleasedSectionLength) : logFile

  // TODO: load this from a external config
  const notes = {
    unreleased: {
      commits: []
    },
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

  params = ['rev-parse', 'HEAD']
  const { stdout: latestCommitHash } = await execa('git', params, { cwd })

  for (const { breaking, hash, header, type } of commits) {
    // Prevent the inclusion of commits without types (eg: merge commits)
    if (!validCommitTypes.includes(type)) continue

    const commitHash = unreleased && hash === latestCommitHash ? 'HEAD' : hash.substring(0, 7)

    // Issues in commit message, like: (#1)
    // Maybe transform these in links leading to actual issues/commits
    const ref = /\(#\d+\)/.test(header) ? '' : ` (${commitHash})`

    // Remove package name as it's redundant inside the package changelog
    // Remove the commit type as it's redundant inside it's respective changelog section
    const message = header.trim().replace(`(${packageName})`, '').replace(`${type}: `, '') + ref

    const getCategoryByPrefix = ([, { prefix }]) => prefix?.includes(type) || prefix === type
    const [categoryName] = Object.entries(notes).filter(getCategoryByPrefix).flat()
    const category = breaking || categoryName || 'updates'
    notes[category].commits.push(message)
  }

  const releaseContent = Object.entries(notes)
    .filter(([, { commits }]) => commits.length)
    .map(([title, { commits }]) => {
      const formattedTitle = `### ${sentenceCase(title)}\n\n`
      const formattedCommits = '- ' + commits.join('\n- ').trim()
      return formattedTitle + formattedCommits
    })
    .join('\n\n')

  // TODO: make this more readable
  const parts = [`## ${version}`, ...(unreleased ? [] : [`_${date}_`]), releaseContent]

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
