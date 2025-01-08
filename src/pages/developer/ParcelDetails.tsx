import ShowDetails from '../ShowDetails';
import Button from '../../components/common/Button';
import usePlotStore from '../../store/plot-store';

const ParcelDetails = () => {
  const { plot } = usePlotStore();

  const AddToWatchlist = () => {
    console.log('add to watchlist');
  };

  // TODO: use actual user property for this
  const isAnalizePlus = false;

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col px-7 pt-4'>
      <div>
        <h1 className='text-[32px] font-bold text-black-muted'>
          Detailansicht Flurstück Analyse Basic
        </h1>
        <div className='flex items-center gap-4 mb-4'>
          {/* dodati id */}
          <p className='text-black-muted font-semibold'>{plot?.id}</p>
          <p className='text-gray-dark-100/70 text-[12px]'>ID-Nummer</p>
        </div>
      </div>
      <div className='h-[440px] overflow-y-auto rounded-2xl'>
        <ShowDetails paid={isAnalizePlus} />
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
