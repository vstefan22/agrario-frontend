import { FC } from 'react';

type Column = { key: string; label: string };
type DynamicTableProps = {
  columns: Column[];
  data: Record<string, unknown>;
};

const DynamicTable: FC<DynamicTableProps> = ({ columns, data }) => {
  return (
    <table>
      <tbody className='flex border border-gray-medium/60 rounded-xl'>
        {columns.map((column) => (
          <tr
            key={column.key}
            className='flex flex-col border border-gray-medium border-t-0 border-l-0 border-b-0 last:border-r-0'
          >
            <td className='p-4 font-semibold text-gray-dark-200 border-l-0 border-r-0 border-b-0'>
              {column.label}
            </td>
            <td
              key={column.key}
              className='border border-gray-medium p-3 text-gray-dark-200 font-400 border-l-0 border-r-0 border-b-0'
            >
              {String(data[column.key] ?? '-')}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DynamicTable;
