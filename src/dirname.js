import path from 'path'
import { fileURLToPath } from 'url'

export const dirname = url => path.dirname(fileURLToPath(url))
