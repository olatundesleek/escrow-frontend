import React from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

interface OffersProps {
  title: string;
  color?: string;
}

const Offers = ({ title, color = "text-secondary" }: OffersProps) => {
  return (
    <p className="flex items-center text-lg text-gray-700 font-medium gap-2">
      <span>
        <IoCheckmarkCircleOutline className={`${color} text-2xl font-bold`} />
      </span>
      {title}
    </p>
  );
};

export default Offers;
