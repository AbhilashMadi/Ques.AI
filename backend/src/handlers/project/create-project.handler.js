const Project = require('#models/project.model');
const StatusCodes = require('#utils/status-codes');

/**
 * Create Project
 * 
 * @param {import("fastify").FastifyRequest} request 
 * @param {import("fastify").FastifyReply} reply 
 */
module.exports = async function (request, reply) {
  const { userId } = request.user;
  const { title, description } = request.body;

  request.log.info({ userId, title }, 'CreateProject: Creating new project');

  const project = new Project({ userId, title, description });
  await project.save();

  request.log.info({ projectId: project._id }, 'CreateProject: Project created successfully');

  return reply.success(project.toJSON(), 'Project created successfully', StatusCodes.CREATED);
};
