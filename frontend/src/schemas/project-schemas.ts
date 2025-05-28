import { z } from 'zod';
import ServerKeys from '@resources/server-keys';

export const createProjectValidationSchema = z.object({
  [ServerKeys.TITLE]: z
    .string({
      required_error: 'Project name is required',
      invalid_type_error: 'Project name must be a string',
    })
    .min(1, { message: 'Project name cannot be empty' })
    .max(100, { message: 'Project name must be under 100 characters' })
    .regex(/^[a-zA-Z0-9_\-\s]+$/, {
      message: 'Project name can only contain letters, numbers, spaces, hyphens, and underscores',
    }),
  [ServerKeys.DESCRIPTION]: z
    .string()
    .max(300)
    .optional(),
});

export type CreateProjectInput = z.infer<typeof createProjectValidationSchema>;
