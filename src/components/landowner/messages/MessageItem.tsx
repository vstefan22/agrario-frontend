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
        <div className='flex items-center w-[248px]'>
          <h2 className='font-bold whitespace-nowrap text-black-muted text-sm'>
            {name}
          </h2>
          {category === 'Work' && (
            <img
              src={workImg}
              alt='work icon'
              className='object-contain ml-4 max-w-[60px] max-h-[22px]'
            />
          )}
          {category === 'Social' && (
            <img
              src={socialImg}
              alt='social icon'
              className='object-contain ml-4 max-w-[60px] max-h-[22px]'
            />
          )}
          {category === 'Friends' && (
            <img
              src={friendsImg}
              alt='friends icon'
              className='object-contain ml-4 max-w-[60px] max-h-[22px]'
            />
          )}
        </div>
      </div>
      <div className='flex-1 pr-12'>
        <p className='text-black-muted/90'>{message}</p>
      </div>
      <span className='text-sm text-black-muted/70'>{time}</span>
    </div>
  );
};

export default MessageItem;
