import ServerKeys from '@resources/server-keys';
import z from 'zod';
import RegexPatterns from '@resources/regex-patterns';

export const loginFormValidationSchema = z.object({
  [ServerKeys.EMAIL]: z
    .string()
    .min(1, 'Email is required.')
    .email('Please enter a valid email address.'),
  [ServerKeys.PASSWORD]: z
    .string()
    .min(1, 'Password is required.')
    .regex(
      RegexPatterns.PASSWORD,
      'Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
    ),
  [ServerKeys.REMEMBER]: z.boolean().optional(),
});

export const registerFormSchema = loginFormValidationSchema.extend({
  [ServerKeys.FULL_NAME]: z
    .string()
    .regex(RegexPatterns.USERNAME, {
      message: 'Full name must contain only letters, numbers, underscores, or hyphens and be 3–30 characters long.',
    }),
  [ServerKeys.CONFIRM_PASSWORD]: z
    .string()
    .regex(RegexPatterns.PASSWORD, {
      message: 'Confirm Password must follow the same rules as Password.',
    }),
}).refine(
  (data) => data[ServerKeys.PASSWORD] === data[ServerKeys.CONFIRM_PASSWORD],
  {
    message: 'Passwords do not match.',
    path: [ServerKeys.CONFIRM_PASSWORD],
  }
)

export const forgotPasswordValidationSchema = loginFormValidationSchema.pick({ [ServerKeys.EMAIL]: true })

export const resetPasswordValidationSchema = loginFormValidationSchema
  .pick({
    [ServerKeys.PASSWORD]: true,
  }).extend({
    [ServerKeys.CONFIRM_PASSWORD]: z
      .string()
      .regex(RegexPatterns.PASSWORD, {
        message: 'Confirm Password must follow the same rules as Password.',
      }),
  }).refine(
    (data) => data[ServerKeys.PASSWORD] === data[ServerKeys.CONFIRM_PASSWORD], {
    message: 'Passwords do not match.',
    path: [ServerKeys.CONFIRM_PASSWORD],
  });



export type RegisterFormInput = z.infer<typeof registerFormSchema>
export type LoginFormInput = z.infer<typeof loginFormValidationSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordValidationSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordValidationSchema>;
