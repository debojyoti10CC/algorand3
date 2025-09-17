"use client"

import * as React from 'react';
import { Button } from "@/components/ui/button"
import { Shield, Clock, CheckCircle, Briefcase, Wallet, AlertCircle, Download } from "lucide-react"
import Link from "next/link"
import { useWallet } from "@/contexts/WalletContext"

const FeatureItem = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="flex flex-col items-center text-center p-6 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
    <div className="p-3 rounded-full bg-primary/10 mb-4">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </div>
)

export function HeroSection() {
  const { isConnected, connectWallet, walletAddress, loading, error: walletError } = useWallet()
  const [error, setError] = React.useState<string | null>(null);
  
  const handleConnectClick = async () => {
    console.log("Connect button clicked");
    setError(null); // Clear previous errors
    
    try {
      // Check if connectWallet function exists
      if (typeof connectWallet !== 'function') {
        throw new Error('connectWallet is not a function');
      }
      
      // Add a timeout to prevent infinite loading
      const timeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection timeout after 15 seconds. Please try again.')), 15000)
      );
      
      // Race the connection attempt against the timeout
      await Promise.race([
        connectWallet(),
        timeout
      ]);
      
      console.log("Wallet connected successfully");
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to connect to wallet';
      setError(errorMessage);
      
      // Show alert only for specific errors
      if (errorMessage.includes('timeout') || errorMessage.includes('user rejected')) {
        alert(errorMessage);
      }
    }
  }

  // Log wallet connection state for debugging
  React.useEffect(() => {
    console.log("Wallet connection state:", { isConnected, loading, walletError, walletAddress });
  }, [isConnected, loading, walletError, walletAddress]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20">
      <div className="absolute inset-0 bg-[url('/abstract-blockchain-network.png')] opacity-5"></div>
      
      {/* Main Hero Section */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-20 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl text-balance">
            Secure Freelance Payments with <span className="text-primary">TimeLockBox</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
            The decentralized escrow platform on Algorand that ensures fair payments for freelancers and 
            secure delivery for clients. Connect your wallet to get started.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4">
            {!isConnected ? (
              <div className="flex flex-col items-center w-full max-w-md">
                <Button 
                  onClick={handleConnectClick}
                  className="w-full px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 mb-4"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Connecting...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Wallet className="h-5 w-5 mr-2" />
                      Connect to TimeLockBox
                    </span>
                  )}
                </Button>
                <div className="text-sm text-muted-foreground mt-2 text-center">
                  Don't have Lute Wallet? 
                  <a 
                    href="https://chromewebstore.google.com/detail/lute/kiaoohollfkjhikdifohdckeidckokjh" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline ml-1 inline-flex items-center"
                  >
                    Install it here
                    <Download className="h-3 w-3 ml-1" />
                  </a>
                </div>
                {walletError && (
                  <div className="w-full mt-4 p-3 bg-red-50 text-red-700 rounded-md flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Wallet Error</p>
                      <p className="text-sm">{walletError}</p>
                      <p className="text-xs mt-1">
                        Make sure Lute Wallet is installed and try again.{" "}
                        <a 
                          href="https://chromewebstore.google.com/detail/lute/kiaoohollfkjhikdifohdckeidckokjh" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="underline hover:no-underline"
                        >
                          Install Lute Wallet
                        </a>
                      </p>
                    </div>
                  </div>
                )}
                {error && (
                  <div className="w-full mt-4 p-3 bg-red-50 text-red-700 rounded-md flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Connection Error</p>
                      <p className="text-sm">{error}</p>
                      <p className="text-xs mt-1">
                        Make sure Lute Wallet is installed and try again.{" "}
                        <a 
                          href="https://chromewebstore.google.com/detail/lute/kiaoohollfkjhikdifohdckeidckokjh" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="underline hover:no-underline"
                        >
                          Install Lute Wallet
                        </a>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <Link href="/projects" className="w-full">
                  <Button size="lg" className="w-full px-8 py-6 text-lg">
                    <Briefcase className="h-5 w-5 mr-2" />
                    Browse Projects
                  </Button>
                </Link>
                <Link href="/dashboard" className="w-full">
                  <Button variant="outline" size="lg" className="w-full px-8 py-6 text-lg">
                    Go to Dashboard
                  </Button>
                </Link>
                {walletAddress && (
                  <div className="w-full mt-4 p-3 bg-green-50 text-green-700 rounded-md">
                    <p className="text-sm font-medium">Connected: {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureItem 
              icon={Shield} 
              title="Secure Escrow"
              description="Funds are locked in smart contracts until work is completed and approved"
            />
            <FeatureItem 
              icon={Clock} 
              title="Time-Locked Payments"
              description="Set milestones and release payments automatically when conditions are met"
            />
            <FeatureItem 
              icon={CheckCircle} 
              title="Dispute Resolution"
              description="Built-in mediation system for handling disputes fairly"
            />
          </div>
        </div>
      </div>
    </section>
  )
}