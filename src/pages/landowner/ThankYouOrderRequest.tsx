import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
// import GenericList from '../../components/common/GenericList';
// import ThankYouMarketingItem from '../../components/landowner/my-plots/ThankYouMarketingItem';

const ThankYouOrderRequest = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderRequestData = async () => {
      // TODO: add actual backend call to fetch order request data
    };

    fetchOrderRequestData();
  }, []);

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col px-7 pt-4'>
      <h1 className='text-[32px] font-bold text-black-muted mb-6'>
        Vielen Dank für Ihre Bestellung
      </h1>
      <p className='w-[604px]'>
        Die Ergebnisse der Detailanalye PLUS werden innerhalb der kommenden 24 h
        in der Ansicht " Meine Grundstücke" zur Verfügung gestellt
      </p>

      {/* TODO: uncomment this list when actual data is fetched */}
      {/* <GenericList
        data={[]}
        renderItem={(plot) => (
          <ThankYouMarketingItem key={plot.id} data={plot} />
        )}
      /> */}

      <div className='ml-auto mt-6'>
        <Button
          variant='bluePrimary'
          onClick={() => {
            navigate('/landowner/my-plots');
          }}
        >
          Zurück zur Übersicht
        </Button>
      </div>
    </div>
  );
};

export default ThankYouOrderRequest;
