import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';

const ThankYouSubscribe = () => {
  const navigate = useNavigate();

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col px-7 pt-4'>
      <h1 className='text-[32px] font-bold text-black-muted'>
        Danke für das Abschließen des Abonements
      </h1>
      <p className='text-gray-dark-100 mt-2 w-[60%]'>
        Danke für das Abschließen des Abonements. Sie können jetzt weitere
        Details zu Flurstücken und aktiven Anzeigen einsehen und ihr Interesse
        an Bieterverfahren bekunden. Der Update ihres Abonement kann bis zu 10
        Minuten dauern
      </p>

      <Button
        type='button'
        variant='bluePrimary'
        className='w-[342px] ml-auto mt-12'
        onClick={() => navigate('/developer')}
      >
        Zurück zur Übersicht
      </Button>
    </div>
  );
};

export default ThankYouSubscribe;
