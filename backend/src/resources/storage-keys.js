
module.exports = {
  OTP_VERIFY: 'verify_otp',
  STORE_OTP: (id) => `OTP_${id}`,
  STORE_TOKEN: (id) => `TOKEN_${id}`,
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
}