import { useState } from "react";

import MessageList from "./MessageList";
import useMessageStore from "../../../store/message-store";
import delIcon from "../../../assets/images/del-msg.png";
import useMessages from "../../../hooks/message-hook";
import { toast } from "react-toastify";

const MessageStorage = () => {
  const { inbox, setInbox } = useMessageStore();

  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const { deleteMessages } = useMessages();

  const handleMsgDelete = async () => {
    if (selectedMessages.length === 0) {
      toast.error("Sie müssen Chats auswählen, um sie zu löschen.");
      return;
    }
    try {
      console.log(selectedMessages);
      await deleteMessages(selectedMessages);
      const updatedInbox = inbox.filter((msg) => !selectedMessages.includes(msg.id));
      setInbox(updatedInbox);
      toast.success("Chats wurden erfolgreich gelöscht!");
    } catch (e) {
      toast.error("Ein Fehler ist beim Löschen der Chats aufgetreten!");
      console.error(e);
    }
  };

  const handleSelecetMessage = (id: string) => {
    setSelectedMessages(
      (prevSelectedMessages) =>
        prevSelectedMessages.includes(id)
          ? prevSelectedMessages.filter((messageId) => messageId !== id) // Remove id if it exists
          : [...prevSelectedMessages, id] // Add id if it doesn't exist
    );
  };

  console.log(selectedMessages);
  return (
    <div className="w-full bg-white shadow-lg p-4 rounded-xl mt-3 mb-6">
      <div className="flex justify-between items-center h-[80px]">
        <span></span>
        <div className="flex">
          <button
            className="bg-gray-muted-light w-[40px] h-[40px] border-[0.4px] rounded-r-[3px] border-gray-medium/70 flex justify-center items-center"
            onClick={handleMsgDelete}
          >
            <img src={delIcon} alt="delete icon" />
          </button>
        </div>
      </div>

      {inbox.length > 0 ? (
        inbox.map((msg) => (
          <MessageList
            key={msg.id}
            name={msg.recipient}
            message={msg.last_message.body}
            time={msg.time}
            subject={msg.subject}
            id={msg.id}
            onSelectMessages={handleSelecetMessage}
            selectedMessages={selectedMessages}
          />
        ))
      ) : (
        <div className="flex text-[18px] font-500 gray-light-200 justify-center">
          Derzeit gibt es keine Nachrichten im Posteingang.
        </div>
      )}
    </div>
  );
};

export default MessageStorage;
