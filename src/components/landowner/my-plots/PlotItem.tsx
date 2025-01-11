import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button';
import DynamicTable from '../../common/DynamicTable';
import ItemImage from '../../common/ItemImage';
import usePlotStore from '../../../store/plot-store';
import { MY_PLOTS_COLUMNS } from '../../../constants/table-data';
import { PlotType } from '../../../types/plot-types';
import active from '../../../assets/images/active.png';
import inactive from '../../../assets/images/inactive.png';

type PlotItemProps = {
  data: PlotType;
};

const PlotItem: FC<PlotItemProps> = ({ data }) => {
  const navigate = useNavigate();
  const { setPlot } = usePlotStore();

  const handleViewDetails = () => {
    setPlot(data);
    navigate('/landowner/my-plots/details');
  };

  const handleFetchOffers = () => {
    console.log('handle fetch offers clicked.');
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
        <ItemImage
          id={data.id}
          image={data.image}
          className='border-[0.16px]'
        />
        <div className='flex flex-col'>
          <DynamicTable data={data} columns={MY_PLOTS_COLUMNS} />
          <div className='flex justify-end items-center pt-5 gap-3'>
            <img
              src={data.analyzePlus === 'active' ? active : inactive}
              alt={'aktiv/inaktiv image'}
              className='w-[60px] h-[22px] object-cover'
            />
            <p className='text-[14px] text-gray-dark-100 font-400 mr-3'>
              Analyse Plus
            </p>
            <Button
              variant='blueSecondary'
              type='button'
              onClick={handleViewDetails}
              className='mr-3'
            >
              Details
            </Button>

            <Button
              variant='bluePrimary'
              type='button'
              onClick={handleFetchOffers}
            >
              Angebote einholen
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlotItem;
