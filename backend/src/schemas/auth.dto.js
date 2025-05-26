const { z } = require('zod');
const { zodToJsonSchema } = require('zod-to-json-schema');
const ErrorMessages = require('#resources/error-messages');
const RegexPatterns = require('#resources/regex-patterns');

const commonFields = {
  email: z
    .string({ required_error: ErrorMessages.required('Email') })
    .email({ message: ErrorMessages.email }),
  password: z
    .string({ required_error: ErrorMessages.required('Password') })
    .regex(RegexPatterns.PASSWORD, { message: ErrorMessages.password })
}

// Zod schema for user registration
const registerDto = z.object({
  fullName: z
    .string({ required_error: ErrorMessages.required('Full name') })
    .regex(RegexPatterns.FULL_NAME),
  email: commonFields.email,
  password: commonFields.password,
  confirmPassword: z
    .string({ required_error: ErrorMessages.required('Confirm password') })
    .min(8, { message: ErrorMessages.minLength('Confirm password', 8) }),
}).refine((data) => data.password === data.confirmCassword, {
  path: ['confirmCassword'],
  message: ErrorMessages.passwordMatch,
});

const loginDto = z.object({
  email: commonFields.email,
  password: commonFields.password,
})

// Export for use in services or validation logic
module.exports = {
  registerUserSchema: {
    tags: ['auth'],
    summary: 'Register a new user',
    body: zodToJsonSchema(registerDto),
  },
  loginUserSchema: {
    tags: ['auth'],
    summary: "User login",
    body: zodToJsonSchema(loginDto),
  }
};
