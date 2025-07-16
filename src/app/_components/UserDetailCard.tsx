import React from "react";

interface UserDetailCardProps {
  cardColor: string;
  title: string;
  value: number;
  icon: React.ReactNode;
  bg: string; // Tailwind bg utility
}

const UserDetailCard = ({
  cardColor,
  title,
  value,
  icon,
  bg,
}: UserDetailCardProps) => {
  return (
    <div
      className={`${cardColor} animate-float flex flex-col justify-between gap-4 p-4 rounded-2xl bg-dashboard-primary border border-dashboard-border hover:shadow-md hover:-translate-y-[2px] transition-all duration-300 group cursor-pointer`}
    >
      {/* Top: Icon + Title */}
      <div className="sm:flex items-center gap-2 w-full flex-col">
        <div
          className={`flex items-center justify-center w-12 h-12 ${bg} rounded-full text-xl text-primary group-hover:scale-105 transition-transform duration-300`}
        >
          {icon}
        </div>
        <span
          className={`text-sm font-medium uppercase tracking-wide text-white text-center`}
        >
          {title}
        </span>
      </div>

      {/* Bottom: Value */}
      <div className="sm:text-center">
        <span
          className={`sm:text-4xl text-2xl font-bold tabular-nums text-white tracking-tight`}
        >
          {value.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default UserDetailCard;
