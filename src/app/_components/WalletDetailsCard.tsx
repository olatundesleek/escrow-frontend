import React from "react";
import { formatCurrency } from '../_utils/helpers';

interface WalletDetailsCardProps {
  value: number;
  title: string;
  icon: React.ReactNode;
  color?: string;
  bg?: string; // Tailwind bg utility (e.g., "bg-blue-100")
  border?: string; // Optional border class, defaults to "border border-dashboard-border"
}

const WalletDetailsCard = ({
  value,
  title,
  icon,
  bg,
  color,
  border = 'border border-db-border',
}: WalletDetailsCardProps) => {
  return (
    <div
      className={`
        flex justify-between items-center p-6
        rounded-2xl
        bg-db-background
        ${bg}
        ${border}
        hover:shadow-sm                      
        hover:-translate-y-[2px]             
        transition-all duration-300
        cursor-pointer                       
      `}
    >
      {/* Left: Text Content (Title and Value) */}
      <div className='flex flex-col gap-2'>
        <p className={`text-sm font-medium ${color} uppercase tracking-wider`}>
          {title}
        </p>
        <h2
          className={`sm:text-4xl text-2xl font-bold ${color} tabular-nums tracking-tight`}
        >
          {formatCurrency(value)}
        </h2>
      </div>

      {/* Right: Icon Container */}
      <div
        className={`
          flex items-center justify-center
          w-14 h-14 bg-db-surface ${bg} rounded-xl
          text-2xl text-white                                           
        `}
      >
        {icon}
      </div>
    </div>
  );
};

export default WalletDetailsCard;
