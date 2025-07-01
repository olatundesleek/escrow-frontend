"use client";

interface Transaction {
  user: string;
  trx: string;
  time: string;
  amount: number;
}

const transactions: Transaction[] = [
  {
    user: "Jane Doe",
    trx: "2JOXA7PTKAVV",
    time: "10-02-2025 05:48 AM",
    amount: -40,
  },
  {
    user: "Jane Doe",
    trx: "5GFETQYD9R7Y",
    time: "07-02-2025 07:09 AM",
    amount: -100,
  },
  {
    user: "Anthony Gonsalves",
    trx: "W5XM48C43EJ4",
    time: "07-02-2025 06:58 AM",
    amount: 200,
  },
  {
    user: "Jane Doe",
    trx: "MFPRDGOP3RGU",
    time: "02-02-2025 06:40 AM",
    amount: 0,
  },
  {
    user: "John Doe",
    trx: "MFPRDGOP3RGU",
    time: "02-02-2025 06:40 AM",
    amount: 0,
  },
  {
    user: "Anthony Gonsalves",
    trx: "757Z3Z3WX89S",
    time: "02-02-2025 06:39 AM",
    amount: 0,
  },
  {
    user: "David Gonzalez",
    trx: "757Z3Z3WX89S",
    time: "02-02-2025 06:39 AM",
    amount: 0,
  },
  {
    user: "Jane Doe",
    trx: "VBECW615XUW6",
    time: "01-02-2025 11:21 AM",
    amount: 100,
  },
  {
    user: "Jane Doe",
    trx: "VBECW615XUW6",
    time: "01-02-2025 11:20 AM",
    amount: -100,
  },
  {
    user: "Jane Doe",
    trx: "VBECW615XUW6",
    time: "01-02-2025 11:20 AM",
    amount: -100,
  },
];

const TransactionTable = () => {
  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <h2 className="text-lg font-semibold text-gray-700">
        Latest Transactions
      </h2>
      {/* Large screen table */}
      <div className="bg-white h-full lg:flex lg:flex-col overflow-hidden border-2 border-dashboard-border rounded-lg shadow-md hidden ">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-300">
            <tr className="text-left text-gray-600">
              <th className="p-3">User</th>
              <th className="p-3">TRX</th>
              <th className="p-3">Initiated</th>
              <th className="p-3">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((trx, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-3 text-purple-600 whitespace-nowrap">
                  {trx.user}
                </td>
                <td className="p-3">{trx.trx}</td>
                <td className="p-3 whitespace-nowrap">{trx.time}</td>
                <td
                  className={`p-3 font-medium whitespace-nowrap ${
                    trx.amount < 0
                      ? "text-red-500"
                      : trx.amount > 0
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  {trx.amount >= 0 ? "+" : "-"}
                  {Math.abs(trx.amount).toFixed(2)} USD
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked cards */}
      <div className="lg:hidden flex flex-col shadow-md overflow-hidden border-2 border-black rounded-lg">
        {transactions.map((trx, index) => (
          <div
            key={index}
            className="bg-white  border-b-2 border-black  p-4 text-sm flex flex-col gap-2"
          >
            <div className="flex justify-between">
              <span className="font-semibold text-gray-500">User </span>
              <span className="text-purple-600">{trx.user}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-500">TRX </span>
              <span>{trx.trx}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-500">Initiated </span>
              <span>{trx.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-500">Amount </span>
              <span
                className={`font-semibold ${
                  trx.amount < 0
                    ? "text-red-500"
                    : trx.amount > 0
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                {trx.amount >= 0 ? "+" : "-"}
                {Math.abs(trx.amount).toFixed(2)} USD
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionTable;
