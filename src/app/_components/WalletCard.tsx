import { UserBaseWallet } from "../_types/userDashboardServicesTypes";
import WalletDetailsCard from "./WalletDetailsCard";
import { FaChartLine, FaMoneyBill, FaPiggyBank } from "react-icons/fa";

export const WalletCard = ({ walletData }: { walletData: UserBaseWallet }) => {
  const cardData = [
    {
      label: "Available Balance",
      value: walletData.availableBalance,
      icon: <FaMoneyBill className="text-blue-500" />,
      color: "text-blue-700",
      border: "border border-green-200",
    },
    {
      label: "Locked Amount",
      value: walletData.lockedBalance,
      icon: <FaPiggyBank className="text-red-500" />,
      color: "text-red-700",
      border: "border border-red-200",
    },
    {
      label: "Total Amount",
      value: walletData.totalBalance,
      icon: <FaChartLine className="text-green-500" />,
      color: "text-green-700",
      border: "border border-blue-200",
    },
  ];

  return (
    <section className="grid sm:grid-cols-3 gap-6 lg:my-8 my-2">
      {cardData.map(({ label, value, icon, color, border }) => (
        <WalletDetailsCard
          key={label}
          value={value}
          title={label}
          icon={icon}
          color={color}
          border={border}
        />
      ))}
    </section>
  );
};
