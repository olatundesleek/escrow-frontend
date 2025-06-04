import React from "react";

interface UserDetailCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  bg: string;
}

const UserDetailCard = ({ title, value, icon, bg }: UserDetailCardProps) => {
  return (
    <div className='flex flex-row gap-4 h-auto bg-white shadow-md rounded-lg p-4'>
      <div
        className={`flex items-center justify-center ${bg} rounded-lg p-4 text-4xl font-bold`}
      >
        {icon}
      </div>

      <div className='flex flex-col gap-3 w-full'>
        <h2 className='text-3xl opacity-60 font-bold'>{value}</h2>
        <p className='text-sm opacity-60 w-full whitespace-nowrap font-bold'>
          {title}
        </p>
      </div>
    </div>
  );
};

export default UserDetailCard;
