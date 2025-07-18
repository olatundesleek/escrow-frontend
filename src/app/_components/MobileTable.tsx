import { Row } from "@tanstack/react-table";
import Button from "./Button"; // Assuming your Button component is in the same directory
import { useRouter } from "next/navigation";
import { HiOutlineChat, HiOutlineSearch } from "react-icons/hi";

// We keep TData extending { _id: string } as requested
export function MobileCard<TData extends { _id: string }>({
  row,
}: {
  row: Row<TData>;
}) {
  const { push } = useRouter();

  // Keep the existing get function as requested
  const get = (colId: string) => row.getValue(colId) as React.ReactNode;

  // --- DESIGN CHANGES START HERE ---

  // Expanded and styled `paymentVariant` to match dreamy badges
  const paymentVariantClasses = (paymentStatus: string) => {
    const ps = paymentStatus.toLowerCase();
    let bgColor = "bg-gray-100"; // Default
    let textColor = "text-gray-700"; // Default

    switch (ps) {
      case "pending":
        bgColor = "bg-yellow-100";
        textColor = "text-yellow-800";
        break;
      case "paid":
        bgColor = "bg-emerald-100"; // Vibrant green for paid
        textColor = "text-emerald-800";
        break;
      case "refunded":
        bgColor = "bg-cyan-100"; // Cyan for refunded
        textColor = "text-cyan-800";
        break;
      case "unpaid":
      case "failed":
        bgColor = "bg-red-100";
        textColor = "text-red-800";
        break;

      default:
        bgColor = "bg-gray-100";
        textColor = "text-gray-700";
    }
    return `inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase shadow-sm ${bgColor} ${textColor}`;
  };

  // Expanded and styled `statusVariant` to match dreamy badges
  const statusVariantClasses = (status: string) => {
    const s = status.toLowerCase();
    let bgColor = "bg-gray-100"; // Default
    let textColor = "text-gray-700"; // Default

    switch (s) {
      case "pending":
        bgColor = "bg-yellow-100";
        textColor = "text-yellow-800";
        break;
      case "active":
        bgColor = "bg-purple-100"; // Dreamy purple for active
        textColor = "text-purple-800";
        break;
      case "completed":
        bgColor = "bg-green-100";
        textColor = "text-green-800";
        break;
      case "cancelled":
      case "rejected":
        bgColor = "bg-red-100";
        textColor = "text-red-800";
        break;
      case "disputed":
        bgColor = "bg-orange-100";
        textColor = "text-orange-800";
        break;
      default:
        // Fallback for any other unexpected status
        bgColor = "bg-gray-100";
        textColor = "text-gray-700";
    }
    return `inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase shadow-sm ${bgColor} ${textColor}`;
  };

  return (
    // Main card container styling: updated border, shadow, roundedness, and spacing
    <div className="border border-gray-200 p-4 rounded-xl shadow-md bg-white space-y-4">
      <div className="flex justify-between items-start">
        {/* Use items-start for top alignment */}
        <div>
          {/* Label for date */}
          <p className="text-sm text-gray-400 font-normal mb-1">Date</p>
          <p className="font-normal text-base text-gray-800">
            {/* Adjusted font sizes/weights */}
            {new Date(String(get("createdAt"))).toLocaleDateString("en-NG", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
        <div>
          {/* Apply the new status badge styling */}
          <span
            className={statusVariantClasses(
              get("status")?.toString() ?? "pending"
            )}
          >
            {get("status")}
          </span>
        </div>
      </div>

      <div>
        <p className="text-gray-400 font-normal text-sm mb-1">Category</p>
        {/* Added font-medium */}
        <p className="font-normal text-base capitalize text-gray-800">
          {get("category")}
        </p>
        {/* Adjusted font sizes/weights */}
      </div>

      <div>
        <p className="text-gray-400 font-normal text-sm mb-1">Description</p>
        <p className="font-normal text-base capitalize text-gray-700 line-clamp-2">
          {/* Added line-clamp and adjusted font */}
          {get("description")}
        </p>
      </div>

      <div className="flex justify-between items-start">
        {/* Use items-start for top alignment */}
        <div>
          <p className="text-gray-400 font-normal text-sm mb-1">Amount</p>
          <p className="font-normal text-lg text-gray-900 whitespace-nowrap">
            {/* Highlight amount with larger, bolder text */}
            {Number(get("amount")).toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
              minimumFractionDigits: 2,
            })}
          </p>
        </div>
        <div>
          {/* Apply the new payment status badge styling */}
          <span
            className={paymentVariantClasses(
              get("paymentStatus")?.toString() ?? "pending"
            )}
          >
            {get("paymentStatus")}
          </span>
        </div>
      </div>

      {/* Reordered Escrow ID section for better flow */}
      <div className="flex justify-between items-center">
        <p className="text-gray-400 font-normal text-sm">Escrow ID</p>
        <p className="text-sm text-gray-700 font-medium">{get("_id")}</p>
        {/* Adjusted text styling */}
      </div>

      {/* Conditional Chat Section for 'active' status */}
      {get("status")?.toString().toLowerCase() === "active" && (
        <div className="flex justify-between items-center">
          <p className="text-gray-400 font-normal text-sm">Counterparty</p>
          {/* Changed label from 'Username' to 'Counterparty' */}
          <button className="flex items-center gap-1 text-dashboard-secondary hover:text-blue-700 transition-colors font-medium">
            <span>Chat</span>
            <HiOutlineChat
              className="animate-bounce"
              fontSize={"1.25rem"}
            />{" "}
            {/* Adjusted icon size */}
          </button>
        </div>
      )}

      {/* View Details Button */}
      <Button
        color="bg-dashboard-secondary text-dashboard-primary"
        style="flex justify-center items-center gap-1 w-full"
        // onClick={() => push(`escrows/${row.original._id}`)}
        onClick={() => push(`escrows/${get("_id")}`)}
      >
        <span>
          <HiOutlineSearch />
        </span>
        <span>View Details</span>
      </Button>
    </div>
  );
}
