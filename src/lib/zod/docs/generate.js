import { writeFileSync } from 'node:fs'
import { openApiDocument } from './index.js'

writeFileSync('./swagger.json', JSON.stringify(openApiDocument, null, 2))