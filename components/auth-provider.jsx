"use client"

import React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminEmail, setAdminEmail] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check authentication status on mount
    const authStatus = localStorage.getItem("isAuthenticated")
    const email = localStorage.getItem("adminEmail")

    if (authStatus === "true" && email) {
      setIsAuthenticated(true)
      setAdminEmail(email)
    }

    setIsLoading(false)
  }, [])

  const logout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("adminEmail")
    setIsAuthenticated(false)
    setAdminEmail(null)
    router.push("/")
  }

  const checkAuth = () => {
    const authStatus = localStorage.getItem("isAuthenticated")
    return authStatus === "true"
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, adminEmail, logout, checkAuth }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
