// Nest's watch-mode compiler regenerates src/metadata.ts on every rebuild, re-introducing
// the unsanitized `resolution-mode` import attributes the ESM loader can't resolve. This
// watcher keeps it patched for the life of the dev process, not just on the initial build.
import { watch } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { sanitizeGraphqlMetadata } from './graphql-metadata-sanitizer.mjs'

const srcDir = fileURLToPath(new URL('./src', import.meta.url))
const metadataPath = join(srcDir, 'metadata.ts')

let lastWritten = null
let debounceTimer = null

async function sanitizeOnce() {
  let metadata
  try {
    metadata = await readFile(metadataPath, 'utf8')
  } catch (error) {
    if (error.code === 'ENOENT') return
    throw error
  }

  if (metadata === lastWritten) return

  const sanitized = sanitizeGraphqlMetadata(metadata)
  lastWritten = sanitized

  if (sanitized !== metadata) {
    await writeFile(metadataPath, sanitized)
    console.log('[watch-graphql-metadata] sanitized src/metadata.ts')
  }
}

function scheduleSanitize() {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    sanitizeOnce().catch((error) => console.error('[watch-graphql-metadata]', error))
  }, 50)
}

await sanitizeOnce()

watch(srcDir, (_eventType, filename) => {
  if (filename === 'metadata.ts') scheduleSanitize()
})

console.log('[watch-graphql-metadata] watching for src/metadata.ts regeneration')
