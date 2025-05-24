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

export type LoginFormInput = z.infer<typeof loginFormValidationSchema>;
