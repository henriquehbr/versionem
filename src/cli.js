#!/bin/sh
':' //# comment; exec /usr/bin/env node --experimental-specifier-resolution=node "$0" "$@"

import minimist from 'minimist'

import { versionem } from './index'

/** @type {import('../types/options').Options} */
const options = minimist(process.argv.slice(2))

await versionem(options)
