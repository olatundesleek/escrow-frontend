"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { TooltipProps } from "recharts";
import type {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import SpinnerMini from "./SpinnerMini";
import { getUserTransactions } from "../_lib/userDashboardServices";
import { UserTransactionItem } from "../_types/userDashboardServicesTypes";

type SortType = "Yearly" | "Monthly" | "Weekly" | "Daily";

// Hook: check if screen is mobile
const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);
  return isMobile;
};

// Types
interface ChartData {
  name: string;
  deposit: number;
  withdraw: number;
}

// Colors
const DEPOSIT_COLOR = "var(--color-db-primary)";
const WITHDRAW_COLOR = "var(--color-db-secondary)";

// Tooltip
const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-md border border-db-border bg-db-surface/80 p-3 shadow-lg backdrop-blur-sm">
        <p className="mb-1 text-sm font-semibold text-db-text-secondary">
          {label}
        </p>
        {payload.map((entry, i) => (
          <p key={i} style={{ color: entry.color }} className="text-xs">
            {entry.name}: ₦{Number(entry.value).toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// 🧠 Helper: Group transactions by period
const groupTransactions = (
  transactions: UserTransactionItem[],
  sort: string
): ChartData[] => {
  const map: Record<string, { deposit: number; withdraw: number }> = {};

  for (const tx of transactions) {
    const date = new Date(tx.createdAt);
    let label = "";

    switch (sort) {
      case "Yearly":
        label = date.getFullYear().toString();
        break;
      case "Monthly":
        label = date.toLocaleString("en-US", {
          month: "short",
          year: "2-digit",
        });
        break;
      case "Weekly":
        const week = Math.ceil(date.getDate() / 7);
        label = `${date.toLocaleString("en-US", { month: "short" })} WK${week}`;
        break;
      case "Daily":
        // 👇 Include time grouping to show multiple deposits per day
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        label = `${date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })} ${hours}:${minutes}`;
        break;
    }

    if (!map[label]) map[label] = { deposit: 0, withdraw: 0 };
    if (tx.type === "wallet_deposit") map[label].deposit += tx.amount;
    else if (tx.type === "withdrawal") map[label].withdraw += tx.amount;
  }

  return Object.entries(map)
    .map(([name, { deposit, withdraw }]) => ({ name, deposit, withdraw }))
    .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());
};

const TransactionChart = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState<SortType>("Monthly");
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getUserTransactions();
        console.log(res);
        if (!res.success || !res.data) throw new Error("Invalid response");
        const grouped = groupTransactions(res.data, sort);
        setChartData(grouped);
      } catch (err) {
        console.error(err);
        setError("Failed to load transaction chart data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [sort]);

  if (loading)
    return (
      <div className="w-full min-h-[450px] flex items-center justify-center rounded-xl border bg-db-surface text-db-text-secondary shadow">
        <SpinnerMini />
      </div>
    );

  if (error)
    return (
      <div className="w-full min-h-[450px] flex flex-col items-center justify-center rounded-xl border border-red-300 bg-red-50 text-red-700 shadow">
        <p className="text-lg font-semibold mb-1">Error</p>
        <p className="text-sm">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Retry
        </button>
      </div>
    );

  if (!chartData.length)
    return (
      <div className="w-full min-h-[450px] flex items-center justify-center rounded-xl border bg-db-surface text-db-text-secondary shadow">
        No transaction data available.
      </div>
    );

  const chartContentWidth = chartData.length * (20 * 2 + 10);
  const minChartWidth = isMobile ? Math.max(chartContentWidth, 350) : "100%";

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-b border-db-border px-4 py-3">
        <h3 className="text-base sm:text-lg font-semibold text-db-text-secondary">
          {sort} Transactions
        </h3>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm text-db-text-secondary">
            Sort By:
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortType)}
            className="border border-db-border bg-db-surface text-db-text-primary text-sm px-2 py-1 rounded-md outline-none hover:border-db-primary transition"
          >
            <option>Yearly</option>
            <option>Monthly</option>
            <option>Weekly</option>
            <option>Daily</option>
          </select>
        </div>
      </div>

      {/* Chart */}
      <div className="p-4 sm:p-6">
        <div className="overflow-x-auto">
          <ResponsiveContainer width={minChartWidth} height={350}>
            <BarChart data={chartData} margin={{ top: 20, bottom: 10 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="var(--color-db-border)"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                padding={{ left: 10, right: 10 }}
                interval={isMobile ? Math.ceil(chartData.length / 6) : 0}
                tick={{
                  fill: "var(--color-db-text-primary)",
                  fontSize: isMobile ? 10 : 12,
                }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `₦${v.toLocaleString()}`}
                tick={{ fill: "var(--color-db-text-primary)", fontSize: 12 }}
              />
              <Tooltip
                cursor={{ fill: "var(--color-db-border)" }}
                content={<CustomTooltip />}
              />
              <Legend
                iconType="circle"
                verticalAlign="top"
                align="right"
                wrapperStyle={{ paddingTop: "20px", fontSize: 13 }}
              />
              <Bar
                dataKey="deposit"
                fill={DEPOSIT_COLOR}
                name="Deposits"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
              <Bar
                dataKey="withdraw"
                fill={WITHDRAW_COLOR}
                name="Withdrawals"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TransactionChart;
