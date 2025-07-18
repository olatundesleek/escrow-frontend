export default function StatusBadge({ status }: { status: string }) {
  const statusStyles = {
    verified: "bg-green-100 text-green-600",
    unverified: "bg-yellow-100 text-yellow-600",
    active: "bg-blue-100 text-blue-600",
    inactive: "bg-gray-200 text-gray-600",
  };

  const colorClass =
    statusStyles[status as keyof typeof statusStyles] ||
    "bg-gray-100 text-gray-600";

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${colorClass}`}
    >
      {status.toUpperCase()}
    </span>
  );
}
