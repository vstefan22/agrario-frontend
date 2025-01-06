import { FC } from 'react';
import DynamicTable from '../../common/DynamicTable';
import { PLOT_DETAILS_COLUMNS } from '../../../types/table-data-types';
import { AnalysePlusCartType } from '../../../types/analyse-plus-cart-types';
import delIcon from '../../../assets/images/del.png';

type AnalysePlusCartListItemProps = {
  data: AnalysePlusCartType;
  isEnable?: boolean;
};

const AnalysePlusCartListItem: FC<AnalysePlusCartListItemProps> = ({
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
        <div
          className={`flex border-[0.16px] min-w-[116px] min-h-[104px] border-gray-medium/60 rounded-xl flex-col justify-center items-center ${IDNummerClass}`}
        >
          <div className='flex items-center flex-col'>
            <h5 className='font-bold text-[16px] text-black-muted whitespace-nowrap'>
              {data.id}
            </h5>
            <p className='text-[12px] text-gray-dark-100 font-400'>ID-Nummer</p>
          </div>
        </div>
        <div className='flex flex-col min-h-[104px] whitespace-nowrap'>
          <DynamicTable
            data={data}
            columns={PLOT_DETAILS_COLUMNS}
            customClassName='px-5'
          />
        </div>

        {isEnable && (
          <button>
            <div className='border-[1.12px] border-[#C1D7E1] rounded-[50%] p-[11px] flex'>
              <img src={delIcon} alt='Delete Icon' className='min-w-[14px]' />
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default AnalysePlusCartListItem;
