import { FC } from 'react';
import DynamicTable from '../../common/DynamicTable';
import ItemImage from '../../common/ItemImage';
import { PLOT_DETAILS_COLUMNS } from '../../../constants/table-data';
import { PlotType } from '../../../types/plot-types';
import imagePlaceholder from '../../../assets/images/image-placeholder.png';

type OfferPreparationItemProps = {
  data: PlotType | null;
};

const OfferPreparationItem: FC<OfferPreparationItemProps> = ({ data }) => {
  if (!data) return <h1>No Plot Found</h1>;
  return (
    <div
      className='w-full bg-white rounded-[18px] p-4'
      style={{
        boxShadow: '6px 6px 54px 0px #0000000D',
        minHeight: '250px',
      }}
    >
      <div className='flex justify-between py-2 space-x-4 min-1780:justify-center min-1780:gap-x-[6rem]'>
        <ItemImage
          id={data.id}
          image={imagePlaceholder}
          className='border-[0.16px]'
        />
        <div className='flex flex-col'>
          <DynamicTable data={data} columns={PLOT_DETAILS_COLUMNS} />
        </div>
      </div>
    </div>
  );
};

export default OfferPreparationItem;
