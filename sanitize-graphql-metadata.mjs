import { readFile, writeFile } from 'node:fs/promises'

const metadataPath = new URL('./src/metadata.ts', import.meta.url)
const metadata = await readFile(metadataPath, 'utf8')
const sanitized = metadata
  .replace(/(\["[^"\n]+)", \{ with: \{ \\"resolution-mode\\": \\"import" \}\}/g, '$1"]')
  .replace(/(await import\("[^"\n]+)", \{ with: \{ "resolution-mode": "import" \} \}\)/g, '$1.js")')
  .replace(/(await import\("[^"\n]+)(?<!\.js)"\)/g, '$1.js")')

if (sanitized === metadata) {
  throw new Error('No GraphQL metadata import attributes were found to sanitize.')
}

await writeFile(metadataPath, sanitized)
