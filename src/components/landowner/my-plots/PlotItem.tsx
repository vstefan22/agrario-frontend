import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../common/Button';
import DynamicTable from '../../common/DynamicTable';
import ItemImage from '../../common/ItemImage';
import usePlots from '../../../hooks/plot-hook';
import usePlotStore from '../../../store/plot-store';
import { MY_PLOTS_COLUMNS } from '../../../constants/table-data';
import { PlotType } from '../../../types/plot-types';
import active from '../../../assets/images/active.png';
import inactive from '../../../assets/images/inactive.png';
import deleteIcon from '../../../assets/images/del.png';
import parcelPlaceholder from '../../../assets/images/parcel-placeholder.webp';

type PlotItemProps = {
  data: PlotType;
  onDelete?: (id: string) => void;
};

const PlotItem: FC<PlotItemProps> = ({ data, onDelete }) => {
  const navigate = useNavigate();
  const { addPlotToBasket, getBasketItems, getAnalysePlus } = usePlots();
  const { setBasketPlots, setPlot, setBasketSummary } = usePlotStore();

  const handleViewDetails = () => {
    setPlot(data);
    navigate('/landowner/my-plots/details');
  };

  const handleFetchOffers = () => {
    setPlot(data);
    navigate('/landowner/my-plots/offer-preparation');
  };

  const handleAnalysePlus = async () => {
    try {
      await addPlotToBasket(data.id, data);
      const basketItems = await getBasketItems();
      setBasketPlots(basketItems.basket_items);
      const analysePlus = await getAnalysePlus();
      setBasketSummary(analysePlus);
      navigate('/landowner/my-plots/analyse-plus');
      // eslint-disable-next-line
    } catch (err: any) {
      if (
        err.response.data.error ===
        'Analyse Plus for selected parcel is already purchased.'
      ) {
        toast.error(
          'Analyse Plus für das ausgewählte Grundstück wurde bereits gekauft.'
        );
      }
      console.error(err);
    }
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
          image={parcelPlaceholder}
          className='border-[0.16px]'
        />

        <div className='flex flex-col justify-center w-full gap-y-8'>
          <div className='flex justify-between'>
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
            <Button
              variant='bluePrimary'
              type='button'
              onClick={handleAnalysePlus}
            >
              Analyse PLUS kaufen
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
