module.exports = {
  // Required
  required: (field) => `${field} is required.`,

  // Length
  minLength: (field, length) => `${field} must be at least ${length} characters long.`,
  maxLength: (field, length) => `${field} must be at most ${length} characters long.`,

  // Format
  email: "Please provide a valid email address.",
  password: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
  name: "Username can only contain letters, numbers, underscores, and periods.",

  // Custom
  passwordMatch: "Passwords do not match.",
  invalidCredentials: "Invalid username or password.",
  alreadyExists: (field) => `An account with this ${field} already exists.`,
  notFound: (field) => `${field} not found.`,
  invalidField: (field) => `Invalid ${field}.`,
};
