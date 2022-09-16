import { TargetEnum } from '@redwoodjs/internal/dist/config'

export const MOCK_REDWOOD_TOML = {
  web: {
    title: 'Redwood App',
    host: 'localhost',
    port: 8910,
    path: './web',
    target: 'browser' as TargetEnum.BROWSER,
    apiUrl: '/.redwood/functions',
    fastRefresh: true,
    a11y: true,
    sourceMap: false,
    apiProxyPath: '/api/functions',
  },
  api: {
    title: 'Redwood App',
    host: 'localhost',
    port: 8911,
    path: './api',
    target: 'node' as TargetEnum.NODE,
    schemaPath: './api/db/schema.prisma',
    serverConfig: './api/server.config.js',
    debugPort: 18911,
    paths: {
      functions: './api/src/functions',
      graphql: './api/src/graphql',
      generated: './api/generated',
    },
  },
  browser: { open: false },
  generate: { tests: true, stories: true, nestScaffoldByModel: true },
}
