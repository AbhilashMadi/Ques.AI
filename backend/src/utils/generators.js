
function generateUUID() {
  return crypto.randomUUID();
}

module.exports = {
  generateUUID,
}