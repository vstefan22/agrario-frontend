import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import DynamicTable from '../../common/DynamicTable';
import Button from '../../common/Button';
import ItemImage from '../../common/ItemImage';
import { PLOT_SEARCH_COLUMNS } from '../../../types/table-data-types';
import { PlotSearchType } from '../../../types/plot-types';
import delIcon from '../../../assets/images/del.png';

type MyWatchlistItemProps = {
  data: PlotSearchType;
};

const MyWatchlistItem: FC<MyWatchlistItemProps> = ({ data }) => {
  const navigate = useNavigate();

  const handleDeletePlot = () => {
    console.log('delete plot');
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
          <div className='flex gap-6'>
            <DynamicTable
              data={data}
              columns={PLOT_SEARCH_COLUMNS}
              customClassName='px-10'
            />

            <button onClick={handleDeletePlot}>
              <div className='border-[1.12px] border-gray-blue-light rounded-[50%] p-[11px] flex'>
                <img src={delIcon} alt='Delete Icon' className='min-w-[14px]' />
              </div>
            </button>
          </div>

          <div className='flex justify-between items-center pt-5 gap-3 mt-auto'>
            <div>
              <h1 className='text-black-muted text-[14px]'>
                {data.infrastructure}
              </h1>
              <p className='text-gray-dark-100 text-[10px] opacity-[70%]'>
                {data.evaluation}
              </p>
            </div>
            <div className='flex gap-6 mr-[60px]'>
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

export default MyWatchlistItem;
