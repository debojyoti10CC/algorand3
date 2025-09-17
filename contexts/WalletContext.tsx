"use client"

import * as React from 'react'
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import LuteConnect from 'lute-connect'

// Extend window to include lume wallet
declare global {
  interface Window {
    lume?: {
      connect: () => Promise<string[]>
      disconnect: () => Promise<void>
      isConnected: () => Promise<boolean>
      getAccounts: () => Promise<string[]>
    }
  }
}

type WalletContextType = {
  isConnected: boolean
  walletAddress: string
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  loading: boolean
  error: string | null
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState({
    isConnected: false,
    walletAddress: '',
    loading: false,
    error: null as string | null
  })

  type WalletState = {
    isConnected: boolean
    walletAddress: string
    loading: boolean
    error: string | null
  }

  const updateState = (newState: Partial<WalletState> | ((prev: WalletState) => WalletState)) => {
    if (typeof newState === 'function') {
      setState(newState)
    } else {
      setState(prev => ({ ...prev, ...newState }))
    }
  }

  const connectWallet = useCallback(async () => {
    updateState({ loading: true, error: null })
    
    if (typeof window === 'undefined') {
      updateState({ loading: false, error: 'Wallet connection is only available in the browser' })
      return
    }

    try {
      const lute = new LuteConnect()
      // Default to mainnet unless overridden later via config
      const genesisID = 'mainnet-v1.0'

      // Add a timeout to prevent hanging
      const timeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Connection timed out. Please try again.')), 15000)
      )

      const accounts = await Promise.race([
        lute.connect(genesisID) as unknown as Promise<string[]>,
        timeout,
      ])

      const address = accounts?.[0]
      if (!address) throw new Error('No accounts returned from wallet')

      // Persist (set both keys to stay compatible with CTA section)
      localStorage.setItem('walletConnected', 'true')
      localStorage.setItem('walletAddress', address)
      localStorage.setItem('luteConnectedAccount', address)

      updateState({ isConnected: true, walletAddress: address, loading: false, error: null })
    } catch (err) {
      console.error('Error connecting wallet via lute-connect:', err)
      localStorage.removeItem('walletConnected')
      localStorage.removeItem('walletAddress')
      localStorage.removeItem('luteConnectedAccount')
      updateState({ 
        isConnected: false,
        walletAddress: '',
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to connect to wallet'
      })
      throw err
    }
  }, [])

  const disconnectWallet = useCallback(() => {
    updateState({ loading: true })
    try {
      localStorage.removeItem('walletConnected')
      localStorage.removeItem('walletAddress')
      updateState({
        isConnected: false,
        walletAddress: '',
        loading: false,
        error: null
      })
    } catch (err) {
      console.error('Error disconnecting wallet:', err)
      updateState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to disconnect wallet'
      }))
    }
  }, [])

  useEffect(() => {
    let mounted = true
    
    const checkConnection = async () => {
      if (typeof window === 'undefined') return
      try {
        const savedAddress = localStorage.getItem('walletAddress') || localStorage.getItem('luteConnectedAccount')
        if (savedAddress) {
          updateState({ isConnected: true, walletAddress: savedAddress, loading: false, error: null })
          return
        }
        updateState({ isConnected: false, walletAddress: '', loading: false, error: null })
      } catch (err) {
        console.error('Error in connection check:', err)
        if (mounted) {
          updateState(prev => ({ ...prev, loading: false, error: 'Error initializing wallet connection' }))
        }
      }
    }

    checkConnection()
    
    return () => { mounted = false }
  }, [])

  const contextValue = {
    isConnected: state.isConnected,
    walletAddress: state.walletAddress,
    connectWallet,
    disconnectWallet,
    loading: state.loading,
    error: state.error
  }

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  )
}
