import { Row } from "@tanstack/react-table";
import {Button} from "./DashboardBtn";
import { useRouter } from "next/navigation";
import { HiOutlineChat, HiOutlineSearch } from "react-icons/hi";

export function MobileCard<TData extends { _id: string }>({
  row,
}: {
  row: Row<TData>;
}) {
  const { push } = useRouter();
  const get = (colId: string) => row.getValue(colId) as React.ReactNode;

  // --- Friendly Payment Status Badge ---
  const paymentVariantClasses = (paymentStatus: string) => {
    const ps = paymentStatus.toLowerCase();
    let bgColor = "bg-db-border";
    let textColor = "text-db-text-secondary";
    let label = paymentStatus;

    switch (ps) {
      case "pending":
        bgColor = "bg-warning/20";
        textColor = "text-warning";
        label = "Pending Payment";
        break;
      case "paid":
        bgColor = "bg-db-secondary/20";
        textColor = "text-db-secondary";
        label = "Payment Received";
        break;
      case "refunded":
        bgColor = "bg-db-primary/20";
        textColor = "text-db-primary";
        label = "Refunded";
        break;
      case "unpaid":
      case "failed":
        bgColor = "bg-error/20";
        textColor = "text-error";
        label = "Payment Failed";
        break;
    }
    return { classes: `inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase ${bgColor} ${textColor}`, label };
  };

  // --- Friendly Transaction Status Badge ---
  const statusVariantClasses = (status: string) => {
    const s = status.toLowerCase();
    let bgColor = "bg-db-border";
    let textColor = "text-db-text-secondary";
    let label = status;

    switch (s) {
      case "pending":
        bgColor = "bg-warning/20";
        textColor = "text-warning";
        label = "Pending Approval";
        break;
      case "active":
        bgColor = "bg-purple-500/20";
        textColor = "text-purple-500";
        label = "Active Transaction";
        break;
      case "completed":
        bgColor = "bg-success/20";
        textColor = "text-success";
        label = "Completed";
        break;
      case "cancelled":
      case "rejected":
        bgColor = "bg-error/20";
        textColor = "text-error";
        label = "Cancelled";
        break;
      case "disputed":
        bgColor = "bg-accent/20";
        textColor = "text-accent";
        label = "Disputed";
        break;
    }
    return { classes: `inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase shadow-sm ${bgColor} ${textColor}`, label };
  };

  const paymentBadge = paymentVariantClasses(get("paymentStatus")?.toString() ?? "pending");
  const statusBadge = statusVariantClasses(get("status")?.toString() ?? "pending");

  return (
    <div className="border border-db-border p-5 rounded-xl shadow-md bg-db-surface space-y-4">
      {/* Header Row: Date + Status */}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-db-text-secondary">Transaction Date</p>
          <p className="font-medium text-base text-db-primary">
            {new Date(String(get("createdAt"))).toLocaleDateString("en-NG", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
        <span className={statusBadge.classes}>{statusBadge.label}</span>
      </div>

      {/* Category */}
      <div>
        <p className="text-sm text-db-text-secondary">Category</p>
        <p className="font-medium text-base capitalize text-db-primary">
          {get("category")}
        </p>
      </div>

      {/* Description */}
      <div>
        <p className="text-sm text-db-text-secondary">Description</p>
        <p className="text-base text-db-primary line-clamp-2">
          {get("description")}
        </p>
      </div>

      {/* Amount + Payment Status */}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-db-text-secondary">Amount</p>
          <p className="font-semibold text-lg text-db-primary whitespace-nowrap">
            {Number(get("amount")).toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
              minimumFractionDigits: 2,
            })}
          </p>
        </div>
        <span className={paymentBadge.classes}>{paymentBadge.label}</span>
      </div>

      {/* Transaction ID */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-db-text-secondary">Transaction ID</p>
        <p className="text-sm text-db-text-primary font-medium">{get("_id")}</p>
      </div>

      {/* Chat Option (if Active) */}
      {get("status")?.toString().toLowerCase() === "active" && (
        <div className="flex justify-between items-center">
          <p className="text-sm text-db-text-secondary">Other Party</p>
          <button className="flex items-center gap-1 text-db-secondary hover:text-indigo-700 transition-colors font-medium">
            <span>Open Chat</span>
            <HiOutlineChat fontSize="1.25rem" />
          </button>
        </div>
      )}

      {/* View Details */}
      <Button
      className="w-full"
        onClick={() => push(`escrows/${get("_id")}`)}
      >
        <HiOutlineSearch />
        <span>View Full Details</span>
      </Button>
    </div>
  );
}
