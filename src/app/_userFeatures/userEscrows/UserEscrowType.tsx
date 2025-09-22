export default function UserEscrowType({ type }: { type: "buy" | "sell" }) {
  const isBuy = type === "buy";

  const colorClasses = isBuy
    ? "bg-success/10 border-success/30 text-success"
    : "bg-db-primary/10 border-db-primary/30 text-db-primary";

  const badgeClasses = isBuy
    ? "bg-success/20 text-success"
    : "bg-db-primary/20 text-db-primary";

  return (
    <div className={`w-full border rounded-xl overflow-hidden shadow-sm ${colorClasses}`}>
      {/* Header */}
      <div className="py-2 px-4 text-sm font-medium uppercase tracking-wide bg-opacity-60">
        Escrow Type
      </div>

      {/* Body */}
      <div className="flex items-center justify-between p-4 bg-db-surface">
        <span className="text-db-text-secondary font-medium">Trade Type</span>
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full border ${badgeClasses}`}
        >
          {type}
        </span>
      </div>
    </div>
  );
}
