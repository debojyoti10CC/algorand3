import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { WalletProvider } from "@/contexts/WalletContext"
import Navbar from "@/components/Navbar"

export const metadata: Metadata = {
  title: "TimeLockBox - Secure Time-Locked Escrow on Algorand",
  description:
    "Create secure, time-locked escrow contracts on Algorand. Perfect for freelance payments, savings goals, and any scenario where funds should be locked until a specific time.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} min-h-screen flex flex-col`}>
        <WalletProvider>
          <Navbar />
          <main className="flex-1">
            <Suspense fallback={null}>
              {children}
            </Suspense>
          </main>
          <Analytics />
        </WalletProvider>
      </body>
    </html>
  )
}
