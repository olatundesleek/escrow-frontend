import React from "react";
import ChatMessage from "./ChatMessage";
import ChatDateLabel from "./ChatDateLabel";

interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: string;
}

const ChatBody = ({ messages }: { messages: Message[] }) => {
  return (
    <div className="flex  flex-col overflow-y-auto h-[75%] bg-gray-50  px-4">
      {messages.map((message) => (
        <div key={message.id}>
          <ChatDateLabel message={message} />
          <ChatMessage message={message} />
        </div>
      ))}
    </div>
  );
};

export default ChatBody;
