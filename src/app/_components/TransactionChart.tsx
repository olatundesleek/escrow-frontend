"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface MonthlyData {
  name: string;
  deposit: number;
  withdraw: number;
}

const data: MonthlyData[] = [
  { name: "August-2024", deposit: 950, withdraw: 150 },
  { name: "September-2024", deposit: 1200, withdraw: 150 },
  { name: "October-2024", deposit: 0, withdraw: 350 },
];

{
  /* <div className="flex flex-col lg:flex-row gap-6 p-6 border-2 border-gray-300">
        <div className="w-full lg:w-1/2">
          <TransactionChart />
        </div>
        <div className="w-full lg:w-1/2">
          <TransactionTable />
        </div>
      </div> */
}

{
  /* <div className="flex lg:flex-row flex-col gap-6 p-6 border-2 justify-between">
        <TransactionChart />
        <TransactionTable />
      </div> */
}

const TransactionChart = () => {
  return (
    <div className='flex flex-col gap-4 w-full h-full'>
      <h2 className='text-lg font-semibold text-dashboard-secondary mb-4'>
        Deposit & Withdrawal
      </h2>
      <div className='w-full bg-white h-full overflow-hidden flex flex-col border-2 border-dashboard-border rounded-lg shadow-md'>
        <h2 className='bg-gray-300 p-4 text-sm  text-gray-700 border-b'>
          Progress Report for Last 12 Months
        </h2>
        <div className='flex-1 p-4'>
          <ResponsiveContainer width='100%' height={400}>
            <BarChart data={data}>
              <XAxis dataKey='name' tick={{ fontSize: 12, fill: '#333' }} />
              <YAxis tick={{ fontSize: 12, fill: '#333' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey='deposit' fill='#A3E635' name='Total Deposit' />
              <Bar dataKey='withdraw' fill='#FACC15' name='Total Withdraw' />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TransactionChart;
