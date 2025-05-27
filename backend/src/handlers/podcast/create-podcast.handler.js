const Podcast = require('#models/podcast.model');
const Project = require('#models/project.model');

const StatusCodes = require('#utils/status-codes');
const { NotFoundException } = require('#utils/exceptions');

/**
 * Create Podcast
 *
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
module.exports = async function (request, reply) {
  const { userId } = request.user;
  const {
    projectId,
    name,
    sourceType,
    sourceUrl,
    file,
    transcript,
  } = request.body;

  // Validate project existence and ownership
  const projectExists = await Project.findOne({
    _id: projectId,
    userId,
    status: 'active',
  });

  if (!projectExists) {
    throw new NotFoundException(`Active project with ID: ${projectId} not found.`);
  }

  // Construct podcast payload
  const podcastData = {
    userId,
    projectId,
    name,
    sourceType,
    sourceUrl: sourceType === 'upload' ? null : sourceUrl,
    file: sourceType === 'upload' ? file : undefined,
    transcript,
  };

  const podcast = new Podcast(podcastData);
  await podcast.save();

  return reply.success(
    podcast.toJSON(),
    'Podcast created successfully',
    StatusCodes.CREATED
  );
};
