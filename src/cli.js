import minimist from 'minimist'

import { versionem } from './index'

const options = minimist(process.argv.slice(2))

await versionem(options)
