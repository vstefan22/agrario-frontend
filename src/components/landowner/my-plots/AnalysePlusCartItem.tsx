import { FC } from 'react';
import DynamicTable from '../../common/DynamicTable';
import ItemImage from '../../common/ItemImage';
import { PLOT_DETAILS_COLUMNS } from '../../../types/table-data-types';
import { PlotAnalysePlusType } from '../../../types/plot-types';
import delIcon from '../../../assets/images/del.png';

type AnalysePlusCartItemProps = {
  data: PlotAnalysePlusType;
  isEnable?: boolean;
};

const AnalysePlusCartItem: FC<AnalysePlusCartItemProps> = ({
  data,
  isEnable,
}) => {
  const IDNummerClass = !isEnable ? 'min-w-[188px]' : '';

  return (
    <div
      className='w-full bg-white rounded-[18px] p-4 py-10 my-3'
      style={{
        boxShadow: '6px 6px 54px 0px #0000000D',
        minHeight: '152px',
      }}
    >
      <div className='flex justify-between items-center mx-3'>
        <ItemImage
          id={data.id}
          className={`flex border-[0.16px] min-w-[116px] min-h-[104px] border-gray-medium/60 rounded-xl flex-col justify-center items-center ${IDNummerClass}`}
        />
        <div className='flex flex-col min-h-[104px] whitespace-nowrap'>
          <DynamicTable
            data={data}
            columns={PLOT_DETAILS_COLUMNS}
            customClassName='px-5'
          />
        </div>

        {isEnable && (
          <button>
            <div className='border-[1.12px] border-gray-blue-light rounded-[50%] p-[11px] flex'>
              <img src={delIcon} alt='Delete Icon' className='min-w-[14px]' />
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default AnalysePlusCartItem;
