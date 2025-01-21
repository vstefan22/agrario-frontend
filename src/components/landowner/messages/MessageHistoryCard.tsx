import { FC } from 'react';
import { Attachment, MessageType } from '../../../types/message-types';
import { extractFileName, formatDate } from '../../../utils/helper-functions';

type MessageData = {
  user: string;
  message: MessageType;
  attachments: Attachment[];
};

const MessageHistoryCard: FC<MessageData> = ({
  user,
  message,
  attachments,
}) => {
  const formattedDate = formatDate(message.created_at!);

  return (
    <div className='flex flex-col bg-white rounded-[16px] shadow-[6px_6px_54px_0px_#0000000D] px-8 py-6 border-[1px] border-gray-medium/60 mb-6'>
      <h1 className='text-[32px] text-black-muted'>
        Nachricht von {user} ({`${formattedDate} ${message.time}`})
      </h1>
      <div className='border-[1px] border-gray-medium/60 rounded-md p-6 min-h-[128px] mt-6'>
        {message.body}
        {attachments.length > 0 && (
          <div className='mt-4'>
            <h3 className='text-[16px] text-gray-dark-100 mt-2 mb-2'>
              Dokument:
            </h3>
            {attachments.map((attachment) => (
              <a
                key={attachment.id}
                href={attachment.file}
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-light-300 underline cursor-pointer'
              >
                {extractFileName(attachment.file)}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageHistoryCard;
