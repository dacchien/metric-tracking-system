import HttpErrors from 'http-errors'

// eslint-disable-next-line no-unused-vars
export function errorSequenlizeHandler(err, _req, _res, _next) {
  if (err && err.name && err.name.includes('Sequelize')) {
    const message = err.original?.sqlMessage

    // eslint-disable-next-line no-console
    console.log(err)
    throw HttpErrors.UnprocessableEntity(message)
  }

  throw err
}
