import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import MessageStorage from "../components/landowner/messages/MessageStorage";
import useMessages from "../hooks/message-hook";
import useAuthStore from "../store/auth-store";
import useMessageStore from "../store/message-store";
import plusImg from "../assets/images/plus.png";
import { LoadingSpinner } from "../components/common/Loading";

const Messages = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { getMyChats } = useMessages();
  const { setInbox } = useMessageStore();
  const [loading, setLoading] = useState(true);

  const userRole = user?.role;

  useEffect(() => {
    const fetchMyChats = async () => {
      const inbox = await getMyChats();
      setInbox(inbox);
      setLoading(false);
    };

    fetchMyChats();
  }, [getMyChats, setInbox]);

  const handleCreateMessage = () => {
    navigate(`/${userRole}/support`);
  };

  if (loading) return <LoadingSpinner />;
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col px-7 pt-4">
      <h1 className="text-[32px] font-bold text-black-muted mb-6">
        Meine Nachrichten - Posteingang
      </h1>

      <Button
        type="button"
        onClick={handleCreateMessage}
        variant="bluePrimary"
        className="w-[270px] mb-4"
      >
        <img src={plusImg} alt="plus img" className="w-[18px] mr-[4px]" /> Neue Nachricht verfassen
      </Button>

      <MessageStorage />
    </div>
  );
};

export default Messages;
