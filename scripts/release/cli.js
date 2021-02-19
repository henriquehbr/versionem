import minimist from 'minimist'

const { _, dryRun, noPush, noTag } = minimist(process.argv.slice(2))

export { _, dryRun, noPush, noTag }
