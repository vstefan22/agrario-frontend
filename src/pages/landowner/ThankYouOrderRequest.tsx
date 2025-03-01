import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import GenericList from '../../components/common/GenericList';
import ThankYouMarketingItem from '../../components/landowner/my-plots/ThankYouMarketingItem';
import usePlotStore from '../../store/plot-store';

const ThankYouOrderRequest = () => {
  const navigate = useNavigate();
  const { basketPlots } = usePlotStore();

  const handleGoBackToMyPlots = () => {
    navigate('/landowner/my-plots');
  };

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col px-7 pt-4'>
      <h1 className='text-[32px] font-bold text-black-muted mb-6'>
        Vielen Dank für Ihre Bestellung
      </h1>
      <p className='w-[604px]'>
        Die Ergebnisse der "Analyse Plus" werden von 24 h in der Ansicht "Meine
        Flurstücke" zur Verfügung gestellt
      </p>

      <GenericList
        data={basketPlots}
        renderItem={(plot) => (
          <ThankYouMarketingItem key={plot.id} data={plot} />
        )}
      />

      <div className='ml-auto mt-6'>
        <Button variant='bluePrimary' onClick={handleGoBackToMyPlots}>
          Zurück zur Übersicht
        </Button>
      </div>
    </div>
  );
};

export default ThankYouOrderRequest;
