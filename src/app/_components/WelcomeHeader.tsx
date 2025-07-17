"use client";

import { FaUserCircle } from "react-icons/fa";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { PiCalendarBlankDuotone } from "react-icons/pi";
import StatusBadge from "@/app/_components/StatusBadge";

interface userData {
  kyc: { status: "verified" | "unverified" };
  firstname: string;
  username: string;
  email: string;
  status: string;
  createdAt: string;
}

export default function WelcomeHeader({ user }: { user: userData }) {
  const {
    firstname = "User",
    username,
    email,
    status: userStatus,
    createdAt,
    kyc,
  } = user;

  const joinedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="relative w-full p-0  rounded-xl border border-white/30 bg-gradient-to-br from-blue-50 via-gray-50 to-blue-50">
      {/* --- Glass Panel (Refined for Clarity and Depth) --- */}
      <div
        className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8
        bg-white/20 p-4 backdrop-blur-xl ring-1 ring-white/10
        transform transition-transform duration-500 hover:scale-[1.005] rounded-xl border border-white/30"
      >
        {" "}
        {/* Added subtle hover effects */}
        {/* Welcome Message Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              {" "}
              {/* Increased font-bold to extrabold */}
              Welcome back, {firstname}
            </h1>
            <span
              className="text-5xl animate-wave origin-bottom-right"
              role="img"
              aria-label="waving hand"
            >
              👋
            </span>
          </div>
          {/* User Details with Icons - Adjusted colors for better contrast */}
          <p className="text-base font-medium text-gray-700 flex items-center gap-2">
            <FaUserCircle className="text-indigo-600 text-lg" />{" "}
            {/* Slightly darker indigo, adjusted icon size */}
            <span className="font-semibold">@{username}</span>{" "}
            {/* Make username bold */}
          </p>
          <p className="text-base text-gray-600 flex items-center gap-2">
            <MdOutlineMarkEmailRead className="text-blue-600 text-lg" />{" "}
            {/* Slightly darker blue, adjusted icon size */}
            {email}
          </p>
        </div>
        {/* Metadata Section */}
        <div className="flex flex-col items-start lg:items-end gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-2 text-gray-700 font-medium">
            <PiCalendarBlankDuotone className="text-teal-700 text-xl" />{" "}
            {/* Slightly darker teal for icon */}
            Joined on: <span className="font-semibold">{joinedDate}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={kyc.status} />
            <StatusBadge status={userStatus} />
          </div>
        </div>
      </div>
    </div>
  );
}
