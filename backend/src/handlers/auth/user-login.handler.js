const User = require('#models/user.model')

module.exports = async (request, reply) => {
  // TODO: Implement login logic
  // - Verify credentials
  // - Generate tokens
  // - Store refresh token
  // - Return tokens
  const { fullName, email, password, confirmPassword } = request.body;
}