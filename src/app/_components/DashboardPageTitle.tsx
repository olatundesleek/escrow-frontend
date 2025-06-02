export default function DashboardPageTitle({
  children,
  padding = 'p-4',
}: {
  children: React.ReactNode;
  padding?: string;
}) {
  return (
    <div
      className={`w-full flex items-center justify-between ${padding} bg-transparent text-dashboard-secondary text-xl border border-dashboard-border rounded shadow-md `}
    >
      {children}
    </div>
  );
}
