import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'bash prisma/seed.sh',
  },
  datasource: {
    // DATABASE_URL is injected by dotenvx via the npm scripts that invoke the Prisma CLI
    url: process.env.DATABASE_URL ?? '',
  },
})
