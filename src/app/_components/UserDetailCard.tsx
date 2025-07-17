import React from "react";

export interface UserDetailCardProps {
  cardColor?: string;
  title: string;
  value: number;
  icon: React.ReactNode;
  bg: string; // Tailwind bg utility
}
// UserDetailCard component - now self-contained for the immersive
export const UserDetailCard = ({
  cardColor,
  title,
  value,
  icon,
  bg,
}: UserDetailCardProps) => (
  <div
    className={`relative flex items-center justify-between p-4 rounded-2xl shadow-md ${bg} transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg`}
  >
    <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-2 sm:space-y-0 w-full">
      {/* Icon container with background color and opacity */}
      <div
        className={`p-3 rounded-full ${cardColor} bg-opacity-20 flex-shrink-0`}
      >
        {icon}
      </div>
      <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">
          {value.toLocaleString()}
        </p>
      </div>
    </div>
  </div>
);
