import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../components/common/Button';
import GenericList from '../../components/common/GenericList';
import AnalysePlusCartItem from '../../components/landowner/my-plots/AnalysePlusCartItem';
import usePlots from '../../hooks/plot-hook';
import usePayments from '../../hooks/payment-hook';
import usePlotStore from '../../store/plot-store';

const AnalysePlusCart = () => {
  const navigate = useNavigate();
  const [discountCode, setDiscountCode] = useState('');
  const {
    basketPlots,
    removePlotFromBasket,
    discountedTotal,
    basketSummary,
    setBasketSummary,
    setDiscountCodeStore,
  } = usePlotStore();
  const { applyDiscount, deletePlotFromBasket, getAnalysePlus } = usePlots();
  const { createPayment } = usePayments();

  const handleAddPlot = () => {
    navigate('/landowner/my-plots');
  };

  const handleStripeCheckout = async () => {
    // TODO: use actual data for payment checkout
    const paymentBody = {
      payment_type: 'analyse_plus',
      discount_code: discountCode,
    };
    try {
      const response = await createPayment(paymentBody);
      if (response.session_url) {
        window.location.href = response.session_url;
      }
      navigate('/landowner/my-plots/thank-you-order-request');
    } catch (err) {
      console.error(err);
      toast.error(`Error: ${err}`);
    }
  };

  const handleReedemCode = async () => {
    const response = await applyDiscount({ discount_code: discountCode });
    if (response.original_total) {
      setDiscountCodeStore(discountCode, response.discounted_total);
      toast.success('Ihr Rabattcode ist gültig.');
    } else {
      toast.error(
        'Ihr Rabattcode ist ungültig, bitte versuchen Sie einen anderen.'
      );
    }
  };

  const handleOnDelete = async (id: string) => {
    try {
      await deletePlotFromBasket(id);
      removePlotFromBasket(id);
      const basketSummaryData = await getAnalysePlus();
      setBasketSummary(basketSummaryData);
      toast.success('Das Flurstück wurde erfolgreich aus der Liste entfernt.');
      // eslint-disable-next-line
    } catch (err: any) {
      if (err.response.data.error === 'Basket is empty.') {
        setBasketSummary({
          cost_per_item: 0,
          sum_of_items: 0,
          tax_in_percent: 0,
          tax_amount: 0,
          subtotal: 0,
        });
        toast.error(
          'Die Liste ist leer. Bitte fügen Sie mindestens ein Grundstück hinzu, um eine Bestellung aufgeben zu können'
        );
        return;
      }
      toast.error(
        'Es ist ein Fehler aufgetreten, das Flurstück wurde nicht gelöscht.'
      );
    }
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

      {basketPlots.length > 0 ? (
        <GenericList
          data={basketPlots}
          renderItem={(warenkorb) => (
            <AnalysePlusCartItem
              key={warenkorb.id}
              data={warenkorb}
              onDelete={handleOnDelete}
            />
          )}
        />
      ) : (
        <div className='flex text-[18px] font-500 gray-light-200 justify-center'>
          Die Liste ist leer. Bitte gehen Sie zur Parzellenliste und fügen Sie
          dort Einträge hinzu
        </div>
      )}

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
            disabled={basketPlots.length === 0}
          >
            Analyse PLUS kaufen
          </Button>
        </div>
        <div className='bg-white rounded-xl shadow-md px-6 py-4 text-right flex flex-col gap-4 text-gray-dark-200'>
          <div className='flex flex-col space-y-3 mb-3'>
            <p>
              Number of Items: <strong>{basketPlots?.length}</strong>
            </p>
            <p>
              Cost per Item: <strong>{basketSummary?.cost_per_item}€</strong>
            </p>
            <p>
              Sum of items: <strong>{basketSummary?.sum_of_items}€</strong>
            </p>
            <p>
              Tax in percent:{' '}
              <strong>{basketSummary?.tax_in_percent}MWSt</strong>
            </p>
            <p>
              Tax amount: <strong>{basketSummary?.tax_amount}€</strong>
            </p>
            <p className='text-[14px]'>
              Subtotal: <strong>{basketSummary?.subtotal}€</strong>
            </p>
          </div>

          <div className='flex justify-end items-center max-[746px]:flex-col max-[746px]:items-end'>
            <h3 className='mr-6'>Rabattcode einisen</h3>
            <div className='flex'>
              <input
                type='text'
                placeholder='Gutschein-Code'
                className='border-[1px] border-r-0 py-1 px-2 rounded-l-md border-gray-medium/60 w-[180px]'
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
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
                {discountedTotal ? discountedTotal : basketSummary.subtotal}€
              </strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysePlusCart;
