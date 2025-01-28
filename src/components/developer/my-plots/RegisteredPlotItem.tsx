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
import { showRestrictions } from '../../../utils/helper-functions';
import parcelPlaceholder from '../../../assets/images/parcel-placeholder.webp';
import useAuthStore from '../../../store/auth-store';

type RegisteredPlotItemProps = {
  data: RegisteredPlotDetailsType;
};

const RegisteredPlotItem: FC<RegisteredPlotItemProps> = ({ data }) => {
  const navigate = useNavigate();
  const { getRegisteredPlotDetails, addPlotToWatchlist } = useRegisteredPlots();
  const { setRegisteredPlot } = useRegisteredPlotStore();
  const { user } = useAuthStore();

  const AddToWatchList = async () => {
    try {
      await addPlotToWatchlist(data.parcel.id.toString(), data);
      setRegisteredPlot(data);
      navigate('/developer/my-watchlist');
    } catch (err) {
      toast.error('Die Parzelle ist bereits in Ihrer Beobachtungsliste.');
      console.error(err);
    }
  };

  const handleViewDetails = async () => {
    try {
      const plotRegistered = await getRegisteredPlotDetails(
        data.parcel.id.toString()
      );
      setRegisteredPlot(plotRegistered);
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
      <div className='flex w-full py-2 space-x-8'>
        <ItemImage id={data.parcel.id.toString()} image={parcelPlaceholder} />

        <div className='flex flex-col justify-center w-full gap-y-8'>
          <div className='flex justify-between'>
            <DynamicTable
              data={data.parcel}
              columns={PLOT_SEARCH_COLUMNS}
              blurKeys={
                user?.tier === 'FREE'
                  ? [
                      'zipcode',
                      'municipality_name',
                      'communal_district',
                      'cadastral_area',
                      'cadastral_parcel',
                    ]
                  : []
              }
            />
          </div>
          <div className='flex justify-between'>
            <div>{showRestrictions(data)}</div>
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
