import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/auth-store";

type MessageItemTypes = {
  id: string;
  name: string;
  message: string;
  time: string;
  subject: string;
};

const MessageItem = ({ id, name, message, time, subject }: MessageItemTypes) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleChatDetail = () => {
    navigate(`/${user?.role}/support/${id}`);
  };

  return (
    <div className="flex justify-between w-full" onClick={handleChatDetail}>
      <div className="flex">
        <div className="flex items-center w-[248px]">
          <h2 className="font-bold whitespace-nowrap text-black-muted text-sm">{name}</h2>
        </div>
      </div>
      <div className="flex-1 pr-12">
        <p className="text-black-muted/90">{message}</p>
      </div>
      <div className="flex gap-3 items-center">
        <p>{subject}</p>
        <span className="text-sm text-black-muted/70">{time}</span>
      </div>
    </div>
  );
};

export default MessageItem;
