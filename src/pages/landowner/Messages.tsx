import Button from '../../components/common/Button';
import MessageStorage from '../../components/landowner/messages/MessageStorage';
import plusImg from '../../assets/images/plus.png';

const Messages = () => {
  const handleCreateMessage = () => {
    console.log('Create new message');
  };

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col px-7 pt-4'>
      <h1 className='text-[32px] font-bold text-black-muted mb-6'>
        Meine Nachrichten - Posteingang
      </h1>

      <Button
        type='button'
        onClick={handleCreateMessage}
        variant='bluePrimary'
        className='w-[270px] mb-4'
      >
        <img src={plusImg} alt='plus img' className='w-[18px] mr-[4px]' /> Neue
        Nachricht verfassen
      </Button>

      <MessageStorage />
    </div>
  );
};

export default Messages;
