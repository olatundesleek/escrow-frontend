"use client";

import { useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";
import ChatDetails from "./ChatDetails";

interface MessageType {
  id: number;
  text: string;
  sender: string;
  userID: string;
  timestamp: string;
}

// i prop drill hell here btw can be modify to any state management later sha PEACE OUT

const Chat = () => {
  // will be replaced by a dta from the backend`
  const messages = [
    {
      id: 1,
      text: "Hey, I just made the payment.",
      sender: "buyer",
      userID: "user_bol",
      timestamp: "2025-05-13T13:23:00Z",
    },
    {
      id: 2,
      text: "Alright, I will confirm once I see it.",
      sender: "seller",
      userID: "user_abc",
      timestamp: "2025-05-13T13:23:00Z",
    },
    {
      id: 3,
      text: "Okay, thanks.",
      sender: "buyer",
      userID: "user_bol",

      timestamp: "2025-05-14T14:23:00Z",
    },
    {
      id: 4,
      text: "Alright, I will confirm once I see it.",
      sender: "seller",
      userID: "user_abc",

      timestamp: "2025-05-14T14:23:00Z",
    },
    {
      id: 5,
      text: "Okay, thanks.",
      sender: "buyer",
      userID: "user_bol",

      timestamp: "2025-05-14T14:23:00Z",
    },
    {
      id: 6,
      text: "Alright, I will confirm once I see it.",
      sender: "seller",
      userID: "user_abc",

      timestamp: "2025-05-14T14:23:00Z",
    },
    {
      id: 7,
      text: "Okay, thanks.",
      sender: "buyer",
      userID: "user_bol",

      timestamp: "2025-05-14T14:23:00Z",
    },
    {
      id: 8,
      text: "Alright, I will confirm once I see it.",
      sender: "seller",
      userID: "user_abc",

      timestamp: "2025-05-15T15:23:00Z",
    },
    {
      id: 9,
      text: "Okay, thanks.",
      sender: "buyer",
      userID: "user_bol",

      timestamp: "2025-05-15T15:23:00Z",
    },
  ];

  const [allmessages, setMessages] = useState<MessageType[]>(messages);

  const handleNewMessage = (newMessage: MessageType) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const currentUserId = "user_abc"; // Replace with actual user ID from the backend i know there should be !!

  return (
    <div className="flex justify-center align-center">
      <div className="flex flex-col w-[500px] h-[600px] shadow-md rounded-lg bg-white">
        <ChatHeader />
        <ChatBody messages={allmessages} currentUserId={currentUserId} />
        <ChatInput
          onSend={handleNewMessage}
          messages={allmessages}
          currentUserId={currentUserId}
        />
      </div>

      {/*okay am just hardcoding so i can design the layout maybe the backend will create an endpoint that possess the detaills*/}
      <div>
        <ChatDetails
          userName="John Doe"
          userRole="buyer"
          lastSeen="2 minutes ago"
          itemName="Nike Air Max"
          orderId="#123456"
          userImage="/globe.svg"
        />
      </div>
    </div>
  );
};

export default Chat;
