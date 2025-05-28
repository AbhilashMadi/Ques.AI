import { useFetchProjectPodcastsQuery } from '@/redux/podcasts/podcasts-api';
import { rssImg, uploadImg, youtubeImg } from '@assets';
import { Modal } from '@custom';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

import DragDropPodcast from '@/components/drag-drop-podcast';
import TranscriptsList from '@/components/transcripts-list';
import AddYoutubeTranscriptForm from '@components/add-youtube-transcript-form';
import ChooseTranscriptTypeCard from '@components/choose-transcript-type-card';

type TranscriptType = 'rss' | 'youtube' | 'upload' | '';

export default function AddPodcastPage() {
  const [transcriptModel, setTranscriptModel] = useState<TranscriptType>('');
  const { projectId } = useParams();
  const { data } = useFetchProjectPodcastsQuery(projectId!);

  const setOpen = useCallback((transcript: TranscriptType) => { setTranscriptModel(transcript) }, []);
  const setClose = useCallback(() => setTranscriptModel(''), []);

  return (<>
    <Modal
      title="Upload from YouTube"
      isOpen={transcriptModel === 'youtube'}
      onClose={setClose}
      className="max-w-2xl">
      <AddYoutubeTranscriptForm setClose={setClose} />
    </Modal>
    <section className="flex flex-col gap-4">
      <h3 className="text-h2">Add podcast</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Transcript Type Cards */}
        <ChooseTranscriptTypeCard
          onPress={() => null}
          imgSrc={rssImg}
          title="RSS Feed"
          description="Import podcasts automatically from an RSS feed URL. Ideal for syncing episodes from existing platforms."
        />
        <ChooseTranscriptTypeCard
          onPress={() => setOpen('youtube')}
          imgSrc={youtubeImg}
          title="Youtube Video"
          description="Add a podcast by extracting audio and transcriptions from any public YouTube video."
        />
        <ChooseTranscriptTypeCard
          onPress={() => null}
          imgSrc={uploadImg}
          title="Upload Files"
          description="Upload audio, video, or transcript files directly from your device to create a podcast."
        />
        {/* DragDropPodcast */}
        {data?.data?.list?.length
          ? <TranscriptsList data={data?.data} />
          : <DragDropPodcast />}
      </div>
    </section>
  </>);
}
