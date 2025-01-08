import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import DynamicTable from '../../common/DynamicTable';
import Button from '../../common/Button';
import ItemImage from '../../common/ItemImage';
import { PLOT_DETAILS_COLUMNS } from '../../../types/table-data-types';
import { ActiveAuctionsType } from '../../../types/plot-types';
import active from '../../../assets/images/vermarktung-aktiv.png';
import inactive from '../../../assets/images/vermarktung-in-vorbereitung.png';

type ActiveAuctionsItemProps = {
  data: ActiveAuctionsType;
  isDetails?: boolean;
};

const ActiveAuctionsItem: FC<ActiveAuctionsItemProps> = ({
  data,
  isDetails,
}) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate('details');
  };

  return (
    <div
      className='w-full bg-white rounded-[18px] p-4'
      style={{
        boxShadow: '6px 6px 54px 0px #0000000D',
        minHeight: '250px',
      }}
    >
      <div className='flex justify-between py-2 space-x-4'>
        <ItemImage id={data.id} image={data.image} />
        <div className='flex flex-col'>
          <DynamicTable data={data} columns={PLOT_DETAILS_COLUMNS} />
          <div className='flex justify-between items-center pt-5 gap-3'>
            <div>
              <h1 className='text-black-muted text-[14px]'>
                {data.infrastructure}
              </h1>
              <p className='text-gray-dark-100 text-[10px] opacity-[70%]'>
                {data.evaluation}
              </p>
            </div>
            <div className='flex items-center'>
              <img
                src={data.analyzePlus === 'active' ? active : inactive}
                alt={`aktiv/inaktiv image`}
                className='mr-4 h-[22px] object-cover'
              />

              {isDetails ? (
                ''
              ) : (
                <Button
                  variant='bluePrimary'
                  type='button'
                  onClick={handleViewDetails}
                >
                  Detail ansehen
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveAuctionsItem;
