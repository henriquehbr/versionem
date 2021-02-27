import minimist from 'minimist'

import { versionem } from './index'

/** @type {import('../types/options').Options} */
const options = minimist(process.argv.slice(2))

await versionem(options)
