interface ChatMessageProps {
  message: {
    id: number;
    text: string;
    sender: string;
    timestamp: string;
  };
}

let lastLabel: string | null = null;

const ChatDateLabel = ({ message }: ChatMessageProps) => {
  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isYesterday = (date: Date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return date.toDateString() === yesterday.toDateString();
  };

  const msgDate = new Date(message.timestamp);
  let label = "";

  if (isToday(msgDate)) label = "Today";
  else if (isYesterday(msgDate)) label = "Yesterday";
  else label = msgDate.toDateString();

  const showLabel = label !== lastLabel;
  if (showLabel) lastLabel = label;

  return (
    <div className="text-center text-xs text-gray-500 my-4">
      {showLabel ? label : null}
    </div>
  );
};

export default ChatDateLabel;
