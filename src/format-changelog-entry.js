import outdent from 'outdent'
import { sentenceCase } from 'sentence-case'

export const formatChangelogEntry = ({ unreleased, version, categorizedCommits }) => {
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

  if (!unreleased) {
    const [date] = new Date().toISOString().split('T')
    formattedChangelogEntry.unshift(`## ${version}`, `_${date}_`)
  } else {
    formattedChangelogEntry.unshift('## Unreleased')
  }

  // Divide sections with a line break
  return formattedChangelogEntry.join('\n\n')
}
