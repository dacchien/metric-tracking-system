import { Router } from 'express'
import { authenticate } from '../middleware'
import { expressValidator, Logger, sendSucces } from '../shared'
import { CreateMetricReq, FindAllMetricQuery, GetLatestMetricsQuery } from '../validations'
import { createMetric, findAllMetrics, getLatestMetrics } from '../services'

export const MetricRouter = Router()

/**
 * @swagger
 * /metrics:
 *   get:
 *     summary: List all metrics base on the type ( Distance / Temperature)
 *     tags: [Metrics]
 *     parameters:
 *       - in: header
 *         name: user_id
 *         required: true
 *         description: user ID required for authentication, assume bypass any value
 *         schema:
 *           type: string
 *           example: "everfit"
 *       - in: query
 *         name: type
 *         description: The type of metric (e.g., distance, temperature)
 *         required: true
 *         schema:
 *           type: string
 *           enum:
 *             - distance
 *             - temperature
 *       - in: query
 *         name: unit
 *         description: The unit of metric that want to convert (e.g., m, cm)
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         description: Page of list metrics
 *         required: false
 *         schema:
 *           type: number
 *       - in: query
 *         name: limit
 *         description: Limit of each page, default 25 items
 *         required: false
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: The list of metrics.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Metric'
 *       500:
 *         description: Some server error
 */
MetricRouter.get('/', expressValidator.query(FindAllMetricQuery), [authenticate], async (req, res) => {
  try {
    const result = await findAllMetrics(res.locals.userId, req.query)

    return sendSucces({
      res,
      message: 'Get all metrics success',
      data: result,
    })
  } catch (error) {
    Logger.error({ ...error })

    throw error
  }
})

/**
 * @swagger
 * /metrics/latest-by-day:
 *   get:
 *     summary: List latest metrics insert for a day base on the type & specific time period (1 month, 2 months)
 *     tags: [Metrics]
 *     parameters:
 *       - in: header
 *         name: user_id
 *         required: true
 *         description: user ID required for authentication, assume bypass any value
 *         schema:
 *           type: string
 *           example: "everfit"
 *       - in: query
 *         name: type
 *         description: The type of metric (e.g., distance, temperature)
 *         required: true
 *         schema:
 *           type: string
 *           enum:
 *             - distance
 *             - temperature
 *       - in: query
 *         name: unit
 *         description: The unit of metric that want to convert (e.g., m, cm)
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: fromDate
 *         description: from date in the specific period, format YYYY-MM-DD
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: toDate
 *         description: to date in the specific period, format YYYY-MM-DD
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The list of metrics.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Metric'
 *       500:
 *         description: Some server error
 */
MetricRouter.get('/latest-by-day', expressValidator.query(GetLatestMetricsQuery), [authenticate], async (req, res) => {
  try {
    const result = await getLatestMetrics(res.locals.userId, req.query)

    return sendSucces({
      res,
      message: 'Get latest metrics by day success',
      data: result,
    })
  } catch (error) {
    Logger.error({ ...error })

    throw error
  }
})

/**
 * @swagger
 * /metrics:
 *   post:
 *     summary: Create a new metric
 *     tags: [Metrics]
 *     parameters:
 *       - in: header
 *         name: user_id
 *         required: true
 *         description: user ID required for authentication, assume bypass any value
 *         schema:
 *           type: string
 *           example: "everfit"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateMetricReq'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Metric'
 *       500:
 *         description: Some server error
 */
MetricRouter.post('/', expressValidator.body(CreateMetricReq), [authenticate], async (req, res) => {
  try {
    const result = await createMetric({
      ...req.body,
      userId: res.locals.userId,
    })

    return sendSucces({ res, message: 'Create metric success', data: result })
  } catch (error) {
    Logger.error({ ...error })

    throw error
  }
})
