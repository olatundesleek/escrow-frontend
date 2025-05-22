import React from "react";

interface AccountDetailsCardProps {
  value: string;
  title: string;
  icon: React.ReactNode;
  bg: string;
}

const AccountDetailsCard = ({
  value,
  title,
  icon,
  bg,
}: AccountDetailsCardProps) => {
  return (
    <div className='flex flex-row justify-between items-center p-3 h-auto bg-white border-r-1  border-gray-400'>
      <div className='flex flex-col gap-5'>
        <h2 className='text-2xl font-bold opacity-70'>{value}</h2>
        <p className='text-md opacity-60'>{title}</p>
      </div>
      <div
        className={`flex items-center justify-center ${bg} h-15 w-15 rounded-lg p-2 text-2xl font-bold`}
      >
        {icon}
      </div>
    </div>
  );
};

export default AccountDetailsCard;
