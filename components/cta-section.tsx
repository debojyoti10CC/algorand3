"use client"

import { Button } from "@/components/ui/button"

export function CTASection() {
  const handleConnectWallet = () => {
    // This would integrate with lute-connect package
    console.log("Connecting to Lute wallet...")
  }

  return (
    <section className="py-20 sm:py-32 bg-accent/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Ready to secure your payments?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Join thousands of users who trust TimeLockBox for their time-locked escrow needs.
          </p>
          <div className="mt-8">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-lg"
              onClick={handleConnectWallet}
            >
              Connect Wallet (Lute — Chrome)
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            No setup fees • Secure blockchain technology • 24/7 automated execution
          </p>
        </div>
      </div>
    </section>
  )
}
