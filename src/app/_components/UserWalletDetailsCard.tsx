import { TbWallet, TbWalletOff } from "react-icons/tb";
import WalletDetailsCard from "./WalletDetailsCard";
import { LuPiggyBank } from "react-icons/lu";
import { UserBaseWallet } from "../_types/userDashboardServicesTypes";

interface Props {
  wallet: UserBaseWallet;
}
export default function UserWalletDetailsCard({ wallet }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      <WalletDetailsCard
        title="Total Balance"
        value={wallet.totalBalance || 0}
        color={"text-green-800"}
        border="border border-green-200"
        icon={<TbWallet className="text-green-600" />}
      />
      <WalletDetailsCard
        title="Available Balance"
        value={wallet.availableBalance || 0}
        color={"text-blue-800"}
        border="border border-blue-200"
        icon={<LuPiggyBank className="text-blue-600" />}
      />
      <WalletDetailsCard
        title="Locked Balance"
        value={wallet.lockedBalance || 0}
        color={"text-red-800"}
        border=" border border-red-200"
        icon={<TbWalletOff className="text-red-600" />}
      />
    </div>
  );
}
