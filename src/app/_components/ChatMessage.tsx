import React from "react";
import Image from "next/image";

interface ChatMessageProps {
  message: {
    id: number;
    text: string;
    sender: string;
    userID: string;
    timestamp: string;
  };
  currentUserId: string;
}

const ChatMessage = ({ message, currentUserId }: ChatMessageProps) => {
  const time = new Date(message.timestamp || Date.now()).toLocaleTimeString(
    [],
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  const isCurrentUser = message.userID === currentUserId;

  return (
    <div
      className={`flex gap-1 items-end mb-2 w-full ${
        !isCurrentUser ? "justify-start" : "justify-end"
      } `}
    >
      {!isCurrentUser && (
        <Image
          src="/globe.svg"
          alt="glo"
          width={30}
          height={30}
          className="rounded-full "
        />
      )}
      <div
        className={`w-auto p-2 rounded-lg shadow ${
          !isCurrentUser ? "bg-orange-400" : "bg-[#7ac22f]"
        }`}
      >
        <h1 className="text-white text-sm">{message.text}</h1>
        <span className="block text-[10px] text-gray-100  text-right">
          {time}
        </span>
      </div>

      {isCurrentUser && (
        <Image
          src="/globe.svg"
          alt="glo"
          width={30}
          height={30}
          className="rounded-full "
        />
      )}
    </div>
  );
};

export default ChatMessage;
