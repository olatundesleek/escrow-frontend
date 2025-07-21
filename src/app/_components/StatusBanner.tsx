import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

export default function StatusBanner({
  type,
  message,
}: {
  type: "success" | "error";
  message: string;
}) {
  if (!message) return null;
  const isSuccess = type === "success";

  return (
    <div
      className={`flex items-center gap-2 text-sm p-3 rounded-md font-medium ${
        isSuccess ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
      }`}
    >
      {isSuccess ? (
        <FaCheckCircle className="text-lg" />
      ) : (
        <FaExclamationCircle className="text-lg" />
      )}
      {message}
    </div>
  );
}
