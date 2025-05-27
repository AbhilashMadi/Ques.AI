const Project = require('#models/project.model');
const { NotFoundException } = require('#utils/exceptions');

/**
 * Delete Project by ID (Soft Delete: set status to 'archived')
 * 
 * @param {import("fastify").FastifyRequest} request 
 * @param {import("fastify").FastifyReply} reply 
 */
module.exports = async function (request, reply) {
  const { userId } = request.user;
  const { projectId } = request.params;

  request.log.info({ userId, projectId }, 'DeleteProject: Attempting to archive project');

  const project = await Project.findOneAndUpdate(
    { _id: projectId, userId, status: { $ne: 'archived' } },
    { status: 'archived' },
    { new: true }
  );

  if (!project) {
    request.log.warn({ userId, projectId }, 'DeleteProject: Project not found or already deleted');
    throw new NotFoundException(`Project ${projectId} not found or already archived`);
  }

  request.log.info({ projectId }, 'DeleteProject: Project archived successfully');
  return reply.success({ projectId }, 'Project deleted successfully');
};
