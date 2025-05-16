"use client";
import { useState } from "react";
import { MdOutlineSend } from "react-icons/md";
import { FaCamera } from "react-icons/fa";
import { FiPaperclip } from "react-icons/fi";

interface Message {
  id: number;
  text: string;
  sender: string;
  userID: string;
  timestamp: string;
}

interface ChatInputProps {
  onSend: (message: Message) => void;
  messages: Message[];
  currentUserId: string;
}

const ChatInput = ({ onSend, messages, currentUserId }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: "seller",
      userID: currentUserId,
      timestamp: new Date().toISOString(),
    };

    onSend(newMessage);
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 p-4 border-t bg-white"
    >
      <input
        type="text"
        placeholder="Type your message..."
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="flex items-center gap-2 text-gray-600">
        <FaCamera className="cursor-pointer hover:text-black" />
        <FiPaperclip className="cursor-pointer hover:text-black" />
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
      >
        <MdOutlineSend size={20} />
      </button>
    </form>
  );
};

export default ChatInput;
