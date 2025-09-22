import { HiOutlineChat } from "react-icons/hi";

interface UserEscrowChatInfoProps {
  chatActive: boolean;
}

export default function UserEscrowChatInfo({ chatActive }: UserEscrowChatInfoProps) {
  return (
    <div className="rounded-xl overflow-hidden border border-db-border bg-db-surface shadow-sm">
      {/* Header */}
      <div className="flex w-full justify-between items-center px-4 py-3 bg-db-surface-hover">
        <span className="flex items-center gap-2 text-db-text-primary font-medium">
          <HiOutlineChat className="text-db-primary text-lg" />
          <span>Escrow Chat</span>
        </span>

        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${
            chatActive
              ? "bg-db-success/20 text-db-success"
              : "bg-db-error/20 text-db-error"
          }`}
        >
          {chatActive ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Info Section */}
      <div className="px-4 py-3 text-sm text-db-text-secondary">
        {chatActive ? (
          <p>
            The chat with your counterparty is <span className="font-medium text-db-success">active</span>. 
            You can send and receive messages regarding this escrow.
          </p>
        ) : (
          <p>
            The chat is currently <span className="font-medium text-db-error">inactive</span>. 
            You will be notified once it becomes available.
          </p>
        )}
      </div>
    </div>
  );
}
