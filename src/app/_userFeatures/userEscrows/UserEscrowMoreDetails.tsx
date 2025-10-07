export default function UserEscrowMoreDetails({
  category,
  description,
  amount,
  updatedAt,
}: {
  category: string;
  description: string;
  amount: string;
  updatedAt: string;
}) {
  const details = [
    {
      label: "Category",
      hint: "Type of item",
      value: category,
    },
    {
      label: "Description",
      hint: "Details provided by seller/buyer",
      value: description,
    },
    {
      label: "Amount",
      hint: "Total agreed price",
      value: amount,
    },
    {
      label: "Last Updated",
      hint: "Most recent change",
      value: updatedAt,
    },
  ];

  return (
    <div className="border border-db-border rounded-xl overflow-hidden shadow-sm bg-db-surface">
      {/* Header */}
      <div className="bg-db-border/50 px-5 py-3 text-center">
        <h2 className="text-lg font-semibold text-db-text text-db-text-primary">
          Escrow Item Details
        </h2>
        <p className="text-xs text-db-text-secondary">
          Summary of the item and its transaction details
        </p>
      </div>

      {/* Details */}
      <div className="divide-y divide-db-border">
        {details.map((item, index) => (
          <div
            key={index}
            className="flex items-start justify-between px-5 py-4"
          >
            <div className="flex flex-col">
              <span className="text-sm font-medium text-db-text-primary">
                {item.label}
              </span>
              {item.hint && (
                <span className="text-xs text-db-text-secondary">{item.hint}</span>
              )}
            </div>
            <span className="text-sm font-semibold text-db-text-primary capitalize text-right max-w-[60%]">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
