import React from "react";
import UserDetailCard from "./UserDetailCard";
import { LuUsers } from "react-icons/lu";

import {
  HiOutlineCash,
  HiOutlineCurrencyDollar,
  HiOutlineStatusOnline,
} from "react-icons/hi";

const DashboardUserDisplay = ({
  totalUsers,
  totalDisputes,
  totalEscrows,
  totalTransactions,
}: {
  totalUsers: number;
  totalDisputes: number;
  totalEscrows: number;
  totalTransactions: number;
}) => {
  return (
    <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6 m-7">
      <UserDetailCard
        title="Total Users"
        value={totalUsers || 0}
        cardColor="bg-db-primary/20 border-1 border-db-primary/50"
        icon={<LuUsers className=" text-db-text-primary" />}
      />

      <UserDetailCard
        title="Total Escrow"
        value={totalEscrows || 0}
        cardColor="bg-db-success/20 border-1 border-db-success/50"
        icon={<HiOutlineCash className=" text-db-success" />}
      />

      <UserDetailCard
        title="Total Transactions"
        value={totalTransactions || 0}
        cardColor="bg-db-warning/20 border-1 border-db-warning/50"
        icon={<HiOutlineCurrencyDollar className=" text-db-warning" />}
      />

      <UserDetailCard
        title="Online Users"
        value={totalDisputes || 0}
        cardColor="bg-db-success/20 border-1 border-db-success/50"
        icon={<HiOutlineStatusOnline className="text-db-text-secondary" />}
      />
    </div>
  );
};

export default DashboardUserDisplay;
