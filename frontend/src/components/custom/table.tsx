import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';
import Button from './button';

export type TableColumnType<T> = {
  title: string;
  dataIndex?: keyof T;
  render?: (value: T, index: number, record: T) => ReactNode;
  className?: string;
};

interface TableProps<T> {
  data: T[];
  columns: TableColumnType<T>[];
  rowKey?: (row: T, i: number) => string | number;
  showRowNumbers?: boolean;
  className?: string;
  rowsPerPage?: number;
}

const Table = <T,>({
  data,
  columns,
  rowKey = (_, i) => i,
  showRowNumbers = true,
  className = '',
  rowsPerPage = 10,
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className={cn('bg-card', className)}>
      <div className="overflow-x-auto">
        <table className="w-full table-auto text-left text-sm">
          <thead className="bg-muted rounded">
            <tr>
              {showRowNumbers && <th className="px-4 py-2 w-10">No.</th>}
              {columns.map((col, i) => (
                <th key={i} className={`px-4 py-2 text-muted ${col.className || ''}`}>
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-muted">
            {paginatedData.map((row, rowIndex) => (
              <tr key={rowKey(row, rowIndex)}>
                {showRowNumbers && (
                  <td className="px-4 py-2">
                    {(currentPage - 1) * rowsPerPage + rowIndex + 1}
                  </td>
                )}
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className={`px-4 py-2 text-muted ${col.className || ''}`}>
                    {col.render
                      ? col.render(row, rowIndex, row)
                      : col.dataIndex
                        ? (row[col.dataIndex] as ReactNode)
                        : null}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-end gap-2 px-4 py-3 text-sm text-muted">
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            disabled={currentPage === 1}
            onClick={handlePrev}
            size="sm"
            variant="outline"
          >
            Prev
          </Button>
          <Button
            disabled={currentPage === totalPages}
            onClick={handleNext}
            size="sm"
            variant="outline"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default Table;
