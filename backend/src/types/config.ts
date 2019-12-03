export type CorsConfig = {
  origin: string,
  exposeHeaders: string[],
  maxAge: number
}

export type KnexConfig = {
  client: string,
  connection: string,
  pool: {
    min: number,
    max: number,
  },
  migrations: {
    tableName: string,
    directory: string,
  },
  seeds: {
    directory: string,
  }
}

export type EnvType = 'local' | 'production' | 'test'

export type Config = {
  env: EnvType,
  server: {
    port: number,
    cors: CorsConfig
  }

  logger: {
    prettyPrint: boolean
  },

  db: {
    uri: string
  },

  security: {
    saltRounds: number,
    secretHash: string,
    jwtInputSettings: {
      algorithm: string,
      expiresIn: number
    },
    jwtOutputSettings: {
      algorithm: string
    }
  }
}