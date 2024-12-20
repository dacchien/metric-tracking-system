import Joi from 'joi'
import { MetricTypes } from '../models'

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateMetricReq:
 *       type: object
 *       required:
 *         - date
 *         - value
 *         - unit
 *         - type
 *       properties:
 *         date:
 *           type: string
 *           format: date
 *           description: The date of metric, format YYYY-MM-DD
 *         value:
 *           type: number
 *           description: The value of metric
 *         unit:
 *           type: string
 *           description: The unit of metric
 *         type:
 *           type: string
 *           description: The type of metric
 */
export const CreateMetricReq = Joi.object({
  date: Joi.string().required().isoDate(),
  value: Joi.number().required(),
  unit: Joi.string().required().min(1).max(5),
  type: Joi.string()
    .required()
    .valid(...Object.values(MetricTypes)),
})

export const FindAllMetricQuery = Joi.object({
  page: Joi.number(),
  limit: Joi.number(),
  unit: Joi.string().min(1).max(5),
  type: Joi.string()
    .required()
    .valid(...Object.values(MetricTypes)),
})

export const GetLatestMetricsQuery = Joi.object({
  unit: Joi.string().min(1).max(5),
  type: Joi.string()
    .required()
    .valid(...Object.values(MetricTypes)),
  fromDate: Joi.string().required().isoDate(),
  toDate: Joi.string().required().isoDate(),
})
