import ChooseTranscriptTypeCard from '@components/choose-transcript-type-card';
import { rssImg, youtubeImg, uploadImg } from '@assets';
import DragDropPodcast from '@components/drag-drop-podcast';

export default function AddPodcastPage() {
  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-h2">Add podcast</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Transcript Type Cards */}
        <ChooseTranscriptTypeCard
          imgSrc={rssImg}
          title="RSS Feed"
          description="Import podcasts automatically from an RSS feed URL. Ideal for syncing episodes from existing platforms."
        />
        <ChooseTranscriptTypeCard
          imgSrc={youtubeImg}
          title="Youtube Video"
          description="Add a podcast by extracting audio and transcriptions from any public YouTube video."
        />
        <ChooseTranscriptTypeCard
          imgSrc={uploadImg}
          title="Upload Files"
          description="Upload audio, video, or transcript files directly from your device to create a podcast."
        />
        {/* DragDropPodcast */}
        <DragDropPodcast />
      </div>
    </section>
  );
}
