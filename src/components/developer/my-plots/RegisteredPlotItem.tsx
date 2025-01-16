import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../common/Button';
import DynamicTable from '../../common/DynamicTable';
import ItemImage from '../../common/ItemImage';
import useRegisteredPlots from '../../../hooks/registered-plot-hook';
import useRegisteredPlotStore from '../../../store/registered-plot-store';
import { PLOT_SEARCH_COLUMNS } from '../../../constants/table-data';
import { RegisteredPlotDetailsType } from '../../../types/plot-types';
import imagePlaceholder from '../../../assets/images/image-placeholder.png';

type RegisteredPlotItemProps = {
  data: RegisteredPlotDetailsType;
};

const RegisteredPlotItem: FC<RegisteredPlotItemProps> = ({ data }) => {
  const navigate = useNavigate();
  const { getRegisteredPlotDetails, addPlotToWatchlist } = useRegisteredPlots();
  const { registeredPlot, setRegisteredPlot, updateRegisteredPlot } =
    useRegisteredPlotStore();

  const AddToWatchList = async () => {
    setRegisteredPlot(data);
    if (!registeredPlot?.parcel.id) {
      return;
    }

    try {
      await addPlotToWatchlist(
        registeredPlot?.parcel.id.toString(),
        registeredPlot!
      );
      navigate('/developer/my-watchlist');
    } catch (err) {
      toast.error(
        'Das Flurstück wurde nicht erfolgreich zur Beobachtungsliste hinzugefügt.'
      );
      console.error(err);
    }
  };

  const handleViewDetails = async () => {
    try {
      setRegisteredPlot(data);

      const plotRegistered = await getRegisteredPlotDetails(
        registeredPlot!.parcel.id.toString()
      );
      updateRegisteredPlot(plotRegistered);
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
          <DynamicTable
            data={data.parcel}
            columns={PLOT_SEARCH_COLUMNS}
            customClassName='px-10'
          />
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

            <div className='flex gap-6'>
              {!data.parcel.is_in_watchlist && (
                <Button
                  type='button'
                  variant='blueSecondary'
                  className='w-[200px]'
                  onClick={AddToWatchList}
                >
                  Zu Watchlist hinzufügen
                </Button>
              )}

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

export default RegisteredPlotItem;
