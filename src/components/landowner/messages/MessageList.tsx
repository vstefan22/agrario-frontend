import { useState } from 'react';
import MessageItem from './MessageItem';
import starIcon from '../../../assets/images/star.png';
import filledStarIcon from '../../../assets/images/filled-star.png';

type MessageListTypes = {
  name: string;
  message: string;
  time: string;
  category: string;
};

const MessageList = ({ name, message, time, category }: MessageListTypes) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const checkMessage = () => {
    setIsChecked((prev) => !prev);
  };

  const favoriteMessage = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <div
      className={`py-4 border-b-[0.8px] border-[#E0E0E0] flex gap-6 px-4 items-center ${
        isChecked && 'bg-[#4880FF]/[6%]'
      }`}
    >
      <label
        htmlFor='checkMsg'
        className='relative block w-[16px] h-[16px] cursor-pointer'
      >
        <input
          type='checkbox'
          id='checkMsg'
          checked={isChecked}
          onClick={checkMessage}
          className='
  appearance-none
  w-[16px] h-[16px]
  border-2 border-[#B3B3B3]
  rounded
  cursor-pointer
  checked:bg-black
  checked:border-black
  checked:text-white
  flex items-center justify-center
'
        />
        <span
          className='absolute
      top-1/2 left-1/2
      transform -translate-x-1/2 -translate-y-1/2
      text-white text-[12px] font-bold leading-none
      pointer-events-none'
        >
          {isChecked && '✓'}
        </span>
      </label>

      <img
        src={!isFavorite ? starIcon : filledStarIcon}
        alt='star icon'
        onClick={favoriteMessage}
        className='cursor-pointer w-[18px] h-[18px]'
      />
      <MessageItem
        name={name}
        message={message}
        time={time}
        category={category}
      />
    </div>
  );
};

export default MessageList;
