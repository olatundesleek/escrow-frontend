import React from "react";

interface UserDetailCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  bg: string;
}

const UserDetailCard = ({ title, value, icon, bg }: UserDetailCardProps) => {
  return (
    <div className="flex flex-row gap-4 h-auto bg-white border-2 border-black shadow-lg rounded-lg p-4">
      <div
        className={`flex items-center justify-center ${bg} rounded-lg p-4 text-4xl font-bold`}
      >
        {icon}
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-2xl opacity-60 font-bold">{value}</h2>
        <p className="text-sm opacity-60">{title}</p>
      </div>
    </div>
  );
};

export default UserDetailCard;
