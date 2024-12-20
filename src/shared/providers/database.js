import { Sequelize } from 'sequelize'

import { dbConf } from '../../../config/default'
import { Logger } from './logger'

// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local SQLite database.
// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);
const sequelize = new Sequelize(dbConf.DB, dbConf.USER, dbConf.PASSWORD, {
  host: dbConf.HOST,
  port: dbConf.PORT,
  dialect: dbConf.dialect,
  operationsAliases: false,
  pool: {
    max: dbConf.pool.max,
    min: dbConf.pool.min,
    acquire: dbConf.pool.acquire,
    idle: dbConf.pool.idle,
  },
})

export async function connectDatabase() {
  Logger.info(`Checking database connection...`)

  try {
    await sequelize.authenticate()
    Logger.info('Database connection OK!')
  } catch (error) {
    Logger.warn('Unable to connect to the database:', error)
    process.exit(1)
  }

  if (dbConf.SYNC == 'true') {
    await sequelize
      .sync()
      .then(() => {
        Logger.info('Synced db')
      })
      .catch((err) => {
        Logger.warn('Failed to sync db: ' + err.message)
      })
  }
}

// We execute any extra setup after the models are defined, such as adding associations.
// applyExtraSetup(sequelize)
// We export the sequelize connection instance to be used around our app.
export default sequelize
