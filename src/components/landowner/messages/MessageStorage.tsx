import { useState, ChangeEvent } from 'react';
import Search from '../../common/Search';
import MessageList from './MessageList';
import archiveIcon from '../../../assets/images/archive-msg.png';
import infoIcon from '../../../assets/images/info-msg.png';
import delIcon from '../../../assets/images/del-msg.png';
import { receivedMessages } from '../../../../mockData';

const MessageStorage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleMsgArchive = () => {
    console.log('message archive');
  };

  const handleMsgInfo = () => {
    console.log('message info');
  };

  const handleMsgDelete = () => {
    console.log('message delete');
  };

  return (
    <div className='w-full bg-white shadow-2xl p-4 rounded-xl'>
      <div className='flex justify-between items-center h-[80px]'>
        <Search
          placeholder='Search mail'
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className='flex'>
          <button
            className='bg-gray-muted-light w-[40px] h-[40px] border-[0.4px] rounded-l-[3px] border-gray-medium/70 flex justify-center items-center'
            onClick={handleMsgArchive}
          >
            <img src={archiveIcon} alt='archive icon' />
          </button>
          <button
            className='bg-gray-muted-light w-[40px] h-[40px] border-t-[0.4px] border-b-[0.4px] border-gray-medium/70 flex justify-center items-center'
            onClick={handleMsgInfo}
          >
            <img src={infoIcon} alt='archive icon' />
          </button>
          <button
            className='bg-gray-muted-light w-[40px] h-[40px] border-[0.4px] rounded-r-[3px] border-gray-medium/70 flex justify-center items-center'
            onClick={handleMsgDelete}
          >
            <img src={delIcon} alt='delete icon' />
          </button>
        </div>
      </div>

      {receivedMessages.map((msg, index) => (
        <MessageList
          key={index}
          name={msg.name}
          message={msg.message}
          time={msg.time}
          category={msg.category}
        />
      ))}
    </div>
  );
};

export default MessageStorage;
