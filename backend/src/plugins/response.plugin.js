const fp = require('fastify-plugin')

const { HttpException } = require('#utils/exceptions')
const StatusCodes = require('#utils/status-codes')

module.exports = fp(async function responsePlugin(fastify) {
  fastify.decorateReply('success', function (data = {}, message = 'Success', code = StatusCodes.OK) {
    this.code(code).send({
      status: 'success',
      message,
      timestamp: Date.now(),
      data,
    })
  })

  fastify.decorateReply('fail', function (error, code = StatusCodes.BAD_REQUEST) {
    const err = error instanceof HttpException
      ? error
      : new HttpException('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR)

    this.code(err.statusCode).send({
      status: 'error',
      message: err.message,
      timestamp: Date.now(),
      code: err?.code ?? code,
    })
  })
})
