import chalk from 'chalk'
import execa from 'execa'
import parser from 'conventional-commits-parser'

const { log } = console
const parserOptions = {
  noteKeywords: ['BREAKING CHANGE', 'Breaking change']
}

const reBreaking = new RegExp(`(${parserOptions.noteKeywords.join(')|(')})`)

export const getCommits = async packageName => {
  log(chalk`{blue Gathering commits...}`)

  let params = [
    'tag',
    '--list',
    `area51-semver-changelog-monorepo/${packageName}-v*`,
    '--sort',
    '-v:refname'
  ]
  const { stdout: tags } = await execa('git', params)
  const [latestTag] = tags.split('\n')

  log(chalk`{blue Last release tag:}`, latestTag)

  params = ['--no-pager', 'log', `${latestTag}..HEAD`, '--format=%B%n-hash-%n%H🐒💨🙊']
  // TODO: Review
  const rePackage = new RegExp(`^[\\w\\!]+\\(${packageName}\\)`, 'i')
  const { stdout } = await execa('git', params)
  const commits = stdout
    .split('🐒💨🙊')
    .filter(commit => {
      const chunk = commit.trim()
      return chunk && rePackage.test(chunk)
    })
    .map(commit => {
      const node = parser.sync(commit)

      // TODO: Review
      node.breaking = reBreaking.test(node.body || node.footer) || /!:/.test(node.header)

      return node
    })

  return commits
}
