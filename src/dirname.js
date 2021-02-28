import path from 'path'
import { fileURLToPath } from 'url'

/** @type {(url: string) => string} */
export const dirname = url => path.dirname(fileURLToPath(url))
