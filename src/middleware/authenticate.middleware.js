import HttpErrors from 'http-errors'

export function authenticate(req, res, next) {
  const userId = req.headers?.['user_id']
  if (!userId) {
    throw HttpErrors.Unauthorized()
  }

  res.locals.userId = userId
  return next()
}
