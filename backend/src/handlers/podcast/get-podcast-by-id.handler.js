const Podcast = require('#models/podcast.model');
const { NotFoundException } = require('#utils/exceptions');

/**
 * Get Podcast By Id
 * 
 * @param {import("fastify").FastifyRequest} request 
 * @param {import("fastify").FastifyReply} reply 
 */
module.exports = async function (request, reply) {
  const { userId } = request.user;
  const { podcastId } = request.body;

  console.log(`[Podcast::Get] Request by user ${userId} for podcast ${podcastId}`);
  const podcast = await Podcast.findOne({ _id: podcastId, userId, status: 'active' });

  if (!podcast) {
    console.warn(`[Podcast::Get] Podcast not found or already archived: ${podcastId}`);
    throw new NotFoundException(`Podcast with id: ${podcastId} not found.`);
  }

  return reply.success(podcast.toJSON(), 'Podcast deleted successfully');
};
