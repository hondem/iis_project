import { Config, EnvType } from "../types/config"

const getConfig = (env: EnvType): Config => {
  return {
    env,
    server: {
      port: parseInt(process.env.PORT) || 5000,
      
      cors: {
        origin: '*',
        exposeHeaders: [
          'Authorization',
          'Content-Language',
          'Content-Length',
          'Content-Type',
          'Date',
          'ETag',
        ],
        maxAge: 3600,
      },
    },
    logger: {
      prettyPrint: true,
    },
    db: {
      uri: process.env.DATABASE_URL || 'postgres://postgres@localhost/payday-db'
    },
    security: {
      saltRounds: 10,
      secretHash: process.env.SECURITY_SECRET_HASH || "50DFCED2E5691BDD1EF572EBD04EC9FFDA906AC9AFE4BFFBA452385851C499ED",
      jwtInputSettings: {
        algorithm: 'HS256',
        expiresIn: 60 * 60
      },
      jwtOutputSettings: {
        algorithm: 'HS256'
      }
    }
  }
}


export default getConfig