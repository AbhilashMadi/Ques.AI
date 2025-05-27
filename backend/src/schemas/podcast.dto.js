const { z } = require('zod');
const { zodToJsonSchema } = require('zod-to-json-schema');

const ErrorMessages = require('#resources/error-messages');
const RegexPatterns = require('#resources/regex-patterns');

// Sub-schemas
const fileDto = z.object({
  name: z.string({ required_error: ErrorMessages.required('File name') }),
  size: z.number({ required_error: ErrorMessages.required('File size') }),
  mimeType: z.string({ required_error: ErrorMessages.required('MIME type') }),
  url: z.string({ required_error: ErrorMessages.required('File URL') }),
});

// Main DTOs
const createPodcastDto = z.object({
  projectId: z
    .string({ required_error: ErrorMessages.required('Project ID') })
    .regex(RegexPatterns.OBJECT_ID_REGEX, { message: ErrorMessages.invalidField('Project ID') }),

  name: z
    .string({ required_error: ErrorMessages.required('Podcast name') })
    .min(3, { message: ErrorMessages.minLength('Podcast name', 3) }),

  sourceType: z.enum(['rss', 'youtube', 'upload'], {
    required_error: ErrorMessages.required('Source type'),
    invalid_type_error: ErrorMessages.invalidField('Source type'),
  }),

  sourceUrl: z
    .string()
    .optional(),

  file: fileDto.optional(),

  transcript: z.string().optional(),
});

// Params for ID-based routes
const getPodcastByIdDto = z.object({
  podcastId: z
    .string({ required_error: ErrorMessages.required('Podcast ID') })
    .regex(RegexPatterns.OBJECT_ID_REGEX, { message: ErrorMessages.invalidField('Podcast ID') }),
});

// DTO for updating a podcast
const updatePodcastDto = z.object({
  name: z
    .string()
    .min(3, { message: ErrorMessages.minLength('Podcast name', 3) })
    .optional(),

  sourceType: z.enum(['rss', 'youtube', 'upload'], {
    invalid_type_error: ErrorMessages.invalidField('Source type'),
  }).optional(),

  sourceUrl: z.string().optional(),

  file: fileDto.optional(),

  transcript: z.string().optional(),
});

// Fastify-compatible schemas
module.exports = {
  createPodcastSchema: {
    tags: ['podcast'],
    summary: 'Create a new podcast',
    body: zodToJsonSchema(createPodcastDto),
  },

  getPodcastByIdSchema: {
    tags: ['podcast'],
    summary: 'Get podcast by ID',
    params: zodToJsonSchema(getPodcastByIdDto),
  },

  updatePodcastDto: {
    tags: ['podcast'],
    summary: 'Update podcast by ID',
    params: zodToJsonSchema(getPodcastByIdDto),
    body: zodToJsonSchema(updatePodcastDto),
  },

  deletePodcastSchema: {
    tags: ['podcast'],
    summary: 'Delete podcast by ID',
    params: zodToJsonSchema(getPodcastByIdDto),
  },
};
