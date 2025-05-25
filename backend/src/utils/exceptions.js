const StatusCodes = require('#utils/status-codes')

class HttpException extends Error {
  constructor(message, statusCode = StatusCodes.INTERNAL_SERVER_ERROR, code = 'INTERNAL_ERROR') {
    super(message)
    this.name = this.constructor.name
    this.statusCode = statusCode
    this.code = code
  }
}

class BadRequestException extends HttpException {
  constructor(message = 'Bad Request', code = 'BAD_REQUEST') {
    super(message, StatusCodes.BAD_REQUEST, code)
  }
}

class NotFoundException extends HttpException {
  constructor(message = 'Resource not found', code = 'NOT_FOUND') {
    super(message, StatusCodes.NOT_FOUND, code)
  }
}

class UnauthorizedException extends HttpException {
  constructor(message = 'Unauthorized', code = 'UNAUTHORIZED') {
    super(message, StatusCodes.UNAUTHORIZED, code)
  }
}

class ForbiddenException extends HttpException {
  constructor(message = 'Forbidden', code = 'FORBIDDEN') {
    super(message, StatusCodes.FORBIDDEN, code)
  }
}

module.exports = {
  HttpException,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
}
