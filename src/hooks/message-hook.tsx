import { useCallback } from "react";
import useHttpRequest from "./http-request-hook";
import useAuthStore from "../store/auth-store";
import { MessageType, MessageBodyType } from "../types/message-types";

const useMessages = () => {
  const { sendRequest } = useHttpRequest();
  const { token } = useAuthStore();

  const getMyChats = useCallback(async () => {
    return await sendRequest(`/messaging/chats/`, "GET", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [sendRequest, token]);

  const sendMessage = useCallback(
    async (body: MessageType | FormData) => {
      return await sendRequest(
        `/messaging/messages/`,
        "POST",
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
      return await sendRequest(`/messaging/messages/${userId}/conversation/`, "GET", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    [sendRequest, token]
  );

  const broadcastMessage = useCallback(
    async (body: MessageBodyType) => {
      return await sendRequest(
        `/messaging/messages/broadcast/`,
        "POST",
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

  const getUnreadMessages = useCallback(async () => {
    return await sendRequest(`/messaging/messages/unread-count/`, "GET", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [sendRequest, token]);

  const deleteMessages = useCallback(
    async (ids: Array<string>) => {
      console.log(ids); // Confirm IDs are being passed
      return await sendRequest(`/messaging/chats/bulk-delete/`, "DELETE", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Ensure content type is set
        },
        data: { ids }, // Pass the `ids` in the `data` field for DELETE
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
    deleteMessages,
  };
};

export default useMessages;
