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
import deleteIcon from '../../../assets/images/del.png';
import imagePlaceholder from '../../../assets/images/image-placeholder.png';

type PlotItemProps = {
  data: PlotType;
  onDelete?: (id: string) => void;
};

const PlotItem: FC<PlotItemProps> = ({ data, onDelete }) => {
  const navigate = useNavigate();
  const { setPlot } = usePlotStore();

  const handleViewDetails = () => {
    setPlot(data);
    navigate('/landowner/my-plots/details');
  };

  const handleFetchOffers = () => {
    setPlot(data);
    navigate('/landowner/my-plots/offer-preparation');
  };

  return (
    <div
      className='w-full bg-white rounded-[18px] p-4'
      style={{
        boxShadow: '6px 6px 54px 0px #0000000D',
        minHeight: '250px',
      }}
    >
      <div className='flex w-full py-2 space-x-8'>
        <ItemImage
          id={data.id}
          image={imagePlaceholder}
          className='border-[0.16px]'
        />

        <div className='flex flex-col justify-center w-full gap-y-8'>
          <div className='flex justify-end'>
            <DynamicTable data={data} columns={MY_PLOTS_COLUMNS} />
            {onDelete && (
              <div className='flex justify-center ml-2'>
                <button
                  className='cursor-pointer'
                  onClick={() => onDelete(data.id)}
                >
                  <div className='border-[1.12px] border-gray-blue-light rounded-[50%] p-[11px] flex'>
                    <img
                      src={deleteIcon}
                      alt='Delete Icon'
                      className='min-w-[14px]'
                    />
                  </div>
                </button>
              </div>
            )}
          </div>
          <div className='flex justify-end items-center gap-2'>
            <img
              src={data.analyse_plus ? active : inactive}
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
              Anzeige aufgeben
            </Button>
          </div>
        </div>
      </div>

      <div className='flex justify-between py-2 space-x-4 min-1780:justify-center min-1780:gap-x-[6rem]'>
        <div className='flex flex-col'>
          <div className='flex justify-end items-center pt-5 gap-3'></div>
        </div>
      </div>
    </div>
  );
};

export default PlotItem;
