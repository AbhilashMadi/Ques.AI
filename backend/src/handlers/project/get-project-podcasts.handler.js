const Podcast = require('#models/podcast.model');
const Project = require('#models/project.model');
const StatusCodes = require('#utils/status-codes');
const { NotFoundException } = require('#utils/exceptions');

/**
 * Get all the project Podcasts
 * 
 * @param {import("fastify").FastifyRequest} request 
 * @param {import("fastify").FastifyReply} reply 
 */
module.exports = async function (request, reply) {
  const { userId } = request.user;
  const { projectId } = request.params;

  // Validate the project exists and belongs to the user
  const project = await Project.findOne({ _id: projectId, userId, status: 'active' });
  if (!project) {
    throw new NotFoundException(`Project with id: ${projectId} not found`);
  }

  const page = Number(request.query.page) || 1;
  const limit = Number(request.query.limit) || 20;
  const skip = (page - 1) * limit;

  const query = { projectId, userId, status: 'active' };

  // Execute queries in parallel
  const [podcasts, total] = await Promise.all([
    Podcast
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Podcast.countDocuments(query),
  ]);

  return reply.success({
    list: podcasts.map(p => p.toJSON()),
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  }, 'Project podcasts fetched successfully', StatusCodes.OK);
};
