import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';

const ThankYouInterest = () => {
  const navigate = useNavigate();

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col px-7 pt-4'>
      <h1 className='text-[32px] font-bold text-black-muted w-[60%]'>
        Vielen Dank für Ihr Interesse am Bieterverfahren
      </h1>
      <p className='text-gray-dark-100 my-4'>
        {`Vielen Dank für Ihr Interesse am Bieterverfahren. Ein Mitarbeiter von
        Agrario Energy prüft nun, ob Sie zum Bieterverfahren zugelassen werden.
        Wenn Sie alle relevanten Kriterien erfüllen, sind die nächsten Schritte
        wie folgt.

        Sie erhalten Zugang zu einem digitalen Datenraum, um eine
        detaillierte Prüfung der Anzeige vorzunehmen. Sie erstellen ein
        verbindliches Pacht- oder Kaufangebot innerhalb eines festgelegten
        Zeitraums. Ihrem Angebot können Sie weitere Informationsunterlagen Ihres
        Unternehmens beilegen. Der Eigentümer entscheidet, mit welchem
        Unternehmen er oder sie weitere Gespräche und Verhandlungen führen wird.`}
      </p>
      <p className='text-gray-dark-100'>
        Various versions have evolved over the years, sometimes by accident,
        sometimes on purpose (injected humour and the like).
      </p>

      <Button
        variant='bluePrimary'
        className='w-max px-8 mt-8 ml-auto'
        onClick={() => navigate('../active-auctions')}
      >
        Weitere Anzeigen ansehen
      </Button>
    </div>
  );
};

export default ThankYouInterest;
