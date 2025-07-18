import { TbWallet, TbWalletOff } from "react-icons/tb";
import WalletDetailsCard from "./WalletDetailsCard";
import { LuPiggyBank } from "react-icons/lu";

interface props {
  wallet: {
    balance: number;
    locked: number;
    currency: string;
    _id: string;
    user: string;
    createdAt: string;
    updatedAt: string;
  };
}
export default function UserWalletDetailsCard({ wallet }: props) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      <WalletDetailsCard
        title="Total Balance"
        value={wallet.balance || 0}
        color={"text-green-800"}
        bg="bg-green-50 text-green-800 border-green-200"
        icon={<TbWallet className="text-green-600" />}
      />
      <WalletDetailsCard
        title="Available Balance"
        value={wallet.balance - wallet.locked || 0}
        color={"text-blue-800"}
        bg="bg-blue-50 text-blue-800 border-blue-200"
        icon={<LuPiggyBank className="text-blue-600" />}
      />
      <WalletDetailsCard
        title="Locked Balance"
        value={wallet.locked || 0}
        color={"text-red-800"}
        bg="bg-red-50 text-red-800 border-red-200"
        icon={<TbWalletOff className="text-red-600" />}
      />
    </div>
  );
}
