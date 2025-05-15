import React from "react";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";

const ChatHeader = () => {
  return (
    <section className="flex justify-between items-center p-4  border-b-1">
      <div className="flex gap-2 items-center">
        <Image
          src="/globe.svg"
          alt="globe"
          width={40}
          height={40}
          className="rounded-full "
        />
        <div>
          <h2 className="text-secondary">Abdulakeem Habeeb</h2>
          <span className="text-xs text-gray-500">Online</span>
        </div>
      </div>

      <div className="flex gap-2 text-2xl">
        <CiSearch />
        <IoIosNotificationsOutline />
      </div>
    </section>
  );
};

export default ChatHeader;
