import { walletColorMap } from "../_constants/wallet";
import { useCardData } from "../_hooks/useCardData";

export const WalletCard = () => {
  const { cardData } = useCardData();
  return (
    <section className="grid sm:grid-cols-3 gap-6 lg:my-8 my-2">
      {cardData.map(({ label, value, icon: Icon, color }) => {
        const style = walletColorMap[color];
        return (
          <div
            key={label}
            className={`bg-gradient-to-tr ${style.bg} shadow-md rounded-2xl p-6 flex items-center gap-4`}
          >
            <Icon className={`${style.icon} text-3xl`} />
            <div>
              <h4 className={`text-sm font-medium ${style.title}`}>{label}</h4>
              <p
                className={`text-xl font-bold ${style.text}`}
                style={{ color: color }}
              >
                ₦{value.toLocaleString()}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
};
