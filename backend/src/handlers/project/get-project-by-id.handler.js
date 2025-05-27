const Project = require('#models/project.model');
const { NotFoundException } = require('#utils/exceptions');

/**
 * Get Project By ID
 * 
 * @param {import("fastify").FastifyRequest} request 
 * @param {import("fastify").FastifyReply} reply 
 */
module.exports = async function (request, reply) {
  const { userId } = request.user;
  const { projectId } = request.params;

  request.log.info({ userId, projectId }, 'GetProjectById: Fetching project');
  const project = await Project.findOne({
    _id: projectId,
    userId,
    status: 'active',
  });

  if (!project) {
    request.log.warn({ userId, projectId }, 'GetProjectById: Project not found');
    throw new NotFoundException(`${projectId} not found`);
  }

  request.log.info({ projectId }, 'GetProjectById: Project found and returned');
  return reply.success(project.toJSON());
};
