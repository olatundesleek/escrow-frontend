import React from "react";
import UserDetailCard from "./UserDetailCard";
import { LuUsers, LuUserRoundCheck } from "react-icons/lu";
import { TbMailOff, TbMessageOff } from "react-icons/tb";

const DashboardUserDisplay = () => {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6 m-7">
      <UserDetailCard
        title="Total Users"
        value={100}
        bg="bg-purple-100 border-1 border-purple-200"
        icon={<LuUsers className=" text-purple-500" />}
      />

      <UserDetailCard
        title="Active Users"
        value={100}
        bg="bg-green-100 border-1 border-green-200"
        icon={<LuUserRoundCheck className=" text-green-500" />}
      />

      <UserDetailCard
        title="Email Unconfirmed Users"
        value={0}
        bg="bg-orange-100 border-1 border-orange-200"
        icon={<TbMailOff className=" text-orange-500" />}
      />

      <UserDetailCard
        title="Mobile Unconfirmed Users"
        value={0}
        bg="bg-red-100 border-1 border-red-200"
        icon={<TbMessageOff className=" text-red-500" />}
      />
    </div>
  );
};

export default DashboardUserDisplay;
