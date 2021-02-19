import chalk from 'chalk'
import semver from 'semver'

const { log } = console
export const getNewVersion = (version, commits) => {
  log(chalk`{blue Determining new version}`)
  // TODO: Review
  const intersection = process.argv.filter(arg => ['--major', '--minor', '--patch'].includes(arg))
  if (intersection.length) return semver.inc(version, intersection[0].substring(2))

  const types = new Set(commits.map(({ type }) => type))
  const breaking = commits.some(commit => !!commit.breaking)
  const level = breaking ? 'major' : types.has('feat') ? 'minor' : 'patch'

  return semver.inc(version, level)
}
