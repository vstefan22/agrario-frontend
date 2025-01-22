import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ShowDetailsDeveloper from './ShowDetailsDeveloper';
import Button from '../../components/common/Button';
import { LoadingSpinner } from '../../components/common/Loading';
import useRegisteredPlots from '../../hooks/registered-plot-hook';
import useRegisteredPlotStore from '../../store/registered-plot-store';

const ParcelDetails = () => {
  const { addPlotToWatchlist } = useRegisteredPlots();
  const { registeredPlot, updatePlotToMyList } = useRegisteredPlotStore();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const AddToWatchlist = async () => {
    try {
      setLoading(true);
      await addPlotToWatchlist(
        registeredPlot!.parcel!.id!.toString(),
        registeredPlot!
      );
      updatePlotToMyList(registeredPlot!);
      navigate('/developer/my-watchlist');
    } catch (err) {
      toast.error(
        'Das Flurstück wurde nicht erfolgreich zur Beobachtungsliste hinzugefügt.'
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  return (
    <div className='bg-gray-100 min-h-screen flex flex-col px-7 pt-4'>
      <div>
        <h1 className='text-[32px] font-bold text-black-muted'>
          Detailansicht
        </h1>
        <div className='flex items-center gap-4 mb-4'>
          <p className='text-black-muted font-semibold'>
            {registeredPlot?.parcel.id}
          </p>
          <p className='text-gray-dark-100/70 text-[12px]'>ID-Nummer</p>
        </div>
      </div>
      <div className='h-[75vh] overflow-y-auto rounded-2xl'>
        <ShowDetailsDeveloper data={registeredPlot?.parcel} />
      </div>

      {!registeredPlot?.parcel.is_in_watchlist && (
        <div className='ml-auto mt-8'>
          <Button
            type='button'
            variant='bluePrimary'
            className='w-[258px]'
            onClick={AddToWatchlist}
          >
            Zu Watchlist hinzufügen
          </Button>
        </div>
      )}
    </div>
  );
};

export default ParcelDetails;
