import { type FC } from 'react';
import { uploadIconImg } from '@assets';
import { Button } from '@custom';

const DragDropPodcast: FC = () => {
  return (
    <section className="col-span-3 p-4 bg-card rounded">
      <div className="flex flex-col items-center justify-center gap-4 py-12 px-6 border border-dashed rounded-md border-muted">
        <img
          src={uploadIconImg}
          loading="lazy"
          decoding="async"
          height={120}
          width={120}
          alt="Upload Icon"
        />
        <div className="text-center space-y-1">
          <p className="text-base font-medium">
            Select a file or drag and drop here
          </p>
          <p className="text-sm text-muted">
            Podcast Media or Transcription Text (MP4, MOV, MP3, WAV, PDF, DOCX, TXT)
          </p>
        </div>
        <Button className="rounded-full border-primary text-primary" size="lg" variant="outline">
          Select File
        </Button>
      </div>
    </section>
  );
};

export default DragDropPodcast;
