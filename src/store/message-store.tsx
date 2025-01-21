import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MessageType, MessageTypes } from '../types/message-types';

type MessageState = {
  inbox: MessageTypes[];
  messages: MessageType[];
  inboxMessage: MessageTypes | null;

  setMessages: (messages: MessageType[]) => void;
  setInbox: (inbox: MessageTypes[]) => void;
  setInboxMessage: (inboxMessage: MessageTypes) => void;
  addMessageToMessages: (message: MessageType) => void;
  addMessageToInbox: (message: MessageTypes) => void;
  clearMessageStorage: () => void;
};

const useMessageStore = create<MessageState>()(
  persist(
    (set) => ({
      inbox: [],
      messages: [],
      inboxMessage: null,

      setMessages: (messages) => {
        set(() => ({
          messages,
        }));
      },

      setInbox: (inbox) =>
        set(() => ({
          inbox,
        })),

      setInboxMessage: (inboxMessage) =>
        set(() => ({
          inboxMessage,
        })),

      addMessageToMessages: (newMessage) => {
        set((state) => ({
          messages: state.messages.map((message) =>
            String(message.recipient) === String(newMessage.recipient)
              ? { ...message, ...newMessage }
              : message
          ),
        }));
      },

      addMessageToInbox: (message) => {
        set((state) => ({
          inbox: [
            ...new Map(
              [message, ...state.inbox].map((message) => [message.id, message])
            ).values(),
          ],
        }));
      },

      clearMessageStorage: () =>
        set({ inbox: [], messages: [], inboxMessage: null }),
    }),
    {
      name: 'message-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useMessageStore;
