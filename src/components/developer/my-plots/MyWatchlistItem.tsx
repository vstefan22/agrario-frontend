import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import DynamicTable from '../../common/DynamicTable';
import Button from '../../common/Button';
import ItemImage from '../../common/ItemImage';
import { PLOT_SEARCH_COLUMNS } from '../../../constants/table-data';
import { RegisteredPlotDetailsType } from '../../../types/plot-types';
import delIcon from '../../../assets/images/del.png';
import imagePlaceholder from '../../../assets/images/image-placeholder.png';
import useRegisteredPlots from '../../../hooks/registered-plot-hook';
import useRegisteredPlotStore from '../../../store/registered-plot-store';
import { toast } from 'react-toastify';

type MyWatchlistItemProps = {
  data: RegisteredPlotDetailsType;
};

const MyWatchlistItem: FC<MyWatchlistItemProps> = ({ data }) => {
  const navigate = useNavigate();
  const { deletePlotFromWatchlist, getRegisteredPlotDetails } =
    useRegisteredPlots();
  const {
    removeMyRegisteredPlot,
    removeRegisteredPlotFromMyList,
    setMyRegisteredPlot,
  } = useRegisteredPlotStore();

  const handleDeletePlot = async () => {
    const plotId = data.parcel.id.toString();
    try {
      await deletePlotFromWatchlist(plotId);
      removeMyRegisteredPlot(plotId);
      removeRegisteredPlotFromMyList(plotId);
      toast.success(
        'Das Flurstück wurde erfolgreich aus der Beobachtungsliste entfernt'
      );
    } catch (err) {
      console.error(err);
      toast.error('Das Flurstück wurde nicht erfolgreich gelöscht');
    }
  };

  const handleViewDetails = async () => {
    try {
      const plotDetails = await getRegisteredPlotDetails(
        data.parcel.id.toString()
      );
      setMyRegisteredPlot(plotDetails);
      navigate('/developer/registered-plots/parcel-details');
    } catch (err) {
      console.error(err);
    }
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
        <ItemImage id={data.parcel.id.toString()} image={imagePlaceholder} />
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
              {(() => {
                const { criteria } = data;
                const restrictions = [];
                if (!criteria?.no_usage_restriction) {
                  if (!criteria?.wind_energy_restriction) {
                    restrictions.push('Wind');
                  }
                  if (!criteria?.solar_energy_restriction) {
                    restrictions.push('Freiflächensolar');
                  }
                  if (!criteria?.energy_storage_restriction) {
                    restrictions.push('Energie');
                  }
                  if (!criteria?.eco_enhancements_restriction) {
                    restrictions.push('Biodiversität');
                  }
                } else {
                  restrictions.push(
                    'Wind, Freiflächensolar, Energie, Biodiversität'
                  );
                }
                if (restrictions.length > 0) {
                  return (
                    <>
                      <h1 className='text-black-muted text-[14px]'>
                        {restrictions.join(', ')}
                      </h1>
                      <p className='text-gray-dark-100 text-[10px] opacity-[70%]'>
                        Potentiell geeignet
                      </p>
                    </>
                  );
                }
                return null;
              })()}
            </div>
            <div className='flex gap-6 mr-[60px]'>
              <Button
                type='button'
                variant='bluePrimary'
                className='w-[200px]'
                onClick={handleViewDetails}
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
