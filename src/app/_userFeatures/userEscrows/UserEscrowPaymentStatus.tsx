import { Button } from "@/app/_components/DashboardBtn";
import { MdOutlinePayment } from "react-icons/md";

// Status color mapping
const statusColors: Record<
  "active" | "pending" | "rejected" | "disputed",
  { text: string; bg: string }
> = {
  active: { text: "text-success", bg: "bg-success/20" },
  pending: { text: "text-warning", bg: "bg-warning/20" },
  rejected: { text: "text-error", bg: "bg-error/20" },
  disputed: { text: "text-purple-600", bg: "bg-purple-100/30" },
};

export default function UserEscrowPaymentStatus({
  paymentStatus,
  escrowfeepayment,
  status,
  type,
  openPaymentModal,
}: {
  paymentStatus: string;
  escrowfeepayment: string;
  status: "active" | "pending" | "rejected" | "disputed";
  type: "buy" | "sell";
  openPaymentModal: () => void;
}) {
  const { text, bg } = statusColors[status];

  return (
    <div className="w-full border border-db-border rounded-xl overflow-hidden shadow-sm bg-db-surface">
      {/* Header */}
      <div className="flex items-center justify-between bg-db-border/50 px-5 py-3">
        <div>
          <h3 className="text-base font-semibold text-db-text-primary">
            Payment & Escrow Status
          </h3>
          <p className="text-xs text-gray-500">
            Review payment details and escrow progress
          </p>
        </div>

        {/* Action: Pay Button (only for buyers with active unpaid escrow) */}
        {type === "buy" && status === "active" && paymentStatus === "unpaid" && (
          <Button onClick={openPaymentModal}>
            <span className="hidden lg:block">Make Payment</span>
            <span className="block lg:hidden">Pay</span>
            <MdOutlinePayment fontSize="1.2rem" />
          </Button>
        )}
      </div>

      {/* Info List */}
      <div className="divide-y divide-db-border">
        {/* Payment Status */}
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-db-text-secondary">
              Payment Status
            </span>
            <span className="text-xs text-gray-500">
              Current state of your payment
            </span>
          </div>
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${text} ${bg}`}
          >
            {paymentStatus}
          </span>
        </div>

        {/* Escrow Fee Responsibility */}
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-db-text-secondary">
              Escrow Fee Payer
            </span>
            <span className="text-xs text-gray-500">
              Who covers the escrow charges
            </span>
          </div>
          <span className="text-sm font-semibold text-db-text-primary capitalize">
            {escrowfeepayment}
          </span>
        </div>

        {/* Escrow Status */}
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-db-text-secondary">
              Escrow Status
            </span>
            <span className="text-xs text-gray-500">
              Overall transaction progress
            </span>
          </div>
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${text} ${bg}`}
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}
