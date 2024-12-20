import { appConf } from './config/default'
import { connectDatabase } from './src/shared/providers/database'
import app from './src/server'
import { Logger } from './src/shared'

app.listen(appConf.port, async () => {
  await connectDatabase()

  Logger.info(`Server start at http://localhost:${appConf.port}`)
})
