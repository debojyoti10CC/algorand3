"use client"

import { Button } from "@/components/ui/button"
import { Shield, Clock, Coins } from "lucide-react"

export function HeroSection() {
  const handleConnectWallet = () => {
    // This would integrate with lute-connect package
    console.log("Connecting to Lute wallet...")
    // Example integration:
    // import { LuteConnect } from 'lute-connect'
    // const lute = new LuteConnect()
    // await lute.connect()
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 py-20 sm:py-32">
      <div className="absolute inset-0 bg-[url('/abstract-blockchain-network.png')] opacity-5"></div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 flex justify-center space-x-4">
            <div className="rounded-full bg-accent/10 p-3">
              <Shield className="h-8 w-8 text-accent" />
            </div>
            <div className="rounded-full bg-accent/10 p-3">
              <Clock className="h-8 w-8 text-accent" />
            </div>
            <div className="rounded-full bg-accent/10 p-3">
              <Coins className="h-8 w-8 text-accent" />
            </div>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl text-balance">
            Welcome to <span className="text-accent">TimeLockBox</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
            Create secure, time-locked escrow contracts on Algorand. Perfect for freelance payments, savings goals, and
            any scenario where funds should be locked until a specific time.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-lg"
              onClick={handleConnectWallet}
            >
              Connect Wallet (Lute — Chrome)
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg bg-transparent">
              Learn More
            </Button>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Click "Connect Wallet (Lute — Chrome)" to securely connect your Lute Algorand wallet extension and begin
            creating time-locked escrow contracts.
          </p>
        </div>
      </div>
    </section>
  )
}
