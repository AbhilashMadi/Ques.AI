
const bcrypt = require('bcryptjs')
const envConfig = require('#configs/env.config')

/**
 * Hash a plain password
 * @param {string} plainPassword
 * @returns {Promise<string>} hashed password
 */
async function hashPassword(plainPassword) {
  const salt = await bcrypt.genSalt(envConfig.SALT_ROUNDS);
  const hash = await bcrypt.hash(plainPassword, salt);
  return hash;
}

/**
 * Compare plain password with hashed password
 * @param {string} plainPassword
 * @param {string} hashedPassword
 * @returns {Promise<boolean>}
 */
async function comparePassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = {
  hashPassword,
  comparePassword,
};
