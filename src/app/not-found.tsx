// app/not-found.tsx
"use client";

import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-db-background p-6 text-db-text-primary">
      {/* Icon */}
      <FaExclamationTriangle className="text-6xl text-red-500 mb-6" />

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
        404 - Page Not Found
      </h1>

      {/* Description */}
      <p className="text-center text-lg sm:text-xl text-db-text-secondary max-w-lg mb-6">
        Oops! The page you are trying to access doesn’t exist or may have been
        moved. Don’t worry, you can go back to your dashboard and continue
        managing your escrow securely.
      </p>

      {/* Back to Dashboard button */}
      <Link
        href="/dashboard"
        className="px-6 py-3 bg-db-primary text-white font-semibold rounded-lg shadow hover:bg-db-primary/90 transition"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
