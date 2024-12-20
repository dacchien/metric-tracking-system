import HttpErrors from 'http-errors'
import convert from 'convert-units'

import { Metric, MetricTypes } from '../models'
import { DistanceUnits, generatePagination, generatePaging, sequelize, TemperatureUnits } from '../shared'
import { Sequelize } from 'sequelize'
import { DateFormat } from '../shared/utils/moment'

export async function createMetric(data) {
  validateUnitOfMetric(data.unit, data.type)
  data.date = data.date.substring(0, DateFormat.length)

  const metric = await Metric.create(data)
  metric.value = roundUpValueOfMetric(metric.value)

  return metric
}

export async function findAllMetrics(userId, query) {
  const { page, limit, type, unit } = query
  const { page: currentPage, limit: pageLimit, offset: pageOffset } = generatePaging(page, limit)
  const where = { type, userId }

  let { rows, count } = await Metric.findAndCountAll({ where, limit: pageLimit, offset: pageOffset })
  if (unit) {
    validateUnitOfMetric(unit, type)

    rows = rows.map((row) => {
      const convertValue = convert(row.value).from(row.unit).to(unit)
      row.value = roundUpValueOfMetric(convertValue)
      row.unit = unit

      return row
    })
  }

  return {
    data: rows,
    pagination: generatePagination(currentPage, count, pageLimit),
  }
}

export async function getLatestMetrics(userId, query) {
  const { type, unit, fromDate, toDate } = query
  const sqlQuery = `
    SELECT DISTINCT ON ("date") *
    FROM "Metric"
    WHERE "type" = :type AND "userId" = :userId
      AND DATE("date") BETWEEN DATE(:fromDate) AND DATE(:toDate)
    ORDER BY "date" ASC, "createdAt" DESC;
  `

  let metrics = await sequelize.query(sqlQuery, {
    replacements: {
      type,
      userId,
      fromDate,
      toDate,
    },
    type: Sequelize.QueryTypes.SELECT,
    model: Metric,
    mapToModel: true,
  })

  if (unit) {
    validateUnitOfMetric(unit, type)

    metrics = metrics.map((metric) => {
      const convertValue = convert(metric.value).from(metric.unit).to(unit)
      metric.value = roundUpValueOfMetric(convertValue)
      metric.unit = unit

      return metric
    })
  }

  return metrics
}

function validateUnitOfMetric(unit, type) {
  if (type == MetricTypes.Distance && !Object.values(DistanceUnits).includes(unit)) {
    throw HttpErrors.UnprocessableEntity(
      `"unit" must be one of [${Object.values(DistanceUnits).join(', ')}] for type "${type}"`,
    )
  } else if (type == MetricTypes.Temperature && !Object.values(TemperatureUnits).includes(unit)) {
    throw HttpErrors.UnprocessableEntity(
      `"unit" must be one of [${Object.values(TemperatureUnits).join(', ')}] for type "${type}"`,
    )
  }
}

/**
 * Rounds a given number up to one decimal place
 * @param {number} num - The number to be rounded up
 * @returns {number} The number rounded up to one decimal place.
 */
function roundUpValueOfMetric(num) {
  return Math.round(num * 10) / 10
}
