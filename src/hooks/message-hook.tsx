import { useCallback } from 'react';
import useHttpRequest from './http-request-hook';
import useAuthStore from '../store/auth-store';
import { MessageType, MessageBodyType } from '../types/message-types';

const useMessages = () => {
  const { sendRequest } = useHttpRequest();
  const { token } = useAuthStore();

  const getMyChats = useCallback(
    async (userId: string) => {
      return await sendRequest(`/messaging/messages/thread/${userId}`, 'GET', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    [sendRequest, token]
  );

  const sendMessage = useCallback(
    async (body: MessageType | FormData) => {
      return await sendRequest(
        `/messages/`,
        'POST',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        body
      );
    },
    [sendRequest, token]
  );

  const getChatDetails = useCallback(
    async (userId: string) => {
      return await sendRequest(
        `/messaging/messages/${userId}/conversation/`,
        'GET',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    [sendRequest, token]
  );

  const broadcastMessage = useCallback(
    async (body: MessageBodyType) => {
      return await sendRequest(
        `/messaging/messages/broadcast/`,
        'POST',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        body
      );
    },
    [sendRequest, token]
  );

  const getUnreadMessages = useCallback(
    async (userId: string) => {
      // TODO: use actual endpoint here
      return await sendRequest(`/dummy-endpoint/${userId}`, 'GET', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    [sendRequest, token]
  );

  return {
    sendMessage,
    getMyChats,
    getChatDetails,
    broadcastMessage,
    getUnreadMessages,
  };
};

export default useMessages;
