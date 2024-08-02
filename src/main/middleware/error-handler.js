import { CustomeAPIError, CustomAPIError } from '../errors/custom-error.js'

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    res.status(err.statusCode).json({ msg: err.message })
  } else {
    res.status(500).json({ msg: 'Something went wrong!' })
  }
}

export default errorHandlerMiddleware
