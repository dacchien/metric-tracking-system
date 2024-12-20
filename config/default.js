import dotenv from 'dotenv'
dotenv.config()

export const appConf = {
  name: process.env.APP_NAME,
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  saltRounds: 10,
  jwtSecretKey: process.env.JWT_SECRET_KEY || '',
  accessTokenTtl: '1y',
  uploadFileDir: process.env.UPLOAD_FILE_DIR || 'tmp/uploads',
}

export const apiUrl = appConf.env === 'development' ? `127.0.0.1:${appConf.port}` : ''

export const dbConf = {
  HOST: process.env.DB_HOST || '',
  PORT: process.env.DB_PORT || 3306,
  USER: process.env.DB_USERNAME || '',
  PASSWORD: process.env.DB_PASSWORD || '',
  DB: process.env.DB_NAME || '',
  SYNC: process.env.DB_SYNC || 'false',
  dialect: process.env.DB_DIALECT || '',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}
