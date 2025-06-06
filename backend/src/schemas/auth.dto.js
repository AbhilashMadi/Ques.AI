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
    .regex(RegexPatterns.PASSWORD_REGEX, { message: ErrorMessages.password }),
}

const registerDto = z.object({
  fullName: z
    .string({ required_error: ErrorMessages.required('Full name') })
    .regex(RegexPatterns.FULL_NAME_REGEX),
  email: commonFields.email,
  password: commonFields.password,
  confirmPassword: z
    .string({ required_error: ErrorMessages.required('Confirm password') })
    .min(8, { message: ErrorMessages.minLength('Confirm password', 8) }),
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: ErrorMessages.passwordMatch,
});

const verifyOtpDtp = z.object({ otp: z.string().min(6).max(6) })

const loginDto = z.object({
  email: commonFields.email,
  password: commonFields.password,
  remember: z.boolean().default(true),
})

const forgotPasswordDto = z.object({
  email: commonFields.email,
})

const resetPasswordDto = z.object({
  password: commonFields.password,
  confirmPassword: z
    .string({ required_error: ErrorMessages.required('Confirm password') })
    .min(8, { message: ErrorMessages.minLength('Confirm password', 8) }),
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: ErrorMessages.passwordMatch,
})

const resetPasswordQuerySchema = z.object({
  token: z.string(),
})

// Export for use in services or validation logic
module.exports = {
  registerUserSchema: {
    tags: ['auth'],
    summary: 'Register a new user',
    body: zodToJsonSchema(registerDto),
  },
  verifyOtpSchem: {
    tags: ['auth'],
    summary: 'Verify OTP',
    body: zodToJsonSchema(verifyOtpDtp),
  },
  resendVerifyOtpSchem: {
    tags: ['auth'],
    summary: 'Resend Verify OTP',
  },
  loginUserSchema: {
    tags: ['auth'],
    summary: "User login",
    body: zodToJsonSchema(loginDto),
  },
  logoutUserSchema: {
    tags: ['auth'],
    summary: "User logout",
  },
  refreshUserTokensSchema: {
    tags: ['auth'],
    summary: "Refresh access token"
  },
  meClainSchema: {
    tags: ['auth'],
    summary: "Claim 'Me'"
  },
  forgotPasswordSchema: {
    tags: ['auth'],
    summary: "Forgot Password",
    body: zodToJsonSchema(forgotPasswordDto),
  },
  resetPasswordSchema: {
    tags: ['auth'],
    summary: "Reset Password",
    body: zodToJsonSchema(resetPasswordDto),
    query: zodToJsonSchema(resetPasswordQuerySchema),
  }
};
