import type { FC } from 'react';
import type { Podcast, PodcastsListResponseType } from '@/types/response.types';
import type { TableColumnType } from '@components/custom/table';

import { useMemo, useState, useCallback } from 'react';
import { Button, Table } from '@custom';
import { toast } from 'react-hot-toast';

import ServerKeys from '@/resources/server-keys';
import { useDeletePodcastMutation } from '@redux/podcasts/podcasts-api';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

interface ITranscriptsList {
  data: PodcastsListResponseType['data'] | undefined;
}

const TranscriptsList: FC<ITranscriptsList> = ({ data }) => {
  const [deletePodcast] = useDeletePodcastMutation();
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});

  const handleDelete = useCallback(
    async (podcastId: string) => {
      setLoadingMap(prev => ({ ...prev, [podcastId]: true }));
      try {
        const { message } = await deletePodcast(podcastId).unwrap();
        toast.success(message);
      } catch (error: any) {
        console.error(error);
        toast.error(error?.data?.message || error.message || 'Something went wrong');
      } finally {
        setLoadingMap(prev => ({ ...prev, [podcastId]: false }));
      }
    },
    [deletePodcast]
  );

  const { projectId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleViewClick = (row: Podcast) => {
    navigate(`/projects/${projectId}/${row.podcastId}?title=${searchParams.get('title') ?? ''}`)
  }

  const columns: TableColumnType<Podcast>[] = useMemo(() => [
    {
      title: 'Name',
      dataIndex: ServerKeys.NAME,
      className: 'font-medium text-gray-800',
    },
    {
      title: 'Upload Date & Time',
      dataIndex: ServerKeys.UPDATED_AT,
      className: 'text-gray-600',
    },
    {
      title: 'Source',
      dataIndex: ServerKeys.SOURCE_TYPE,
      className: 'uppercase'
    },
    {
      title: 'Action',
      render: (row: Podcast) => {
        const isLoading = loadingMap[row.podcastId] || false;
        return (
          <div className="flex gap-3">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleViewClick(row)}
            >
              View</Button>
            <Button
              size="sm"
              variant="outline"
              className="text-destructive"
              loading={isLoading}
              disabled={isLoading}
              onClick={() => handleDelete(row.podcastId)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ], [handleDelete, loadingMap]);

  return (
    <section className="rounded bg-card p-4 col-span-3">
      <h4 className="text-h4 mb-2">Your Files</h4>
      <Table<Podcast>
        data={data?.list ?? []}
        columns={columns}
        rowsPerPage={5}
      />
    </section>
  );
};

export default TranscriptsList;
