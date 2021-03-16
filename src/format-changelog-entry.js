import outdent from 'outdent'
import { sentenceCase } from 'sentence-case'
import { Temporal } from 'proposal-temporal'

import { getTags } from './get-tags'

import execa from 'execa'

export const formatChangelogEntry = async ({
  cwd,
  unreleased,
  packageName,
  version,
  categorizedCommits
}) => {
  const formattedChangelogEntry = []

  for (const category in categorizedCommits) {
    const { commits } = categorizedCommits[category]

    if (!commits.length) continue

    const formattedNote = outdent`
      ### ${sentenceCase(category)}

      - ${commits.join('\n- ').trim()}
    `
    formattedChangelogEntry.push(formattedNote)
  }

  !formattedChangelogEntry.length &&
    formattedChangelogEntry.push(
      '- Only refactorings and dev-only changes were made on this release'
    )

  if (!unreleased) {
    let date = ''

    const [versionTag] = await getTags({ tag: 'v' + version, cwd, packageName })

    if (versionTag) {
      let params = ['show', '-s', '--format=%cs', versionTag]
      const { stdout: releaseDate } = await execa('git', params, { cwd })
      date = releaseDate
    } else {
      const releaseDate = Temporal.now.plainDateISO().toString()
      date = releaseDate
    }
    formattedChangelogEntry.unshift(`## ${version}`, `_${date}_`)
  } else {
    formattedChangelogEntry.unshift('## Unreleased')
  }

  // Divide sections with a line break
  return formattedChangelogEntry.join('\n\n')
}
