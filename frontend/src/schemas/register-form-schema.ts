import z from 'zod'
import ServerKeys from '@resources/server-keys'
import RegexPatterns from '@resources/regex-patterns'

export const registerFormSchema = z
  .object({
    [ServerKeys.FULL_NAME]: z
      .string()
      .regex(RegexPatterns.USERNAME, {
        message: 'Full name must contain only letters, numbers, underscores, or hyphens and be 3–30 characters long.',
      }),

    [ServerKeys.PASSWORD]: z
      .string()
      .regex(RegexPatterns.PASSWORD, {
        message:
          'Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one digit, and one special character.',
      }),

    [ServerKeys.CONFIRM_PASSWORD]: z
      .string()
      .regex(RegexPatterns.PASSWORD, {
        message: 'Confirm Password must follow the same rules as Password.',
      }),

    [ServerKeys.EMAIL]: z
      .string()
      .email({ message: 'Please enter a valid email address.' }),
  })
  .refine(
    (data) => data[ServerKeys.PASSWORD] === data[ServerKeys.CONFIRM_PASSWORD],
    {
      message: 'Passwords do not match.',
      path: [ServerKeys.CONFIRM_PASSWORD],
    }
  )

export type RegisterFormInput = z.infer<typeof registerFormSchema>
