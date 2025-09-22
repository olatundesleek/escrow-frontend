"use client";

import { FaUserCircle } from "react-icons/fa";
import { PiCalendarBlankDuotone } from "react-icons/pi";
import StatusBadge from "@/app/_components/StatusBadge";

interface UserData {
  kyc: { status: "verified" | "unverified" };
  firstname: string;
  username: string;
  email: string;
  status: string;
  createdAt: string;
}

/**
 * WelcomeHeader
 *
 * Provides a clear, actionable introduction for users.
 * Displays KYC status, account status, joined date, and guidance for next steps.
 */
export default function WelcomeHeader({ user }: { user: UserData }) {
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

  // Determine actionable message based on KYC & account status
  const nextStepMessage =
    kyc.status === "unverified"
      ? "Complete your KYC verification to start receiving escrow funds."
      : userStatus === "inactive"
      ? "Your account is inactive. Contact support to activate it."
      : "You’re all set! Start managing your escrow transactions securely.";

  return (
    <header className="relative w-full rounded-xl p-4 sm:p-6 bg-db-surface shadow-sm border border-db-border">
      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Left Section: Welcome & Info */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-db-text-primary">
              <span className="text-db-text-secondary">Hello,</span> {firstname}
              !
            </h1>
            <span
              className="text-2xl sm:text-4xl animate-wave origin-bottom-right"
              role="img"
              aria-label="waving hand"
            >
              👋
            </span>
          </div>

          {/* Username */}
          <div className="flex items-center gap-2 text-db-text-secondary text-base font-medium">
            <FaUserCircle className="text-db-primary text-lg shrink-0" />
            <span
              className="font-semibold truncate max-w-xs"
              title={`@${username}`}
            >
              @{username}
            </span>
          </div>

          {/* Intro / Actionable Guidance */}
          <p className="text-db-text-secondary text-sm mt-1 max-w-md">
            {nextStepMessage}
          </p>
        </div>

        {/* Right Section: Metadata & Status */}
        <div className="flex flex-col items-start lg:items-end gap-3 text-sm text-db-text-secondary">
          {/* Joined Date */}
          <div className="flex items-center gap-2 font-medium">
            <PiCalendarBlankDuotone className="text-db-primary text-xl shrink-0" />
            <span>
              Member since <span className="font-semibold">{joinedDate}</span>
            </span>
          </div>

          {/* Status Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge
              status={kyc.status}
              aria-label={`KYC status: ${kyc.status}`}
            />
            <StatusBadge
              status={userStatus}
              aria-label={`Account status: ${userStatus}`}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
