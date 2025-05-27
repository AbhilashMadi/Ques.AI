const { z } = require('zod');
const { zodToJsonSchema } = require('zod-to-json-schema');

const ErrorMessages = require('#resources/error-messages');
const RegexPatterns = require('#resources/regex-patterns');

const paginationQuerySchema = z.object({
  page: z
    .string()
    .regex(/^\d+$/, { message: 'Page must be a positive integer' })
    .optional()
    .default('1'),
  limit: z
    .string()
    .regex(/^\d+$/, { message: 'Limit must be a positive integer' })
    .optional()
    .default('10'),
});



const createProjectDto = z.object({
  title: z
    .string({ required_error: ErrorMessages.required('Project title') })
    .min(3, { message: ErrorMessages.minLength('Project title', 3) }),
  description: z
    .string()
    .max(500, { message: ErrorMessages.maxLength('Description', 500) })
    .optional(),
});

const getProjectByIdDto = z.object({
  projectId: z
    .string({ required_error: ErrorMessages.required('Project ID') })
    .regex(RegexPatterns.OBJECT_ID_REGEX, { message: ErrorMessages.invalidField('Project ID') }),
});

const deleteProjectDto = getProjectByIdDto;

module.exports = {
  createProjectSchema: {
    tags: ['project'],
    summary: 'Create a new project',
    body: zodToJsonSchema(createProjectDto),
  },

  getAllProjectsSchema: {
    tags: ['project'],
    summary: 'Get all projects for the logged-in user',
    querystring: zodToJsonSchema(paginationQuerySchema),
  },

  getProjectByIdSchema: {
    tags: ['project'],
    summary: 'Get project details by ID',
    params: zodToJsonSchema(getProjectByIdDto),
  },

  deleteProjectSchema: {
    tags: ['project'],
    summary: 'Delete project by ID',
    params: zodToJsonSchema(deleteProjectDto),
  },
};
