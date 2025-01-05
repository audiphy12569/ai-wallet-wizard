import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  timestamp: string;
  isUser?: boolean;
}

export const ChatMessage = ({ message, timestamp, isUser }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full animate-fade-up",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-lg p-4 text-white",
          isUser
            ? "bg-web3-primary"
            : "bg-web3-secondary backdrop-blur-lg backdrop-filter"
        )}
      >
        <p className="text-sm md:text-base">{message}</p>
        <span className="mt-2 block text-xs opacity-70">{timestamp}</span>
      </div>
    </div>
  );
};