module.exports = {
  PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
  FULL_NAME_REGEX: /^[a-zA-Z0-9_]{3,16}$/,
  EMAIL_REGEX: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  OBJECT_ID_REGEX: /^[0-9a-fA-F]{24}$/
}
