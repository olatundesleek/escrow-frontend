import React from "react";
import Image from "next/image";

interface ChatDetailsProps {
  userName: string;
  userRole: "buyer" | "seller";
  lastSeen: string;
  itemName: string;
  orderId: string;
  userImage: string;
}

const ChatDetails = ({
  userName,
  userRole,
  lastSeen,
  itemName,
  orderId,
  userImage,
}: ChatDetailsProps) => {
  return (
    <div className="w-[300px] h-[600px] bg-white shadow-md rounded-lg ml-4 p-4 flex flex-col items-center justify-between">
      {/* Top - User Profile */}
      <div className="flex flex-col items-center">
        <Image
          src={userImage}
          alt={userName}
          width={96}
          height={96}
          className="rounded-full mb-4 object-cover shadow"
        />

        <h2 className="text-lg font-bold">{userName}</h2>
        <span className="text-sm text-gray-500 capitalize">
          {userRole} • Last seen {lastSeen}
        </span>
      </div>

      {/* Middle - Chat Context */}
      <div className="w-full mt-6 space-y-2 text-sm text-gray-600">
        {itemName && (
          <div>
            <span className="font-medium text-gray-700">📦 Item:</span>{" "}
            {itemName}
          </div>
        )}
        {orderId && (
          <div>
            <span className="font-medium text-gray-700">🧾 Order ID:</span>{" "}
            {orderId}
          </div>
        )}
        <div>
          <span className="font-medium text-gray-700">💬 Role:</span>{" "}
          {userRole === "buyer"
            ? "Buyer (Receiving product)"
            : "Seller (Delivering product)"}
        </div>
      </div>

      {/* Bottom - Action (Optional) */}
      <div className="mt-6 w-full">
        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default ChatDetails;
