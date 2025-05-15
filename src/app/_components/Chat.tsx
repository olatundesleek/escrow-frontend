"use client";

import { useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";

interface MessageType {
  id: number;
  text: string;
  sender: string;
  timestamp: string;
}

const Chat = () => {
  const messages = [
    {
      id: 1,
      text: "Hey, I just made the payment.",
      sender: "buyer",
      timestamp: "2025-05-13T13:23:00Z",
    },
    {
      id: 2,
      text: "Alright, I will confirm once I see it.",
      sender: "seller",
      timestamp: "2025-05-13T13:23:00Z",
    },
    {
      id: 3,
      text: "Okay, thanks.",
      sender: "buyer",
      timestamp: "2025-05-14T14:23:00Z",
    },
    {
      id: 4,
      text: "Alright, I will confirm once I see it.",
      sender: "seller",
      timestamp: "2025-05-14T14:23:00Z",
    },
    {
      id: 5,
      text: "Okay, thanks.",
      sender: "buyer",
      timestamp: "2025-05-14T14:23:00Z",
    },
    {
      id: 6,
      text: "Alright, I will confirm once I see it.",
      sender: "seller",
      timestamp: "2025-05-14T14:23:00Z",
    },
    {
      id: 7,
      text: "Okay, thanks.",
      sender: "buyer",
      timestamp: "2025-05-14T14:23:00Z",
    },
    {
      id: 8,
      text: "Alright, I will confirm once I see it.",
      sender: "seller",
      timestamp: "2025-05-15T15:23:00Z",
    },
    {
      id: 9,
      text: "Okay, thanks.",
      sender: "buyer",
      timestamp: "2025-05-15T15:23:00Z",
    },
  ];

  const [allmessages, setMessages] = useState<MessageType[]>(messages);

  const handleNewMessage = (newMessage: MessageType) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <div className="flex justify-center align-center">
      <div className="w-[500px] h-[600px] shadow-md rounded-lg bg-white">
        <ChatHeader />
        <ChatBody messages={allmessages} />
        <ChatInput onSend={handleNewMessage} messages={ allmessages} />
      </div>
    </div>
  );
};

export default Chat;
