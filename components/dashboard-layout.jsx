"use client"

import React from "react"

import { useState } from "react"
import { useAuth } from "./auth-provider"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  LayoutDashboard,
  Users,
  Package,
  Settings,
  LogOut,
  Menu,
  Shield,
  UserPlus,
  PackagePlus,
  BarChart3,
  FileText,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function DashboardLayout({ children }) {
  const { adminEmail, logout } = useAuth()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    {
      name: "Home",
      href: "/dashboard",
      icon: LayoutDashboard,
      current: pathname === "/dashboard",
    },
    {
      name: "Admin Management",
      href: "/dashboard/admin",
      icon: Shield,
      current: pathname === "/dashboard/admin",
    },
    {
      name: "User Management",
      href: "/dashboard/users",
      icon: Users,
      current: pathname === "/dashboard/users",
    },
    {
      name: "Product Management",
      href: "/dashboard/products",
      icon: Package,
      current: pathname === "/dashboard/products",
    },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart3,
      current: pathname === "/dashboard/analytics",
    },
    {
      name: "Reports",
      href: "/dashboard/reports",
      icon: FileText,
      current: pathname === "/dashboard/reports",
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      current: pathname === "/dashboard/settings",
    },
  ]

  const quickActions = [
    { name: "Add Admin", icon: UserPlus, href: "/dashboard/admin?action=add" },
    { name: "Add User", icon: UserPlus, href: "/dashboard/users?action=add" },
    { name: "Add Product", icon: PackagePlus, href: "/dashboard/products?action=add" },
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Mobile menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="md:hidden fixed top-4 left-4 z-50">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex flex-col h-full">
            <div className="p-6 border-b">
              <div className="flex items-center gap-2">
                <Shield className="w-8 h-8 text-primary" />
                <div>
                  <h2 className="font-bold text-lg">Admin Portal</h2>
                  <Badge variant="secondary" className="text-xs">
                    Dashboard
                  </Badge>
                </div>
              </div>
            </div>
            <nav className="flex-1 p-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    item.current
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="fixed inset-y-0 left-0 flex w-64 flex-col z-40 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-gray-700 shadow-xl">
          <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-6 mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-b border-gray-200 dark:border-gray-700">
              <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <div className="ml-3">
                <h2 className="font-bold text-lg text-gray-900 dark:text-white">Admin Portal</h2>
                <Badge variant="secondary" className="text-xs">
                  Dashboard
                </Badge>
              </div>
            </div>
            <nav className="flex-1 px-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 border ${
                    item.current
                      ? "bg-blue-600 text-white shadow-md border-blue-600"
                      : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <item.icon className={`w-5 h-5 mr-3 ${item.current ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`} />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-t">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Quick Actions</h3>
            <div className="space-y-1">
              {quickActions.map((action) => (
                <Link
                  key={action.name}
                  href={action.href}
                  className="flex items-center gap-2 px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
                >
                  <action.icon className="w-3 h-3" />
                  {action.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

      {/* Main content */}
      <div className="pl-64 flex flex-col flex-1">
        {/* Top bar */}
        <header className="bg-white dark:bg-slate-800 shadow-sm border-b">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-foreground">Admin Dashboard</h1>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="hidden sm:flex">
                  {adminEmail}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="hover:scale-105 transition-transform">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-destructive">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
