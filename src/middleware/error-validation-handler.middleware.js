import HttpErrors from 'http-errors'

// eslint-disable-next-line no-unused-vars
export function errorValidationHandler(err, _req, _res, _next) {
  if (err && err.error && err.error.isJoi) {
    const httpError = HttpErrors.UnprocessableEntity()
    httpError.validateErrors = err.error.details.map((err) => err.message)

    throw httpError
  }

  throw err
}
