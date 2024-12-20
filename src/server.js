import cors from 'cors'
import express from 'express'
import 'express-async-errors'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

import { appConf } from '../config/default'
import { errorSequenlizeHandler, errorValidationHandler } from './middleware'
import { MetricRouter } from './routes'
import { errorHandler, sendSucces } from './shared'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('tmp'))

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Metric Tracking System API with Swagger',
      version: '0.1.0',
      description: 'This is a simple API application made with Express and documented with Swagger',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
    },
    servers: [
      {
        url: `http://localhost:${appConf.port}`,
      },
    ],
  },
  apis: ['./src/routes/*.js', './src/validations/*.js', './src/models/*.js'],
}

const specs = swaggerJSDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }))
app.use('/metrics', MetricRouter)
app.get('/', (_, res) => {
  return sendSucces({ res, message: 'Hello from Metric Tracking System API' })
})

app.use(errorValidationHandler)
app.use(errorSequenlizeHandler)
app.use(errorHandler)

export default app
