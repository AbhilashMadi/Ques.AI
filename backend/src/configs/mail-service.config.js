const envConfig = require('#configs/env.config')

module.exports = {
  host: envConfig.EMAIL_TRANSPORTER_HOST,
  port: envConfig.EMAIL_TRANSPORTER_PORT,
  secure: true,
  auth: {
    user: envConfig.EMAIL_SMTP_USER,
    pass: envConfig.EMAIL_SMTP_PASSWORD,
  }
}