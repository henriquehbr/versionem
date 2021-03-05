import outdent from 'outdent'
import { sentenceCase } from 'sentence-case'

export const formatChangelogEntry = notes => {
  const formattedNotes = []

  for (const category in notes) {
    const { commits } = notes[category]

    if (!commits.length) continue

    const formattedNote = outdent`
      ### ${sentenceCase(category)}

      - ${commits.join('\n- ').trim()}
    `
    formattedNotes.push(formattedNote)
  }

  return formattedNotes.join('\n\n')
}
