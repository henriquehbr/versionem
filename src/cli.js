import minimist from 'minimist'

const { _, dryRun, noPush, noTag, regenChangelog } = minimist(process.argv.slice(2))

export { _, dryRun, noPush, noTag, regenChangelog }
