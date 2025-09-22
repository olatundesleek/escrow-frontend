import React from "react";

interface StatusBadgeProps {
  status: string;
}

/**
 * StatusBadge
 *
 * Displays a colored badge representing a user or account status.
 * Provides a tooltip and accessible labeling for screen readers.
 */
export default function StatusBadge({ status }: StatusBadgeProps) {
  // Define badge colors
  const statusStyles: Record<string, string> = {
    verified: "bg-green-100 text-green-600",
    unverified: "bg-yellow-100 text-yellow-600",
    active: "bg-blue-100 text-blue-600",
    inactive: "bg-gray-200 text-gray-600",
  };

  const colorClass =
    statusStyles[status.toLowerCase()] || "bg-gray-100 text-gray-600";

  // Provide human-readable tooltip
  const tooltipText = (() => {
    switch (status.toLowerCase()) {
      case "verified":
        return "KYC verified";
      case "unverified":
        return "KYC not verified";
      case "active":
        return "Account is active";
      case "inactive":
        return "Account is inactive";
      default:
        return status;
    }
  })();

  return (
    <span
      role="status"
      aria-label={tooltipText}
      title={tooltipText}
      tabIndex={0} // Focusable for keyboard users
      className={`px-3 py-1 rounded-full text-xs font-medium ${colorClass} cursor-default select-none transition-all hover:scale-105 border border-db-border focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accent`}
    >
      {status.toUpperCase()}
    </span>
  );
}
