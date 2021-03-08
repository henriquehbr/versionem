const categoriesMetadata = {
  breakingChanges: {
    increment: 'major',
    commits: []
  },
  features: {
    prefix: 'feat',
    increment: 'minor',
    commits: []
  },
  bugfixes: {
    prefix: 'fix',
    increment: 'patch',
    commits: []
  },
  updates: {
    prefix: ['chore', 'refactor'],
    commits: []
  }
}

// TODO: add flag to allow including all commit types
const validCommitTypes = Object.values(categoriesMetadata)
  .flatMap(({ prefix }) => prefix)
  .filter(Boolean)

export { categoriesMetadata, validCommitTypes }
