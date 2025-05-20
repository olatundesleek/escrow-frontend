import React from "react";
import TransactionCard from "./TransactionCard";
import { LuUsers } from "react-icons/lu";
import { BsDatabaseDash } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { IoReload } from "react-icons/io5";

const DashboardTransDisplay = () => {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6 m-7">
      <TransactionCard
        title="Deposited Amount"
        value="$1000.00"
        bg="bg-green-500"
        icon={<LuUsers />}
      />
      <TransactionCard
        title="Pending Deposits"
        value="8"
        bg="bg-orange-500"
        icon={<IoReload />}
      />
      <TransactionCard
        title="Cancel Deposits"
        value="2"
        bg="bg-red-500"
        icon={<MdOutlineCancel />}
      />
      <TransactionCard
        title="Deposits Charge"
        value="$12.00"
        bg="bg-blue-500"
        icon={<BsDatabaseDash />}
      />
    </div>
  );
};

export default DashboardTransDisplay;
