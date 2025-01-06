import workImg from '../../../assets/images/work.png';
import socialImg from '../../../assets/images/social.png';
import friendsImg from '../../../assets/images/friends.png';

type MessageItemTypes = {
  name: string;
  message: string;
  time: string;
  category: string;
};

const MessageItem = ({ name, message, time, category }: MessageItemTypes) => {
  return (
    <div className='flex justify-between w-full'>
      <div className='flex'>
        <div className='flex'>
          <h2 className='font-bold'>{name}</h2>
          {category === 'Work' && (
            <img
              src={workImg}
              alt='work icon'
              className='object-contain ml-4'
            />
          )}
          {category === 'Social' && (
            <img
              src={socialImg}
              alt='social icon'
              className='object-contain ml-4'
            />
          )}
          {category === 'Friends' && (
            <img
              src={friendsImg}
              alt='friends icon'
              className='object-contain ml-4'
            />
          )}
        </div>
      </div>
      <div className='flex-1 ml-8'>
        <p>{message}</p>
      </div>
      <span className='text-sm text-gray-500'>{time}</span>
    </div>
  );
};

export default MessageItem;
