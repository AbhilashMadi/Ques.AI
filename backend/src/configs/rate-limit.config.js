
module.exports = {
  max: 100, // Maximum number of requests
  timeWindow: '1 minute', // Per 1 minute per IP
  cache: 10000, // How many unique IPs to remember (LruCache size)
  allowList: (req) => {
    // Allow internal tools, health checks, or trusted IPs
    const allowedIps = ['127.0.0.1']
    return allowedIps.includes(req.ip)
  },
  addHeaders: {
    'x-ratelimit-limit': true,
    'x-ratelimit-remaining': true,
    'x-ratelimit-reset': true,
  },
  keyGenerator: (req) => req.ip, // Rate limit per IP
  skipOnError: false, // Block requests even if there's a Redis/cache error
  ban: 3, // Ban IP after hitting the limit this many times
  errorResponseBuilder: (req, context) => {
    return {
      statusCode: 429,
      error: 'Too Many Requests',
      message: `Rate limit exceeded. Try again in ${Math.ceil(context.ttl / 1000)}s.`,
    }
  },
}
