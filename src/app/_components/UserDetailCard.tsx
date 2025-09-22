import React from "react";

export interface UserDetailCardProps {
  cardColor?: string;
  title: string;
  value: number;
  icon: React.ReactNode;
  onClick?: () => void;
}

export default function UserDetailCard({
  cardColor,
  title,
  value,
  icon,
  onClick,
}: UserDetailCardProps) {
  return (
    <div
      onClick={onClick}
      className={`relative flex items-center justify-between w-full p-4 sm:p-5 
      rounded-xl border border-db-border shadow-sm
      bg-db-surface transform transition-transform duration-300 
      hover:scale-[1.02] hover:shadow-md cursor-pointer`}
    >
      <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-2 sm:space-y-0 w-full">
        {/* Icon container */}
        <div
          className={`p-3 rounded-full flex-shrink-0 ${cardColor} bg-opacity-20`}
        >
          {icon}
        </div>

        {/* Text section */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <p className="text-sm font-medium text-db-text-secondary">{title}</p>
          <p className="text-2xl font-bold text-db-text-primary">
            {value.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
