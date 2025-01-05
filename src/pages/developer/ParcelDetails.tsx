import imgDetails from '../../assets/images/details-document.png';
import usePlotStore from '../../store/plot-store';
import Button from '../../components/common/Button';

const ParcelDetails = () => {
  const { plot } = usePlotStore();

  const AddToWatchlist = () => {
    console.log('add to watchlist');
  };

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col px-7 pt-4'>
      <h1 className='text-[32px] font-bold text-black-muted mb-8'>
        {`Detailansicht Flurstück ${plot?.id}`}
      </h1>
      <div className='flex flex-col justify-center bg-white h-[440px] rounded-[16px] shadow-[6px_6px_54px_0px_#0000000D]'>
        <div className='flex flex-col items-center'>
          <img
            src={imgDetails}
            alt='details documentation'
            className='h-[100px] w-[100px]'
          />
          <p className='w-[560px] text-[32px] text-black-muted font-700 text-center mt-4'>
            See Detailansicht flurstück requirements document for details
          </p>
        </div>
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
