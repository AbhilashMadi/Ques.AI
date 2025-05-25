module.exports = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'yyyy-mm-dd HH:MM:ss.l',
        ignore: 'pid,hostname',
        levelFirst: true,
      },
    },
    level: 'debug',
  },

  production: {
    // No pretty print in production, structured logs
    level: 'info',
  },

  test: {
    // Silent logging or minimal logging during tests
    level: 'warn',
  },
}
