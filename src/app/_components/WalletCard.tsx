// import { walletColorMap } from '../_constants/wallet';
import { BaseWallet } from "../_types/userDashboardServicesTypes";
import WalletDetailsCard from "./WalletDetailsCard";
import { FaChartLine, FaMoneyBill, FaPiggyBank } from "react-icons/fa";

export const WalletCard = ({ walletData }: { walletData: BaseWallet }) => {
  const cardData = [
    {
      label: "Available Balance",
      value: walletData.availableBalance,
      icon: <FaMoneyBill className="text-green-500" />,
      color: "green",
    },
    {
      label: "Locked Amount",
      value: walletData.lockedBalance,
      icon: <FaPiggyBank className="text-blue-500" />,
      color: "blue",
    },
    {
      label: "Total Amount",
      value: walletData.totalBalance,
      icon: <FaChartLine className="text-red-500" />,
      color: "red",
    },
  ];

  return (
    <section className="grid sm:grid-cols-3 gap-6 lg:my-8 my-2">
      {cardData.map(({ label, value, icon, color }) => (
        <WalletDetailsCard
          key={label}
          value={value}
          title={label}
          icon={icon}
          color={`text-${color}-700`}
        />
      ))}
    </section>
  );
};
