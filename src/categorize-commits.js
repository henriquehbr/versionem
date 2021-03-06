import execa from 'execa'

import { getRemoteUrl } from './get-remote-url'

export const categorizeCommits = async ({ cwd, packageName, commits, unreleased }) => {
  const commitCategories = {
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
  const validCommitTypes = Object.values(commitCategories).flatMap(({ prefix }) => prefix)

  let params = ['rev-parse', 'HEAD']
  const { stdout: latestCommitHash } = await execa('git', params, { cwd })

  for (const { breaking, hash, header, type } of commits) {
    // Prevent the inclusion of commits without types (eg: merge commits)
    if (!validCommitTypes.includes(type)) continue

    const remoteUrl = await getRemoteUrl(cwd)
    const commitHash = unreleased && hash === latestCommitHash ? 'HEAD' : hash.substring(0, 7)
    const commitUrl = remoteUrl ? `[${commitHash}](${remoteUrl}/commit/${commitHash})` : commitHash

    // Issues in commit message, like: (#1)
    // Maybe transform these in links leading to actual issues/commits
    const ref = /\(#\d+\)/.test(header) ? '' : ` (${commitUrl})`

    // Remove package name as it's redundant inside the package changelog
    // Remove the commit type as it's redundant inside it's respective changelog section
    const message = header.trim().replace(`(${packageName})`, '').replace(`${type}: `, '') + ref

    const getCategoryByPrefix = ([, { prefix }]) => prefix?.includes(type) || prefix === type
    const [categoryName] = Object.entries(commitCategories).filter(getCategoryByPrefix).flat()
    const category = breaking || categoryName || 'updates'
    commitCategories[category].commits.push(message)
  }
  return commitCategories
}
