import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';

const ThankYouSubscribe = () => {
  const navigate = useNavigate();

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col px-7 pt-4'>
      <h1 className='text-[32px] font-bold text-black-muted'>
        Danke für das Abschließen des Abonements
      </h1>
      <p className='text-gray-dark-100 mt-2'>
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using 'Content here, content here', making it
        look like readable English. Many desktop publishing packages and web
        page editors now use Lorem Ipsum as their default model text, and a
        search for 'lorem ipsum' will uncover many web sites still in their
        infancy.
      </p>

      <p className='text-gray-dark-100 mt-6'>
        Various versions have evolved over the years, sometimes by accident,
        sometimes on purpose (injected humour and the like).
      </p>

      <Button
        type='button'
        variant='bluePrimary'
        className='w-[342px] ml-auto mt-12'
        onClick={() => navigate('/developer/active-auctions')}
      >
        Weitere aktive Auktionen ansehen
      </Button>
    </div>
  );
};

export default ThankYouSubscribe;
