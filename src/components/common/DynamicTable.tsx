import { FC } from 'react';

type Column = { key: string; label: string };
type DynamicTableProps = {
  columns: Column[];
  data: Record<string, unknown>;
  customClassName?: string;
  isVertical?: boolean;
  blurKeys?: string[];
};

const DynamicTable: FC<DynamicTableProps> = ({
  columns,
  data,
  customClassName = '',
  isVertical,
  blurKeys = [],
}) => {
  return (
    <table className={isVertical ? 'w-full' : ''}>
      <tbody
        className={
          !isVertical
            ? 'flex border border-gray-medium/60 rounded-xl'
            : 'border border-gray-medium/60'
        }
      >
        {columns.map((column) => {
          let showValue = '';
          if (column.key === 'area_square_meters') {
            const areaSquareMeters = Number(data[column.key]) / 10000;
            showValue = String(areaSquareMeters.toFixed(2));
          } else {
            showValue = String(data[column.key] ?? '-');
          }
          return (
            <tr
              key={column.key}
              className={
                !isVertical
                  ? 'flex flex-col border border-gray-medium border-t-0 border-l-0 border-b-0 last:border-r-0'
                  : 'border border-gray-medium/60 border-1'
              }
            >
              <td
                className={
                  !isVertical
                    ? `p-4 2040-2300:px-10 min-2300:px-12 font-semibold text-gray-dark-200 border-l-0 border-r-0 border-b-0 ${customClassName}`
                    : 'p-4 px-8 text-gray-dark-200'
                }
              >
                {column.label}
              </td>
              <td
                key={column.key}
                className={
                  !isVertical
                    ? `min-2040:flex min-2040:justify-center border border-gray-medium p-3 text-gray-dark-200 font-400 border-l-0 border-r-0 border-b-0 ${customClassName} ${
                        blurKeys.includes(column.key)
                          ? 'blur-[4px] pointer-events-none'
                          : ''
                      }`
                    : `border-l-[1px] border-gray-medium/60 w-[20%] px-12 ${
                        blurKeys.includes(column.key)
                          ? 'blur-[7px] pointer-events-none'
                          : ''
                      }`
                }
              >
                {showValue}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DynamicTable;
