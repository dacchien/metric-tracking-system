import { HttpStatusCode } from '../constants'
import { moment, parseErrorStack } from '../utils'
import { Logger } from './logger'

export function sendSucces({ res, message, data = null }) {
  const response = {
    isSuccess: true,
    message,
    result: 'OK',
  }

  if (data) {
    response.result = data
  }

  res.status(HttpStatusCode.OK).json(response)
}

// eslint-disable-next-line no-unused-vars
export const errorHandler = (exception, request, response, _next) => {
  const status = exception && exception.status ? exception.status : HttpStatusCode.INTERNAL_SERVER_ERROR
  const msgErr = exception && exception.message ? exception.message : 'Internal server error'

  let detail = {
    path: request.url,
    timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
    statusCode: status,
  }

  if (exception.detail) {
    detail = { ...detail, ...exception.detail }
  }

  if (status >= 500) {
    const stack = parseErrorStack(exception && exception.stack ? exception.stack : undefined)

    Logger.error(msgErr, {
      ...detail,
      stack,
    })
  }

  const data = {
    isSuccess: false,
    message: msgErr,
  }

  if (exception.validateErrors) {
    data.errors = exception.validateErrors
  }

  data.detail = detail
  response.status(status).json(data)
}
