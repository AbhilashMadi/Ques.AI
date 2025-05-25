import { z } from 'zod';
import ServerKeys from '@resources/server-keys';

export const addTranscriptValidationSchema = z.object({
  [ServerKeys.TRANSCRIPT_NAME]: z
    .string()
    .min(3, { message: 'Transcript name must be at least 3 characters long.' })
    .max(100, { message: 'Transcript name must not exceed 100 characters.' })
    .trim()
    .nonempty({ message: 'Transcript name is required.' }),

  [ServerKeys.TRANSCRIPT]: z
    .string()
    .min(10, { message: 'Transcript content must be at least 10 characters.' })
    .max(100000, { message: 'Transcript content is too long (max 100000 characters).' })
    .trim()
    .nonempty({ message: 'Transcript content is required.' }),

  [ServerKeys.TRNASCRIPT_CATEGORY]: z
    .enum(['youtube', 'rss', 'upload'], {
      errorMap: () => ({ message: 'Category must be one of: youtube, rss, or upload.' })
    }),
});

export type AddTranscriptInput = z.infer<typeof addTranscriptValidationSchema>;
