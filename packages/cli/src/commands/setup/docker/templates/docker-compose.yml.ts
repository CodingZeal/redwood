type Nullable<T> = T | null | undefined

interface DockerComposeYML {
  version?: string
  name?: string
  services?: {
    [key: string]: {
      image?: string
      environment?: string[]
      ports?: string[]
      volumes?: string[]
    }
  }
  volumes?: {
    [key: string]: Nullable<Record<string, string>>
  }
}

export function generateDockerCompose(): string {
  // const composeJson = {
  //   ...DEFAULT_COMPOSE,
  //   ...opts,
  // }
  return 'composeJson'
}

export const DEFAULT_COMPOSE: DockerComposeYML = {
  version: '3.8',
  name: 'redwood_app',
  services: {
    db: {
      image: 'postgres:14.1',
      environment: [
        'POSTGRES_USER=postgres',
        'POSTGRES_PASSWORD=development',
        'POSTGRES_DB=redwood_dev',
        'PGDATA=/var/lib/postgresql/data/pgdata',
      ],
      ports: ['5432:5432'],
      volumes: ['redwood_dev:/var/lib/postgresql/data/pgdata'],
    },
    testdb: {
      image: 'postgres:14.1',
      environment: [
        'POSTGRES_USER=postgres',
        'POSTGRES_PASSWORD=test',
        'POSTGRES_DB=redwood_test',
        'PGDATA=/var/lib/postgresql/data/pgdata',
      ],
      ports: ['5433:5432'],
      volumes: ['redwood_test:/var/lib/postgresql/data/pgdata'],
    },
  },
  volumes: {
    redwood_dev: null,
    redwood_test: null,
  },
}
