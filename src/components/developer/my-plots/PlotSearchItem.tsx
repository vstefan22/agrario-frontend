import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button';
import DynamicTable from '../../common/DynamicTable';
import { PLOT_SEARCH_COLUMNS } from '../../../types/table-data-types';
import { PlotSearchType } from '../../../types/plot-types';
import ItemImage from '../../common/ItemImage';

type PlotSearchItemProps = {
  data: PlotSearchType;
};

const PlotSearchItem: FC<PlotSearchItemProps> = ({ data }) => {
  const navigate = useNavigate();

  const AddToWatchList = () => {
    console.log('add to watchlist');
  };

  return (
    <div
      className='w-full bg-white rounded-[18px] p-4 mb-6'
      style={{
        boxShadow: '6px 6px 54px 0px #0000000D',
        minHeight: '250px',
      }}
    >
      <div className='flex justify-between py-2 space-x-4'>
        <ItemImage id={data.id} image={data.image} />
        <div className='flex flex-col'>
          <DynamicTable
            data={data}
            columns={PLOT_SEARCH_COLUMNS}
            customClassName='px-10'
          />
          <div className='flex justify-between items-center pt-5 gap-3 mt-auto'>
            <div>
              <h1 className='text-black-muted text-[14px]'>
                {data.infrastructure}
              </h1>
              <p className='text-gray-dark-100 text-[10px] opacity-[70%]'>
                {data.evaluation}
              </p>
            </div>
            <div className='flex gap-6'>
              <Button
                type='button'
                variant='blueSecondary'
                className='w-[200px]'
                onClick={AddToWatchList}
              >
                Zu Watchlist hinzufügen
              </Button>

              <Button
                type='button'
                variant='bluePrimary'
                className='w-[200px]'
                onClick={() =>
                  navigate('/developer/plots-search/parcel-details')
                }
              >
                Detail ansehen
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlotSearchItem;
