import React, { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import ChatDateLabel from "./ChatDateLabel";

interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: string;
}

const ChatBody = ({ messages }: { messages: Message[] }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  
  const getLabel = (timestamp: string) => {
    const msgDate = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (msgDate.toDateString() === today.toDateString()) return "Today";
    if (msgDate.toDateString() === yesterday.toDateString()) return "Yesterday";
    return msgDate.toDateString();
  };

  let lastLabel = "";

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 px-4 scroll-smooth">
      {messages.map((message) => {
        const currentLabel = getLabel(message.timestamp);
        const showLabel = currentLabel !== lastLabel;
        lastLabel = currentLabel;

        return (
          <div key={message.id}>
            <ChatDateLabel show={showLabel} label={currentLabel} />
            <ChatMessage message={message} />
          </div>
        );
      })}
      <div ref={bottomRef} className="h-4" />
    </div>
  );
};

export default ChatBody;
