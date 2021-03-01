import chalk from 'chalk'
import semver from 'semver'

const { log } = console

/** @type {import('../types/generic').Generic} */
export const getNewVersion = ({ version, major, minor, patch, commits, silent }) => {
  !silent && log(chalk`{blue Determining new version}`)

  const increment = major ? 'major' : minor ? 'minor' : patch && 'patch'

  if (increment) return semver.inc(version, increment)

  const types = new Set(commits.map(({ type }) => type))
  const breaking = commits.some(commit => !!commit.breaking)
  const level = breaking ? 'major' : types.has('feat') ? 'minor' : 'patch'

  return semver.inc(version, level)
}
