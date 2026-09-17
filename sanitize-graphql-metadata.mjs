import { readFile, writeFile } from 'node:fs/promises'

import { sanitizeGraphqlMetadata } from './graphql-metadata-sanitizer.mjs'

const metadataPath = new URL('./src/metadata.ts', import.meta.url)
const metadata = await readFile(metadataPath, 'utf8')
const sanitized = sanitizeGraphqlMetadata(metadata)

if (sanitized === metadata) {
  throw new Error('No GraphQL metadata import attributes were found to sanitize.')
}

await writeFile(metadataPath, sanitized)
