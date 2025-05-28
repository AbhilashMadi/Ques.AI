import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { MoveLeftIcon } from '@icons';
import { Button } from '@custom';
import { useGetPodcastQuery, useUpdateTranscriptMutation } from '@redux/podcasts/podcasts-api';

export default function EditTranscriptPage() {
  const navigate = useNavigate();
  const { transcriptId } = useParams();

  const { data, isFetching } = useGetPodcastQuery(transcriptId!, {
    skip: !transcriptId,
  });

  const [updateTranscript, { isLoading: isUpdating }] = useUpdateTranscriptMutation();

  const originalTranscript = useMemo(() => data?.data.transcript ?? '', [data]);
  const [editableTranscript, setEditableTranscript] = useState<string>('');

  const [isEditing, setIsEditing] = useState(false);

  // Sync initial data to editableTranscript once fetched
  useEffect(() => {
    if (originalTranscript) {
      setEditableTranscript(originalTranscript);
    }
  }, [originalTranscript]);

  const handleEditToggle = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleSave = useCallback(async () => {
    if (!transcriptId) return;

    try {
      await updateTranscript({
        podcastId: transcriptId,
        transcript: editableTranscript,
      }).unwrap();
      toast.success('Transcript updated successfully');
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update transcript');
    }
  }, [editableTranscript, transcriptId, updateTranscript]);

  const handleDiscard = useCallback(() => {
    setEditableTranscript(originalTranscript);
    setIsEditing(false);
    toast.success('Changes discarded');
  }, [originalTranscript]);

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <button
          className="flex items-center gap-2 text-sm sm:text-base cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <MoveLeftIcon height={18} />
          <span>Edit Transcript</span>
        </button>

        {/* Buttons */}
        <div className="flex flex-wrap gap-2">
          {!isEditing && (
            <Button className="bg-foreground" size="sm" onClick={handleEditToggle}>
              Edit
            </Button>
          )}
          {isEditing && (
            <>
              <Button
                className="bg-green-400"
                size="sm"
                onClick={handleSave}
                disabled={isUpdating || editableTranscript === originalTranscript}
                loading={isUpdating}
              >
                {isUpdating ? 'Saving...' : 'Save'}
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDiscard}
                disabled={isUpdating}
              >
                Discard
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Content Area */}
      <article className="bg-card p-4 sm:p-6 md:p-8 rounded h-[74dvh] overflow-y-auto space-y-4 text-sm sm:text-base leading-relaxed text-muted">
        {isFetching ? (
          'Loading...'
        ) : isEditing ? (
          <textarea
            value={editableTranscript}
            onChange={(e) => setEditableTranscript(e.target.value)}
            className="w-full resize-none outline-none bg-transparent"
            rows={20}
          />
        ) : (
          <p className="text-wrap break-all">{originalTranscript}</p>
        )}
      </article>
    </>
  );
}
