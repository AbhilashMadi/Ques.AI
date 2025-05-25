import type { FC } from 'react';
import { useMemo } from 'react';
import { Button, Table } from '@custom';
import type { TableColumnType } from '@components/custom/table';

const TranscriptsList: FC = () => {
  const data = [
    { id: 1, name: 'THE SIDEPOD S2 EPISODE 15', dateTime: '25 Oct 23 | 09:04' },
    { id: 2, name: 'THE SIDEPOD S2 EPISODE 17', dateTime: '27 Oct 23 | 11:08' },
    { id: 3, name: 'THE SIDEPOD S2 EPISODE 20', dateTime: '31 Oct 23 | 20:28' },
    // { id: 3, name: 'THE SIDEPOD S2 EPISODE 20', dateTime: '31 Oct 23 | 20:28' },
    // { id: 4, name: 'THE SIDEPOD S2 EPISODE 20', dateTime: '31 Oct 23 | 20:28' },
    // { id: 5, name: 'THE SIDEPOD S2 EPISODE 20', dateTime: '31 Oct 23 | 20:28' },
    // { id: 6, name: 'THE SIDEPOD S2 EPISODE 20', dateTime: '31 Oct 23 | 20:28' },
    // { id: 7, name: 'THE SIDEPOD S2 EPISODE 20', dateTime: '31 Oct 23 | 20:28' },
    // { id: 8, name: 'THE SIDEPOD S2 EPISODE 20', dateTime: '31 Oct 23 | 20:28' },
  ];

  const columns: TableColumnType<{ id: number; name: string; dateTime: string }>[] = useMemo(
    () => [
      {
        title: 'Name',
        dataIndex: 'name' as const,
        className: 'font-medium text-gray-800',
      },
      {
        title: 'Upload Date & Time',
        dataIndex: 'dateTime' as const,
        className: 'text-gray-600',
      },
      {
        title: 'Action',
        render: (
          // _row: { id: number; name: string; dateTime: string }
        ) => (<div className="flex gap-3">
          <Button size="sm" variant="outline">View</Button>
          <Button size="sm" variant="outline" className="text-destructive">Delete</Button>
        </div>),
      },
    ], []);

  return (
    <section className="rounded bg-white p-4 col-span-3">
      <h4 className="text-h4 mb-2">Your Files</h4>
      <Table data={data} columns={columns} rowsPerPage={5} />
    </section>
  );
};

export default TranscriptsList;
