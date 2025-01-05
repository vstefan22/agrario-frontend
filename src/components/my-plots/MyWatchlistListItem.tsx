import { FC } from 'react';
import DynamicTable from '../common/DynamicTable';
import { PLOT_SEARCH_COLUMNS } from '../../types/table-data-types';
import { PlotSearchType } from '../../types/plot-search-types';
import imgPlaceholder from '../../assets/images/image-placeholder.png';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';
import delIcon from '../../assets/images/del.png';

type MyWatchlistListItemProps = {
  data: PlotSearchType;
};

const MyWatchlistListItem: FC<MyWatchlistListItemProps> = ({ data }) => {
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
        <div className='flex shadow-md w-[192px] border-gray-neutral rounded-xl flex-col justify-center items-center'>
          <div className='mb-2 h-full w-full'>
            <img
              src={data.image || imgPlaceholder}
              width='100%'
              alt={'flurstuck-image'}
              className='object-cover h-full rounded-tl-xl rounded-tr-xl'
            />
          </div>
          <div className='flex items-center mb-3'>
            <h5 className='font-bold text-[16px] text-black-muted whitespace-nowrap mr-2'>
              {/* TODO: replace this with actual data.id */}
              {'FL-56141'}
            </h5>
            <p className='text-[12px] text-gray-dark-100 font-400'>ID-Nummer</p>
          </div>
        </div>
        <div className='flex flex-col'>
          <div className='flex gap-6'>
            <DynamicTable
              data={data}
              columns={PLOT_SEARCH_COLUMNS}
              customClassName='px-10'
            />

            <button onClick={handleDeletePlot}>
              <div className='border-[1.12px] border-[#C1D7E1] rounded-[50%] p-[11px] flex'>
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

export default MyWatchlistListItem;
