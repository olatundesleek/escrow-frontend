import React from "react";

interface TransactionCardProps {
  title: string;
  value: string;
  bg: string;
  icon: React.ReactNode;
}

const TransactionCard = ({ title, value, icon, bg }: TransactionCardProps) => {
  return (
    <div className="flex flex-col gap-3 h-auto bg-db-surface border-2 border-db-border shadow-md rounded-lg p-4">
      <div className="flex items-center gap-3">
        <div
          className={`${bg} text-lg font-bold text-white p-2 rounded-md text-center `}
        >
          {icon}
        </div>
        <p className="text-md opacity-60">{title}</p>
      </div>
      <h2 className="text-2xl font-bold opacity-70">{value}</h2>
    </div>
  );
};

export default TransactionCard;
