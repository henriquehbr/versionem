import minimist from 'minimist'

import { versionem } from './index'

const { _, dryRun, noPush, noTag, regenChangelog } = minimist(process.argv.slice(2))

await versionem(_[0])

export { _, dryRun, noPush, noTag, regenChangelog }
