// Pure transform shared by the one-shot build sanitizer and the dev watcher.
export function sanitizeGraphqlMetadata(metadata) {
  return metadata
    .replace(/(\["[^"\n]+)", \{ with: \{ \\"resolution-mode\\": \\"import" \}\}/g, '$1"]')
    .replace(/(await import\("[^"\n]+)", \{ with: \{ "resolution-mode": "import" \} \}\)/g, '$1.js")')
    .replace(/(await import\("[^"\n]+)(?<!\.js)"\)/g, '$1.js")')
}
