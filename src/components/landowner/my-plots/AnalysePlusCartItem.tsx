import { FC } from 'react';
import DynamicTable from '../../common/DynamicTable';
import ItemImage from '../../common/ItemImage';
import { PLOT_DETAILS_COLUMNS } from '../../../constants/table-data';
import { PlotAnalysePlusType } from '../../../types/plot-types';
import delIcon from '../../../assets/images/del.png';

type AnalysePlusCartItemProps = {
  data: PlotAnalysePlusType;
  onDelete?: (id: string) => void;
};

const AnalysePlusCartItem: FC<AnalysePlusCartItemProps> = ({
  data,
  onDelete,
}) => {
  const IDNummerClass = !onDelete ? 'min-w-[188px]' : '';
  return (
    <div
      className='w-full bg-white rounded-[18px] p-4 py-10 my-3'
      style={{
        boxShadow: '6px 6px 54px 0px #0000000D',
        minHeight: '152px',
      }}
    >
      <div className='flex justify-between items-stretch mx-3'>
        <ItemImage
          id={data.id}
          className={`flex border-[0.16px] min-w-[116px] min-h-[104px] max-w-[116px] border-gray-medium/60 rounded-xl flex-col justify-center items-center ${IDNummerClass}`}
        />
        <div className='flex flex-col min-h-[104px] whitespace-nowrap mr-2'>
          <DynamicTable
            data={data}
            columns={PLOT_DETAILS_COLUMNS}
            customClassName='px-5'
          />
        </div>

        {onDelete && (
          <button className='cursor-pointer' onClick={() => onDelete(data.id)}>
            <div className='border-[1.12px] border-gray-blue-light rounded-[50%] p-[12px] flex'>
              <img src={delIcon} alt='Delete Icon' className='min-w-[14px]' />
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default AnalysePlusCartItem;
