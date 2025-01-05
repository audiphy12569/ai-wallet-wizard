import { useState } from "react";
import { ConnectWallet } from "@/components/ConnectWallet";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { useToast } from "@/hooks/use-toast";

interface Message {
  text: string;
  timestamp: string;
  isUser: boolean;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm your Web3 assistant. Connect your wallet to get started!",
      timestamp: new Date().toLocaleTimeString(),
      isUser: false,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async (message: string) => {
    // Add user message
    const userMessage: Message = {
      text: message,
      timestamp: new Date().toLocaleTimeString(),
      isUser: true,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // TODO: Implement API call to OpenAI and blockchain data fetching
      // For now, we'll just echo the message
      setTimeout(() => {
        const botMessage: Message = {
          text: `I received your message: "${message}". This is a placeholder response. Once connected to OpenAI and blockchain APIs, I'll provide detailed information about transactions, balances, and more.`,
          timestamp: new Date().toLocaleTimeString(),
          isUser: false,
        };
        setMessages((prev) => [...prev, botMessage]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process your request. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-web3-background text-white">
      <header className="fixed top-0 z-10 flex w-full items-center justify-between border-b border-gray-800 bg-web3-background/80 px-6 py-4 backdrop-blur-lg backdrop-filter">
        <h1 className="text-xl font-bold">Web3 Chat Assistant</h1>
        <ConnectWallet />
      </header>

      <main className="flex flex-1 flex-col gap-6 px-4 pb-6 pt-24 md:px-6">
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto">
          {messages.map((msg, idx) => (
            <ChatMessage
              key={idx}
              message={msg.text}
              timestamp={msg.timestamp}
              isUser={msg.isUser}
            />
          ))}
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-web3-background/80 p-4 backdrop-blur-lg backdrop-filter">
          <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
        </div>
      </main>
    </div>
  );
};

export default Index;