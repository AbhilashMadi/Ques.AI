const Podcast = require('#models/podcast.model');
const { NotFoundException } = require('#utils/exceptions');

/**
 * Delete Podcast By Id
 * 
 * @param {import("fastify").FastifyRequest} request 
 * @param {import("fastify").FastifyReply} reply 
 */
module.exports = async function (request, reply) {
  const { userId } = request.user;
  const { podcastId } = request.body;

  console.log(`[Podcast::Delete] Request by user ${userId} for podcast ${podcastId}`);
  const podcast = await Podcast.findOne({ _id: podcastId, userId, status: 'active' });

  if (!podcast) {
    console.warn(`[Podcast::Delete] Podcast not found or already archived: ${podcastId}`);
    throw new NotFoundException(`Podcast with id: ${podcastId} not found.`);
  }

  podcast.status = 'archived';
  await podcast.save();

  console.log(`[Podcast::Delete] Podcast ${podcastId} archived by user ${userId}`);

  return reply.success(true, 'Podcast deleted successfully');
};
