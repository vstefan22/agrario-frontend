import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import AnalysePlusCartList from '../../components/landowner/my-plots/AnalysePlusCartList';
import { analysePlusCartData, analysePlusValues } from '../../../mockData';

const AnalysePlusCart = () => {
  const navigate = useNavigate();

  const handleAddPlot = () => {
    navigate('/landowner/my-plots/offer-preparation');
  };

  const handleStripeCheckout = () => {
    // TODO: add stripe checkout request
    console.log('stripe checkout clicked.');
  };

  const handleReedemCode = () => {
    // TODO: add reedem code request
    console.log('reedem code clicked.');
  };

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col px-7 pt-4'>
      <h1 className='text-[32px] font-bold text-black-muted'>
        Warenkorb Analyse PLUS
      </h1>
      <p className='text-[16px] text-gray-dark-100 mt-2'>
        There are many variations of passages of Lorem Ipsum available, but the
        majority have suffered alteration in some form.
      </p>
      <div className='flex justify-between mb-4'>
        <h2 className='font-bold mt-4 text-[18px]'>
          Sie haben folgende Flurstucke zur Prufung ausgewahlt
        </h2>
        <Button
          type='button'
          variant='bluePrimary'
          onClick={handleAddPlot}
          className='w-[280px] h-[48px]'
        >
          Weitere Flurstucke hinzufugen
        </Button>
      </div>

      <AnalysePlusCartList data={analysePlusCartData} isEnable />

      <div className='flex justify-between my-8'>
        <div className='mt-auto flex gap-6'>
          <Button
            type='button'
            variant='blueSecondary'
            onClick={() => navigate(-1)}
            className='w-[280px] h-[48px]'
          >
            Abbrechen
          </Button>
          <Button
            type='button'
            variant='bluePrimary'
            onClick={handleStripeCheckout}
            className='w-[280px] h-[48px]'
          >
            Analyse PLUS kaufen
          </Button>
        </div>
        <div className='bg-white rounded-xl shadow-md px-6 py-4 text-right flex flex-col gap-4 text-gray-dark-200'>
          <div className='flex flex-col space-y-3 mb-3'>
            <p>
              Number of Items: <strong>{analysePlusValues.items}</strong>
            </p>
            <p>
              Cost per Item:{' '}
              <strong>
                {analysePlusValues.costPerItem.toFixed(2).replace('.', ',')} €
              </strong>
            </p>
            <p>
              Sum of items:{' '}
              <strong>
                {analysePlusValues.sumOfItems.toFixed(2).replace('.', ',')} €
              </strong>
            </p>
            <p>
              Tax in percent:{' '}
              <strong>{analysePlusValues.taxPercent}% MWSt </strong>
            </p>
            <p>
              Tax amount:{' '}
              <strong>
                {analysePlusValues.taxAmount.toFixed(2).replace('.', ',')} €
              </strong>
            </p>
            <p className='text-[14px]'>
              Subtotal:{' '}
              <strong>
                {analysePlusValues.subtotal.toFixed(2).replace('.', ',')} €
              </strong>
            </p>
          </div>

          <div className='flex justify-end items-center max-[746px]:flex-col max-[746px]:items-end'>
            <h3 className='mr-6'>Rabattcode einisen</h3>
            <div className='flex'>
              <input
                type='text'
                placeholder='Gutschein-Code'
                className='border-[1px] border-r-0 py-1 px-2 rounded-l-md border-gray-medium/60 w-[180px]'
              />
              <Button
                type='button'
                variant='bluePrimary'
                onClick={handleReedemCode}
                className='w-[90px] h-[48px] text-[16px]'
              >
                Confirm
              </Button>
            </div>
          </div>

          <div className='flex flex-col mt-3'>
            <p>
              Total:{' '}
              <strong>
                {analysePlusValues.total.toFixed(2).replace('.', ',')} €
              </strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysePlusCart;
