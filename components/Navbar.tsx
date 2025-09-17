"use client"

import { useState } from "react"
import Link from "next/link"
import { Briefcase, Home, Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              TimeLockBox
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
            <Home className="h-4 w-4 mr-2" />
            Home
          </Link>
          <Link href="/projects" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
            <Briefcase className="h-4 w-4 mr-2" />
            Find Work
          </Link>
          <Link href="/dashboard" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <Link href="/how-it-works" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
            How It Works
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-md text-foreground/70 hover:text-foreground focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 border-t border-border/40">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground/70 hover:bg-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="inline-block h-4 w-4 mr-2" />
              Home
            </Link>
            <Link
              href="/projects"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground/70 hover:bg-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              <Briefcase className="inline-block h-4 w-4 mr-2" />
              Find Work
            </Link>
            <Link
              href="/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground/70 hover:bg-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/how-it-works"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground/70 hover:bg-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
