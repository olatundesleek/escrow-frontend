"use client";

import { FaUserCircle } from "react-icons/fa";
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
    <div className="relative w-full p-4 sm:p-6  rounded-xl">
      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Welcome Message Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <h1 className="sm:text-3xl text-xl font-extrabold tracking-tight text-gray-900">
              Welcome back, {firstname}
            </h1>
            <span
              className="sm:text-4xl text-2xl animate-wave origin-bottom-right"
              role="img"
              aria-label="waving hand"
            >
              👋
            </span>
          </div>

          <p className="text-base font-medium text-gray-700 flex items-center gap-2">
            <FaUserCircle className="text-indigo-600 text-lg" />
            <span className="font-semibold">@{username}</span>
          </p>
        </div>
        {/* Metadata Section */}
        <div className="flex flex-col items-start lg:items-end gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-2 text-gray-700 font-medium">
            <PiCalendarBlankDuotone className="text-teal-700 text-xl" />
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
