
module.exports = async function (fastify) {

  fastify.get('/health', (_, replay) => {
    return replay.success({ uptime: process.uptime() }, 'Health')
  })

  fastify.all('/ping', (_, replay) => {
    return replay.send('pong')
  })

}