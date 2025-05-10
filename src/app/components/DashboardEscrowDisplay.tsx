import React from "react";
import UserDetailCard from "./UserDetailCard";
import { FaRegCircleCheck } from "react-icons/fa6";
import { BsDatabaseDash } from "react-icons/bs";
import { TbMessage2Bolt } from "react-icons/tb";
import { LuCopyMinus } from "react-icons/lu";

const DashboardUserDisplay = () => {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6 m-7">
      <UserDetailCard
        title="Completed Escrows"
        value={2}
        bg="bg-green-100 border-1 border-green-200"
        icon={<FaRegCircleCheck className=" text-green-500" />}
      />

      <UserDetailCard
        title="Escrow Charges"
        value={64.6}
        bg="bg-blue-100 border-1 border-blue-200"
        icon={<BsDatabaseDash className=" text-blue-500" />}
      />

      <UserDetailCard
        title="Disputed Escrows"
        value={3}
        bg="bg-red-100 border-1 border-red-200"
        icon={<TbMessage2Bolt className=" text-red-500" />}
      />

      <UserDetailCard
        title="Pending Escrows"
        value={54}
        bg="bg-orange-100 border-1 border-orange-200"
        icon={<LuCopyMinus className=" text-orange-500" />}
      />
    </div>
  );
};

export default DashboardUserDisplay;
