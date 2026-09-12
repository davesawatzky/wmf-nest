import { defineConfig } from 'oxfmt'

export default defineConfig({
  $schema: './node_modules/oxfmt/configuration_schema.json',
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  jsdoc: true,
  ignorePatterns: [],
})
