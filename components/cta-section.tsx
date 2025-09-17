"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import LuteConnect from 'lute-connect'

export function CTASection() {
  const [account, setAccount] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lute] = useState(() => new LuteConnect())

  const handleConnectWallet = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // For Lute, we need to provide the genesis ID
      // Mainnet: "mainnet-v1.0"
      // Testnet: "testnet-v1.0"
      // Betanet: "betanet-v1.0"
      const genesisID = "mainnet-v1.0";
      
      // This will open the Lute wallet popup for connection
      const addresses = await lute.connect(genesisID);
      
      if (addresses && addresses.length > 0) {
        // Use the first address by default
        const selectedAddress = addresses[0];
        setAccount(selectedAddress);
        setIsConnected(true);
        console.log("Connected account:", selectedAddress);
        
        // Store the connected account
        localStorage.setItem('luteConnectedAccount', selectedAddress);
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Failed to connect to wallet"
      setError(errorMsg)
      console.error("Error connecting to Lute wallet:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Check connection status on component mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Check if we have a stored account
        const storedAccount = localStorage.getItem('luteConnectedAccount');
        if (storedAccount) {
          setAccount(storedAccount);
          setIsConnected(true);
        }
      } catch (error) {
        console.error('Error checking connection:', error);
      }
    };

    checkConnection();
  }, []);

  // Save account to localStorage when connected
  useEffect(() => {
    if (account) {
      localStorage.setItem('luteConnectedAccount', account);
    } else {
      localStorage.removeItem('luteConnectedAccount');
    }
  }, [account]);

  return (
    <section className="py-20 sm:py-32 bg-gradient-to-b from-background to-accent/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance mb-6">
            Welcome to <span className="text-primary">TimeLockBox</span>
          </h1>
          <p className="mt-4 text-xl text-muted-foreground text-pretty mb-10">
            Create secure, time-locked escrow contracts on Algorand. Perfect for freelance payments, savings goals, and any scenario where funds should be locked until a specific time.
          </p>
          
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800 mb-6">
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}
          
          {!isConnected ? (
            <div className="space-y-6">
              <Button 
                onClick={handleConnectWallet}
                className="px-10 py-7 text-lg font-semibold w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connecting...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                    </svg>
                    Connect Wallet (Lute — Chrome)
                  </span>
                )}
              </Button>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Click "Connect Wallet (Lute — Chrome)" to securely connect your Lute Algorand wallet extension and begin creating time-locked escrow contracts.
              </p>
              <div className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Don't have Lute Wallet?{' '}
                  <a 
                    href="https://chromewebstore.google.com/detail/lute/kiaoohollfkjhikdifohdckeidckokjh" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium text-primary hover:underline inline-flex items-center"
                  >
                    Install from Chrome Web Store
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
                <div className="flex flex-col items-center space-y-3">
                  <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/50">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-green-800 dark:text-green-200 font-medium">Wallet Connected</p>
                    <p className="text-sm text-green-700 dark:text-green-300 mt-1 font-mono">{`${account?.slice(0, 6)}...${account?.slice(-4)}`}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  className="px-6 py-6 text-base font-medium"
                  onClick={() => {
                    // Navigate to create contract page
                    window.location.href = '/create';
                  }}
                >
                  Create Time-Locked Contract
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setAccount(null);
                    setIsConnected(false);
                  }}
                  className="px-6 py-6 text-base"
                >
                  Disconnect Wallet
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
