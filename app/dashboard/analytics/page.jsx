"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  BarChart3, 
  Users, 
  Package, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  Calendar,
  DollarSign,
  Target,
  CheckCircle,
  Clock,
  AlertTriangle
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d")
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalAllocations: 0,
    activeAllocations: 0,
    completedAllocations: 0,
    pendingAllocations: 0
  })

  const [recentActivity, setRecentActivity] = useState([])
  const [topProducts, setTopProducts] = useState([])

  useEffect(() => {
    // Load demo analytics data
    setStats({
      totalUsers: 156,
      totalProducts: 89,
      totalAllocations: 234,
      activeAllocations: 45,
      completedAllocations: 178,
      pendingAllocations: 11
    })

    setRecentActivity([
      {
        id: 1,
        type: "user_added",
        message: "New user John Doe added",
        timestamp: "2 hours ago",
        status: "success"
      },
      {
        id: 2,
        type: "product_updated",
        message: "Product 'Laptop Screen' stock updated",
        timestamp: "4 hours ago",
        status: "info"
      },
      {
        id: 3,
        type: "allocation_completed",
        message: "Allocation #1234 completed",
        timestamp: "6 hours ago",
        status: "success"
      },
      {
        id: 4,
        type: "admin_login",
        message: "Admin Sarah logged in",
        timestamp: "8 hours ago",
        status: "info"
      }
    ])

    setTopProducts([
      { name: "Laptop Screen", allocations: 23, stock: 45 },
      { name: "Phone Battery", allocations: 18, stock: 32 },
      { name: "Keyboard", allocations: 15, stock: 28 },
      { name: "Mouse", allocations: 12, stock: 19 },
      { name: "Charger", allocations: 10, stock: 25 }
    ])
  }, [])

  const getStatusIcon = (status) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "info":
        return <Activity className="w-4 h-4 text-blue-500" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      default:
        return <Activity className="w-4 h-4 text-gray-500" />
    }
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case "user_added":
        return <Users className="w-4 h-4 text-blue-500" />
      case "product_updated":
        return <Package className="w-4 h-4 text-green-500" />
      case "allocation_completed":
        return <CheckCircle className="w-4 h-4 text-purple-500" />
      case "admin_login":
        return <Activity className="w-4 h-4 text-orange-500" />
      default:
        return <Activity className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor system performance and key metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Allocations</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeAllocations}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-600">+5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((stats.completedAllocations / stats.totalAllocations) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+3%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Detailed Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Allocation Status Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Allocation Status Overview</CardTitle>
            <CardDescription>Distribution of allocations by status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Completed</span>
                </div>
                <span className="text-sm font-medium">{stats.completedAllocations}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Active</span>
                </div>
                <span className="text-sm font-medium">{stats.activeAllocations}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">Pending</span>
                </div>
                <span className="text-sm font-medium">{stats.pendingAllocations}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Allocated Products</CardTitle>
            <CardDescription>Most frequently allocated items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">
                      #{index + 1}
                    </Badge>
                    <span className="text-sm font-medium">{product.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{product.allocations} allocations</div>
                    <div className="text-xs text-muted-foreground">
                      Stock: {product.stock}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest system activities and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg border">
                <div className="flex-shrink-0 mt-1">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {activity.message}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.timestamp}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  {getStatusIcon(activity.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">System Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Uptime</span>
              <Badge variant="default">99.9%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Response Time</span>
              <Badge variant="default">45ms</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Error Rate</span>
              <Badge variant="secondary">0.1%</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">User Engagement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Daily Active</span>
              <Badge variant="default">89</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Weekly Active</span>
              <Badge variant="default">234</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Monthly Active</span>
              <Badge variant="default">1,567</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Business Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Revenue</span>
              <Badge variant="default">$12,450</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Orders</span>
              <Badge variant="default">156</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Growth</span>
              <Badge variant="default">+15%</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </DashboardLayout>
  )
}
