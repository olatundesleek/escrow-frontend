import ButtonIcon from "@/app/_components/ButtonIcon";
import { IoCheckmarkDone, IoCloseSharp } from "react-icons/io5";

interface UserEscrowStatusTableProps {
  status: string;
  openAcceptConfirmModal: () => void;
  openRejectConfirmModal: () => void;
  currentUserId: string;
  creator: string;
}

export default function UserEscrowStatusTable({
  status,
  openAcceptConfirmModal,
  openRejectConfirmModal,
  currentUserId,
  creator,
}: UserEscrowStatusTableProps) {
  const isPendingActionRequired = status === "pending" && currentUserId !== creator;

  return (
    <div className="w-full border border-db-border rounded-xl overflow-hidden bg-db-surface shadow-sm">
      <table className="w-full border-collapse">
        {/* Header */}
        <thead className="bg-db-surface-hover">
          <tr className="border-b border-db-border">
            <th className="py-3 px-6 text-left text-sm font-medium text-db-text-secondary">
              Escrow Information
            </th>
            <th className="py-3 px-6 text-right text-sm font-medium text-db-text-secondary">
              {isPendingActionRequired && (
                <span className="flex lg:hidden justify-end gap-2">
                  {/* Mobile quick action buttons */}
                  <ButtonIcon
                    style="rounded-full text-green-500 hover:text-green-600 flex flex-col items-center"
                    onClick={openAcceptConfirmModal}
                  >
                    <IoCheckmarkDone className="text-lg" />
                    <span className="text-xs font-semibold">Accept</span>
                  </ButtonIcon>
                  <ButtonIcon
                    style="rounded-full text-red-500 hover:text-red-600 flex flex-col items-center"
                    onClick={openRejectConfirmModal}
                  >
                    <IoCloseSharp className="text-lg" />
                    <span className="text-xs font-semibold">Reject</span>
                  </ButtonIcon>
                </span>
              )}
            </th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          <tr className="border-b border-db-border">
            <td className="py-3 px-6 text-sm text-db-text-secondary">Current Status</td>
            <td className="py-3 px-6 text-right capitalize text-db-text-primary font-medium">
              {status}
            </td>

            {/* Desktop action buttons */}
            {isPendingActionRequired && (
              <td className="py-3 px-6 hidden lg:flex justify-end gap-3">
                <ButtonIcon
                  style="rounded-full text-green-500 hover:text-green-600 flex flex-col items-center"
                  onClick={openAcceptConfirmModal}
                >
                  <IoCheckmarkDone className="text-xl" />
                  <span className="text-xs font-semibold">Accept</span>
                </ButtonIcon>
                <ButtonIcon
                  style="rounded-full text-red-500 hover:text-red-600 flex flex-col items-center"
                  onClick={openRejectConfirmModal}
                >
                  <IoCloseSharp className="text-xl" />
                  <span className="text-xs font-semibold">Reject</span>
                </ButtonIcon>
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
