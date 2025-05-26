const StatusCodes = require('#utils/status-codes');

module.exports = async function (error, request, replay) {
  request.log.error(error);

  const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  replay.status(statusCode).send({
    statusCode,
    error: error.name || 'Internal Server Error',
    message: error.message || 'Something went wrong',
  });
}