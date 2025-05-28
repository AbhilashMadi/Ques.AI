const Project = require('#models/project.model');

/**
 * Get all User Projects
 *
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
module.exports = async function (request, reply) {
  const { userId } = request.user;
  request.log.info({ userId }, 'GetProjects: Request received');

  // Optional query-string pagination:  ?page=1&limit=10
  const page = Number(request.query.page) || 1;
  const limit = Number(request.query.limit) || 10;
  const skip = (page - 1) * limit;
  request.log.info({ page, limit, skip }, 'GetProjects: Pagination parameters');

  const findAllQuery = { userId, status: 'active' }
  const [projects, total] = await Promise.all([
    Project
      .find(findAllQuery)
      .sort({ createdAt: -1 }) // newest first
      .skip(skip)
      .limit(limit),
    Project.countDocuments(findAllQuery),
  ]);

  request.log.info({ count: projects.length, total }, 'GetProjects: Projects fetched');

  return reply.success({
    list: projects.map(p => p.toJSON()),
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  });
};
