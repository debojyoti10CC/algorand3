interface LumeWallet {
  connect: () => Promise<string[]>
  getAccounts: () => Promise<string[]>
  isConnected: () => Promise<boolean>
  signTransaction: (txn: any) => Promise<Uint8Array>
  signTransactions: (txns: any[]) => Promise<Uint8Array[]>
  // Add other Lume wallet methods as needed
}

declare global {
  interface Window {
    lume?: LumeWallet
  }
}

export {}
