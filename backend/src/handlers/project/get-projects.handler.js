const Project = require('#models/project.model');
const Podcast = require('#models/podcast.model');

/**
 * Get all User Projects with Podcast Counts
 *
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
module.exports = async function (request, reply) {
  const { userId } = request.user;
  request.log.info({ userId }, 'GetProjects: Request received');

  const page = Number(request.query.page) || 1;
  const limit = Number(request.query.limit) || 10;
  const skip = (page - 1) * limit;

  const findAllQuery = { userId, status: 'active' };

  // Step 1: Fetch paginated projects
  const [projects, total] = await Promise.all([
    Project.find(findAllQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Project.countDocuments(findAllQuery),
  ]);

  const projectIds = projects.map(p => p._id);

  // Step 2: Aggregate podcast count by projectId
  const podcastCounts = await Podcast.aggregate([
    {
      $match: { projectId: { $in: projectIds } }
    },
    {
      $group: { _id: '$projectId', count: { $sum: 1 } },
    },
  ]);

  // Step 3: Map counts to projects
  const podcastCountMap = podcastCounts.reduce((acc, { _id, count }) => {
    acc[_id.toString()] = count;
    return acc;
  }, {});

  const enrichedProjects = projects.map(project => {
    const projectJSON = project.toJSON();
    projectJSON.podcastCount = podcastCountMap[project._id.toString()] || 0;
    return projectJSON;
  });

  request.log.info({ count: enrichedProjects.length, total }, 'GetProjects: Projects with podcast counts fetched');

  return reply.success({
    list: enrichedProjects,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  });
};
