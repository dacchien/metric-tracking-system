import { createValidator } from 'express-joi-validation'

export const expressValidator = createValidator({ passError: true })
