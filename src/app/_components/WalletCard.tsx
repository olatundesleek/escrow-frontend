import { useCardData } from "../_hooks/useCardData";

export const WalletCard = () => {
  const { cardData } = useCardData();
  return (
    <section className="grid sm:grid-cols-3 gap-6 my-8">
      {cardData.map(({ label, value, icon: Icon, color }) => (
        <div
          key={label}
          className={`bg-gradient-to-tr from-${color}-100 to-${color}-50 shadow-md rounded-2xl p-6 flex items-center gap-4`}
        >
          <Icon className={`text-${color}-600 text-3xl`} />
          <div>
            <h4 className={`text-sm font-medium text-${color}-800`}>{label}</h4>
            <p className={`text-xl font-bold text-${color}-900`}>
              ₦{value.toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};
