const ChatDateLabel = ({ show, label }: { show: boolean; label: string }) => {
  if (!show) return null;

  return <div className="text-center text-xs text-gray-500 my-4">{label}</div>;
};

export default ChatDateLabel;
