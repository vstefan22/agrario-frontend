import { FC } from 'react';
import DynamicTable from '../../common/DynamicTable';
import ItemImage from '../../common/ItemImage';
import { PLOT_DETAILS_COLUMNS } from '../../../constants/table-data';
import { PlotType } from '../../../types/plot-types';
import parcelPlaceholder from '../../../assets/images/parcel-placeholder.webp';

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
      <div className='flex justify-start gap-8 py-2 space-x-4'>
        <ItemImage
          id={data.id}
          image={parcelPlaceholder}
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
