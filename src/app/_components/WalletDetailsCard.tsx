import React from "react";

interface WalletDetailsCardProps {
  value: number;
  title: string;
  icon: React.ReactNode;
  color?: string;
  bg: string; // Tailwind bg utility (e.g., "bg-blue-100")
  border?: string; // Optional border class, defaults to "border border-dashboard-border"
}

const WalletDetailsCard = ({
  value,
  title,
  icon,
  bg,
  color,
  border = "border border-dashboard-border",
}: WalletDetailsCardProps) => {
  return (
    <div
      className={`
        flex justify-between items-center p-6
        rounded-2xl
        ${bg}
        ${border}
        hover:shadow-sm                      
        hover:-translate-y-[2px]             
        transition-all duration-300
        cursor-pointer                       
      `}
    >
      {/* Left: Text Content (Title and Value) */}
      <div className="flex flex-col gap-2">
        <p className={`text-sm font-medium ${color} uppercase tracking-wider`}>
          {title}
        </p>
        <h2
          className={`sm:text-4xl text-2xl font-bold ${color} tabular-nums tracking-tight`}
        >
          ${value.toLocaleString()}
        </h2>
      </div>

      {/* Right: Icon Container */}
      <div
        className={`
          flex items-center justify-center
          w-14 h-14 ${bg} rounded-xl
          text-2xl text-white                
          shadow-md                            
        `}
      >
        {icon}
      </div>
    </div>
  );
};

export default WalletDetailsCard;
