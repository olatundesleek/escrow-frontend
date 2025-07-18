import { CiNoWaitingSign } from "react-icons/ci";
import { UserEscrowItem } from "../_types/userDashboardServicesTypes";

interface props {
  escrows: UserEscrowItem[];
}

export default function UserRecentEscrowTable({ escrows }: props) {
  return (
    <>
      {escrows.length > 0 ? (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-lg">
          <table className="min-w-full text-left text-sm divide-y divide-gray-200">
            <thead className="bg-gray-50 uppercase text-gray-600">
              <tr>
                <th className="px-6 py-3 font-semibold tracking-wider">
                  Escrow ID
                </th>
                <th className="px-6 py-3 font-semibold tracking-wider text-right">
                  Amount
                </th>
                <th className="px-6 py-3 font-semibold tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 font-semibold tracking-wider whitespace-nowrap">
                  Created Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {escrows.slice(0, 5).map((escrow) => (
                <tr key={escrow._id} className="transition hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-indigo-700">
                    {escrow._id || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-right text-gray-800 font-medium">
                    $
                    {(escrow.amount || 0).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase ${
                        escrow.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : escrow.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {escrow.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                    {new Date(escrow.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex items-center justify-center p-6 text-gray-500 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
          <CiNoWaitingSign className="h-6 w-6 mr-2 text-gray-400" />
          <p className="text-sm">No recent escrows to display.</p>
        </div>
      )}
    </>
  );
}
