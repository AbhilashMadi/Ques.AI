const { z } = require('zod');

const envSchema = z.object({
  // Server Variables
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(8080),
  HOST: z.string().default('0.0.0.0'),

  // Database Variables
  DB_URL: z.string().url().default('mongodb://127.0.0.1:27017/'),
  DB_NAME: z.string().default('ques_ai'),

  REDIS_HOST: z.string(),
  REDIS_PORT: z.coerce.number(),
  REDIS_PASSWORD: z.string().optional(),
  REDIS_DB: z.coerce.number(),

  // Client Variables
  CONSUMERS: z.string(),
  CLIENT: z.string().url(),

  // Timings & Timeouts
  VERIFY_OTP_TTL: z.coerce.number(),
  ACCESS_TOKEN_TTL: z.coerce.number(),
  REFRESH_TOKEN_TTL: z.coerce.number(),
  PASSWORD_RESET_TOKEN_TTL: z.coerce.number(),

  SALT_ROUNDS: z.coerce.number().min(10).max(15),
  VERIFY_OTP_LENGTH: z.coerce.number().min(4).max(10),

  // Secrets
  SECURE_COOKIE_SECRET: z.string().min(8),
  REFRESH_TOKEN_SECRET: z.string().min(32),
  REFRESH_TOKEN_EXP: z.string(),
  ACCESS_TOKEN_SECRET: z.string().min(32),
  ACCESS_TOKEN_EXP: z.string(),
});

// Validate environment variables
const env = envSchema.safeParse(process.env);

// If validation fails, throw error
if (!env.success) {
  console.error('Invalid environment variables:', env.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables');
}

// Export validated environment variables
module.exports = env.data;