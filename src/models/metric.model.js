import { DataTypes } from 'sequelize'

import { sequelize } from '../shared'

export const MetricTypes = {
  Distance: 'distance',
  Temperature: 'temperature',
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Metric:
 *       type: object
 *       required:
 *         - id
 *         - date
 *         - value
 *         - unit
 *         - type
 *         - user_id
 *       properties:
 *         id:
 *           type: string
 *           description: The id of metric
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
 *         user_id:
 *           type: string
 *           description: UserID
 */
export const Metric = sequelize.define(
  'Metric',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    date: {
      type: DataTypes.STRING,
    },
    value: {
      type: DataTypes.FLOAT,
    },
    unit: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(MetricTypes)),
    },
    userId: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'Metric',
  },
)
