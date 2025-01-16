import { FC } from 'react';

type messageData = {
  user: string;
  message: string;
};

const MessageHistoryCard: FC<messageData> = ({ user, message }) => {
  const date = new Date();
  const formattedDate = date.toLocaleDateString('de-DE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <div className='flex flex-col bg-white rounded-[16px] shadow-[6px_6px_54px_0px_#0000000D] px-8 py-6 border-[1px] border-gray-medium/60 mb-6'>
      <h1 className='text-[32px] text-black-muted'>
        Nachricht von {user} ({formattedDate})
      </h1>
      <div className='border-[1px] border-gray-medium/60 rounded-md p-6 min-h-[128px] mt-6'>
        {message}
      </div>
    </div>
  );
};

export default MessageHistoryCard;
