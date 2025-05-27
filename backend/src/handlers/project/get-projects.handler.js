const Project = require('#models/project.model');

/**
 * Get all User Projects
 *
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
module.exports = async function (request, reply) {
  const { userId } = request.user;

  // Optional query-string pagination:  ?page=1&limit=10
  const page = Number(request.query.page) || 1;
  const limit = Number(request.query.limit) || 10;
  const skip = (page - 1) * limit;

  const [projects, total] = await Promise.all([
    Project
      .find({ userId })
      .sort({ createdAt: -1 }) // newest first
      .skip(skip)
      .limit(limit),
    Project.countDocuments({ userId }),
  ]);

  return reply.success({
    projects: projects.map(p => p.toJSON()),
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  });
};
