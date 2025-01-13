import ShowDetailsDeveloper from './ShowDetailsDeveloper';
import { toast } from 'react-toastify';
import Button from '../../components/common/Button';
import useRegisteredPlots from '../../hooks/registered-plot-hook';
import useRegisteredPlotStore from '../../store/registered-plot-store';

const ParcelDetails = () => {
  const { addPlotToWatchlist } = useRegisteredPlots();
  const { registeredPlot, updatePlotToMyList } = useRegisteredPlotStore();

  const AddToWatchlist = async () => {
    try {
      await addPlotToWatchlist(registeredPlot!);
      updatePlotToMyList(registeredPlot!);
    } catch (err) {
      toast.error(
        'Das Flurstück wurde nicht erfolgreich zur Beobachtungsliste hinzugefügt.'
      );
      console.error(err);
    }
  };

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col px-7 pt-4'>
      <div>
        <h1 className='text-[32px] font-bold text-black-muted'>
          Detailansicht Flurstück Analyse Basic
        </h1>
        <div className='flex items-center gap-4 mb-4'>
          <p className='text-black-muted font-semibold'>
            {registeredPlot?.parcel.id}
          </p>
          <p className='text-gray-dark-100/70 text-[12px]'>ID-Nummer</p>
        </div>
      </div>
      <div className='h-[440px] overflow-y-auto rounded-2xl'>
        {/* TODO: add registered plot data when show details type is fixed */}
        <ShowDetailsDeveloper data={[]} />
      </div>
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
    </div>
  );
};

export default ParcelDetails;
