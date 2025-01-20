import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import Select from '../components/common/Select';
import TextArea from '../components/common/TextArea';
import UploadFile from '../components/common/UploadFile';
import Button from '../components/common/Button';
import MessageHistoryCard from '../components/landowner/messages/MessageHistoryCard';
import useMessages from '../hooks/message-hook';
import useAuthStore from '../store/auth-store';
import useMessageStore from '../store/message-store';
import {
  landownerSupportOptions,
  developerSupportOptions,
} from '../constants/select-options';

const Support = () => {
  const { user } = useAuthStore();
  const { sendMessage, getChatDetails } = useMessages();
  const { setMessages, messages } = useMessageStore();
  const navigate = useNavigate();
  const { chatId } = useParams();

  const userRole = user?.role;

  const initialFormData = useMemo(() => {
    return {
      subject:
        user?.role === 'landowner'
          ? landownerSupportOptions[0]
          : developerSupportOptions[0],
      recipient: '',
      message: '',
      attachment_files: null as File | null,
    };
  }, [user]);

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    setFormData(initialFormData);
  }, [initialFormData]);

  useEffect(() => {
    if (!chatId) {
      setMessages([]);
      return;
    }
    const fetchChatDetails = async () => {
      const chatDetails = await getChatDetails(chatId);
      setMessages(chatDetails.messages);
    };

    fetchChatDetails();
  }, [getChatDetails, user, setMessages, chatId]);

  const handleSelectChange = (name: string, option: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: option,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFilesChange = (files: File[]) => {
    setFormData((prev) => ({
      ...prev,
      attachment_files: files[0],
    }));
  };

  const handleSendMessage = async () => {
    const formDataSend = new FormData();
    formDataSend.append('recipient', formData.recipient);
    formDataSend.append('subject', formData.subject);
    formDataSend.append('body', formData.message);
    if (formData.attachment_files)
      formDataSend.append('attachment_files', formData.attachment_files);

    try {
      await sendMessage(formDataSend);
      navigate(-1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col px-7 py-4'>
      <h1 className='text-[32px] font-bold text-black-muted mb-6'>
        Meine Nachrichten - Neue Unterhaltung/Meine
      </h1>

      <div className='flex flex-col bg-white rounded-[16px] shadow-[6px_6px_54px_0px_#0000000D] px-8 py-6 border-[1px] border-gray-medium/60 '>
        <h1 className='text-[32px] text-black-muted mb-4'>
          Neue Nachricht an Agrario Support
        </h1>
        <Select
          name='subject'
          options={
            userRole === 'landowner'
              ? landownerSupportOptions
              : developerSupportOptions
          }
          value={formData.subject}
          onChange={handleSelectChange}
          required
          buttonClass='w-[144px]'
        />

        <TextArea
          placeholder='Ihre Nachricht an uns'
          onChange={handleChange}
          id='message'
          name='message'
          value={formData.message}
        />

        <div className='mt-4 flex justify-between items-end'>
          <UploadFile onFilesChange={handleFilesChange} maxFiles={1} />

          <div className='flex gap-x-6'>
            <Button
              variant='blueSecondary'
              type='button'
              onClick={() => {
                navigate('../messages/');
              }}
            >
              Abbrechen
            </Button>
            <Button
              variant='bluePrimary'
              type='button'
              onClick={handleSendMessage}
            >
              Nachricht absenden
            </Button>
          </div>
        </div>
      </div>

      <h1 className='text-[32px] text-black-muted mt-10 mb-4'>Verlauf</h1>

      {messages.length > 0 ? (
        messages.map((message) => (
          <MessageHistoryCard
            user={`${user?.first_name}`}
            message={message.body}
            attachments={message.attachments}
          />
        ))
      ) : (
        <div className='flex text-[18px] font-500 gray-light-200 justify-center'>
          Derzeit gibt es keine Nachrichten.
        </div>
      )}
    </div>
  );
};

export default Support;
