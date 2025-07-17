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
import { TooltipProps } from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import SpinnerMini from "./SpinnerMini"; // Assuming SpinnerMini is a simple spinner component

// Custom hook to determine if it's a mobile view
const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
};

// Types
interface MonthlyData {
  name: string;
  deposit: number;
  withdraw: number;
}

// Colors
const DEPOSIT_COLOR = "#5f27cd"; // Tailwind blue-500
const WITHDRAW_COLOR = "orange"; // Tailwind amber-400

// Simulated API
const fetchTransactionData = (): Promise<MonthlyData[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { name: "Aug 24", deposit: 950, withdraw: 150 },
        { name: "Sep 24", deposit: 1200, withdraw: 150 },
        { name: "Oct 24", deposit: 0, withdraw: 350 },
        { name: "Nov 24", deposit: 800, withdraw: 200 },
        { name: "Dec 24", deposit: 1500, withdraw: 50 },
        { name: "Jan 25", deposit: 1100, withdraw: 400 },
        { name: "Feb 25", deposit: 700, withdraw: 180 },
        { name: "Mar 25", deposit: 1300, withdraw: 250 },
        { name: "Apr 25", deposit: 1000, withdraw: 100 },
        { name: "May 25", deposit: 1600, withdraw: 300 },
        { name: "Jun 25", deposit: 900, withdraw: 120 },
        { name: "Jul 25", deposit: 1400, withdraw: 280 },
      ]);
    }, 1000);
  });

// Tooltip
const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-md border border-gray-200 bg-white/90 p-3 shadow-lg backdrop-blur-sm">
        <p className="mb-1 text-sm font-semibold text-gray-800">{label}</p>
        {payload.map((entry, index) => (
          <p
            key={`item-${index}`}
            style={{ color: entry.color }}
            className="text-xs"
          >
            {entry.name}: ${entry.value?.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const TransactionChart = () => {
  const [chartData, setChartData] = useState<MonthlyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile(); // Use the custom hook

  useEffect(() => {
    const getData = async () => {
      setLoading(true); // Set loading true at the start of fetch
      setError(null);
      try {
        const data = await fetchTransactionData();
        setChartData(data);
      } catch (err) {
        console.error("Failed to fetch chart data:", err); // Use console.error for errors
        setError("Failed to load chart data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) {
    return (
      <div className="w-full">
        <div className="min-h-[450px] flex items-center justify-center rounded-xl border bg-white text-gray-500 shadow">
          <SpinnerMini /> {/* Use SpinnerMini component */}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        <div className="min-h-[450px] p-4 flex flex-col items-center justify-center rounded-xl border border-red-300 bg-red-50 text-red-700 shadow">
          <p className="text-lg font-semibold mb-1">Error</p>
          <p className="text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!chartData.length) {
    return (
      <div className="w-full">
        <div className="min-h-[450px] flex items-center justify-center rounded-xl border bg-white text-gray-500 shadow">
          No transaction data available.
        </div>
      </div>
    );
  }

  // Calculate dynamic width for BarChart on mobile to enable scrolling
  // Each bar group (deposit + withdraw) needs about 40-50px, plus padding
  const chartContentWidth = chartData.length * (20 * 2 + 10); // 2 bars * barSize + padding
  const minChartWidth = isMobile ? Math.max(chartContentWidth, 350) : "100%"; // Ensure a minimum width on mobile, or 100% for desktop

  return (
    <div className="w-full">
      <div className="rounded-xl border border-gray-200 bg-white shadow">
        <div className="flex flex-col sm:flex-row items-center justify-between border-b bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800">
            Monthly Transactions
          </h3>
          <p className="text-sm text-gray-500">Last 12 Months</p>
        </div>

        <div className="p-4 sm:p-6">
          {/* Horizontal scroll container for mobile */}
          <div className="overflow-x-auto">
            <ResponsiveContainer width={minChartWidth} height={350}>
              <BarChart data={chartData} margin={{ top: 20, bottom: 10 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e5e7eb"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  padding={{ left: 10, right: 10 }}
                  // Adjust interval and font size for mobile view
                  interval={isMobile ? Math.ceil(chartData.length / 6) : 0}
                  tick={{ fill: "#6b7280", fontSize: isMobile ? 10 : 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${v.toLocaleString()}`}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ fill: "rgba(0, 0, 0, 0.03)" }}
                  content={<CustomTooltip />}
                />
                <Legend
                  iconType="circle"
                  verticalAlign="top"
                  align="right"
                  wrapperStyle={{
                    paddingTop: "20px",
                    fontSize: 13,
                    color: "#4b5563",
                  }}
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
    </div>
  );
};

export default TransactionChart;
