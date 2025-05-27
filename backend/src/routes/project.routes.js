const {
  createProjectSchema,
  deleteProjectSchema,
  getAllProjectsSchema,
  getProjectByIdSchema,
} = require('#schemas/project.dto');
const authMiddleware = require('#middlewares/authenticate.middleware');

module.exports = async function (fastify) {
  // Create a new project
  fastify.post('/projects', {
    schema: createProjectSchema,
    preValidation: authMiddleware,
    handler: require('#handlers/project/create-project.handler'),
  });

  // Get all projects for the logged-in user
  fastify.get('/projects', {
    schema: getAllProjectsSchema,
    preValidation: authMiddleware,
    handler: require('#handlers/project/get-projects.handler'),
  });

  // Get project by ID
  fastify.get('/projects/:projectId', {
    schema: getProjectByIdSchema,
    preValidation: authMiddleware,
    handler: require('#handlers/project/get-project-by-id.handler'),
  });

  // Delete project by ID
  fastify.delete('/projects/:projectId', {
    schema: deleteProjectSchema,
    preValidation: authMiddleware,
    handler: require('#handlers/project/delete-project.handler'),
  });
};
