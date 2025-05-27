
module.exports = async function (fastify) {

  fastify.get('/healthz', (_, replay) => {
    return replay.success({ uptime: process.uptime() }, 'Health')
  })

  fastify.all('/ping', (_, replay) => {
    return replay.send('pong')
  })

}