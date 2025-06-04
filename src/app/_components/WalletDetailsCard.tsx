import React from 'react';

interface WalletDetailsCardProps {
  value: number;
  title: string;
  icon: React.ReactNode;
  bg: string;
  border?: string;
}

const WalletDetailsCard = ({
  value,
  title,
  icon,
  bg,
  border,
}: WalletDetailsCardProps) => {
  return (
    <div
      className={`flex flex-row justify-between items-center p-3 px-8 h-auto bg-white ${border}`}
    >
      <div className='flex flex-col gap-5'>
        <h2 className='text-3xl font-bold opacity-70'>${value}</h2>
        <p className='text-lg opacity-60'>{title}</p>
      </div>
      <div
        className={`flex items-center justify-center ${bg} h-15 w-15 rounded-lg p-2 text-2xl font-bold`}
      >
        {icon}
      </div>
    </div>
  );
};

export default WalletDetailsCard;
