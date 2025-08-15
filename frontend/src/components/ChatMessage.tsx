
import { motion } from "framer-motion";
import { format } from "date-fns";

type MessageType = {
  id: string;
  content: string;
  sender: "user" | "krishna";
  timestamp: Date;
};

interface ChatMessageProps {
  message: MessageType;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isKrishna = message.sender === "krishna";

  return (
    <motion.div
      className={`flex ${isKrishna ? "justify-start" : "justify-end"}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`rounded-lg px-4 py-3 max-w-[80%] shadow-sm ${
          isKrishna
            ? "bg-white text-krishna-darkBlue mr-auto"
            : "bg-krishna-gold text-krishna-darkBlue ml-auto"
        }`}
      >
        <div className="flex flex-col">
          <span className="text-sm">{message.content}</span>
          <span className="text-xs opacity-70 mt-1 text-right">
            {format(message.timestamp, "h:mm a")}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
