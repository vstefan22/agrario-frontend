import { FC } from 'react';
import DynamicTable from '../../common/DynamicTable';
import ItemImage from '../../common/ItemImage';
import { PLOT_DETAILS_COLUMNS } from '../../../types/table-data-types';
import { PlotType } from '../../../types/plot-types';
import preparationImg from '../../../assets/images/preparation.png';

type ThankYouMarketingItemProps = {
  data: PlotType;
};

const ThankYouMarketingItem: FC<ThankYouMarketingItemProps> = ({ data }) => {
  return (
    <div
      className='w-full bg-white rounded-[18px] p-4'
      style={{
        boxShadow: '6px 6px 54px 0px #0000000D',
        minHeight: '250px',
      }}
    >
      <div className='flex justify-between py-2 space-x-4'>
        <ItemImage
          id={data.id}
          image={data.image}
          className='border-[0.16px]'
        />
        <div className='flex flex-col'>
          <DynamicTable data={data} columns={PLOT_DETAILS_COLUMNS} />
          <div className='flex justify-end items-center gap-3 mt-auto'>
            <img
              src={preparationImg}
              alt={'preparation image'}
              className='object-cover'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouMarketingItem;
