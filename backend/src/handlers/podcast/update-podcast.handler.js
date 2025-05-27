const Podcast = require('#models/podcast.model');
const { NotFoundException, ForbiddenException } = require('#utils/exceptions');

/**
 * Update Podcast
 * 
 * @param {import("fastify").FastifyRequest} request 
 * @param {import("fastify").FastifyReply} replay 
 */
module.exports = async function (request, replay) {
  const { userId } = request.user;
  const { podcastId } = request.params;
  const updateData = request.body;

  request.log.info({ podcastId, userId }, 'Updating podcast');

  const podcast = await Podcast.findOne({ _id: podcastId });

  if (!podcast) {
    request.log.warn(`Podcast not found: ${podcastId}`);
    throw new NotFoundException(`Podcast with id: ${podcastId} not found.`);
  }

  if (podcast.userId.toString() !== userId) {
    request.log.warn(`Forbidden: user ${userId} tried to update podcast ${podcastId}`);
    throw new ForbiddenException('You are not allowed to update this podcast.');
  }

  // Apply updates only for provided fields
  if (updateData.name !== undefined) podcast.name = updateData.name;
  if (updateData.sourceType !== undefined) podcast.sourceType = updateData.sourceType;
  if (updateData.sourceUrl !== undefined) podcast.sourceUrl = updateData.sourceUrl;
  if (updateData.file !== undefined) podcast.file = updateData.file;
  if (updateData.transcript !== undefined) podcast.transcript = updateData.transcript;

  await podcast.save();

  request.log.info({ podcastId }, 'Podcast updated successfully');

  return replay.success(podcast.toJSON(), 'Podcast updated successfully');
};
