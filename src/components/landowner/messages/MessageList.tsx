import MessageItem from './MessageItem';

type MessageListTypes = {
  name: string;
  message: string;
  time: string;
  subject: string;
  id: string;
  onSelectMessages: (id: string) => void;
  selectedMessages: Array<string>;
};

const MessageList = ({
  id,
  name,
  message,
  time,
  subject,
  selectedMessages,
  onSelectMessages,
}: MessageListTypes) => {
  const isChecked = selectedMessages.includes(id);

  return (
    <div
      className={`py-4 border-b-[0.8px] border-gray-light-125 flex gap-6 px-4 items-center ${
        isChecked && 'bg-sky-blue/[6%]'
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
          onChange={() => onSelectMessages(id)}
          className='appearance-none w-[16px] h-[16px] border-2 border-gray-light-200 rounded cursor-pointer
          checked:bg-black checked:border-black checked:text-white flex items-center justify-center'
        />
        <span
          className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            text-white text-[12px] font-bold leading-none pointer-events-none'
        >
          {isChecked && '✓'}
        </span>
      </label>

      <MessageItem
        name={name}
        message={message}
        time={time}
        subject={subject}
        id={id}
      />
    </div>
  );
};

export default MessageList;
