import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ConnectWallet = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts.length > 0) {
            setAddress(accounts[0]);
            setIsConnected(true);
          }
        } catch (error) {
          console.error("Error checking connection:", error);
        }
      }
    };

    checkConnection();
  }, []);

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAddress(accounts[0]);
        setIsConnected(true);
        toast({
          title: "Wallet Connected",
          description: "Your wallet has been successfully connected!",
        });
      } else {
        toast({
          title: "MetaMask Required",
          description: "Please install MetaMask to connect your wallet.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    }
    setIsConnecting(false);
  };

  return (
    <Button
      onClick={connectWallet}
      disabled={isConnecting}
      className="bg-web3-primary text-white hover:bg-web3-primary/80"
    >
      {isConnecting ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : null}
      {isConnected ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Connect Wallet"}
    </Button>
  );
};