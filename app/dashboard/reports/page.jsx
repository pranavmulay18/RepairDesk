"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter, 
  BarChart3, 
  TrendingUp, 
  Users, 
  Package,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function ReportsPage() {
  const { toast } = useToast()
  const [selectedReport, setSelectedReport] = useState("allocation")
  const [dateRange, setDateRange] = useState("30d")
  const [customStartDate, setCustomStartDate] = useState("")
  const [customEndDate, setCustomEndDate] = useState("")
  const [filters, setFilters] = useState({
    status: "all",
    user: "all",
    product: "all",
    admin: "all"
  })

  const [reportData, setReportData] = useState({
    allocation: [],
    user: [],
    product: [],
    revenue: []
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Load demo report data
    loadReportData()
  }, [selectedReport, dateRange, filters])

  const loadReportData = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      if (selectedReport === "allocation") {
        setReportData({
          ...reportData,
          allocation: [
            { id: 1, user: "John Doe", product: "Laptop Screen", status: "Completed", date: "2024-12-15", admin: "Sarah Admin" },
            { id: 2, user: "Jane Smith", product: "Phone Battery", status: "Active", date: "2024-12-14", admin: "John Manager" },
            { id: 3, user: "Mike Johnson", product: "Keyboard", status: "Pending", date: "2024-12-13", admin: "Sarah Admin" },
            { id: 4, user: "Lisa Brown", product: "Mouse", status: "Completed", date: "2024-12-12", admin: "John Manager" },
            { id: 5, user: "Tom Wilson", product: "Charger", status: "Active", date: "2024-12-11", admin: "Sarah Admin" }
          ]
        })
      } else if (selectedReport === "user") {
        setReportData({
          ...reportData,
          user: [
            { id: 1, name: "John Doe", email: "john@example.com", status: "Active", allocations: 15, lastLogin: "2024-12-15" },
            { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Active", allocations: 12, lastLogin: "2024-12-14" },
            { id: 3, name: "Mike Johnson", email: "mike@example.com", status: "Inactive", allocations: 8, lastLogin: "2024-12-10" },
            { id: 4, name: "Lisa Brown", email: "lisa@example.com", status: "Active", allocations: 20, lastLogin: "2024-12-15" },
            { id: 5, name: "Tom Wilson", email: "tom@example.com", status: "Suspended", allocations: 5, lastLogin: "2024-12-08" }
          ]
        })
      } else if (selectedReport === "product") {
        setReportData({
          ...reportData,
          product: [
            { id: 1, name: "Laptop Screen", category: "Screens", stock: 45, allocated: 23, value: 1250 },
            { id: 2, name: "Phone Battery", category: "Batteries", stock: 32, allocated: 18, value: 89 },
            { id: 3, name: "Keyboard", category: "Input Devices", stock: 28, allocated: 15, value: 45 },
            { id: 4, name: "Mouse", category: "Input Devices", stock: 19, allocated: 12, value: 25 },
            { id: 5, name: "Charger", category: "Power", stock: 25, allocated: 10, value: 35 }
          ]
        })
      } else if (selectedReport === "revenue") {
        setReportData({
          ...reportData,
          revenue: [
            { id: 1, month: "December 2024", revenue: 12500, orders: 156, growth: "+15%" },
            { id: 2, month: "November 2024", revenue: 10800, orders: 134, growth: "+8%" },
            { id: 3, month: "October 2024", revenue: 10000, orders: 125, growth: "+12%" },
            { id: 4, month: "September 2024", revenue: 8900, orders: 112, growth: "+5%" },
            { id: 5, month: "August 2024", revenue: 8500, orders: 108, growth: "+3%" }
          ]
        })
      }
      setLoading(false)
    }, 1000)
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return <Badge variant="default" className="bg-green-100 text-green-800">Completed</Badge>
      case "Active":
        return <Badge variant="default" className="bg-blue-100 text-blue-800">Active</Badge>
      case "Pending":
        return <Badge variant="default" className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "Suspended":
        return <Badge variant="destructive">Suspended</Badge>
      case "Inactive":
        return <Badge variant="secondary">Inactive</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const exportReport = (format) => {
    toast({
      title: "Export Started",
      description: `Exporting ${selectedReport} report in ${format} format...`,
    })
    
    // Simulate export process
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: `${selectedReport} report has been exported successfully.`,
      })
    }, 2000)
  }

  const getReportTitle = () => {
    switch (selectedReport) {
      case "allocation":
        return "Allocation Reports"
      case "user":
        return "User Activity Reports"
      case "product":
        return "Product Inventory Reports"
      case "revenue":
        return "Revenue & Financial Reports"
      default:
        return "Reports"
    }
  }

  const getReportDescription = () => {
    switch (selectedReport) {
      case "allocation":
        return "Track product allocations, status changes, and completion rates"
      case "user":
        return "Monitor user activity, login patterns, and allocation history"
      case "product":
        return "Analyze inventory levels, allocation patterns, and stock value"
      case "revenue":
        return "View financial performance, revenue trends, and growth metrics"
      default:
        return "Generate comprehensive reports for your business"
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{getReportTitle()}</h1>
          <p className="text-muted-foreground">
            {getReportDescription()}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button size="sm" onClick={() => exportReport("PDF")}>
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button size="sm" onClick={() => exportReport("Excel")}>
            <Download className="w-4 h-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Report Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Report Configuration
          </CardTitle>
          <CardDescription>
            Select report type and configure filters
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reportType">Report Type</Label>
              <Select value={selectedReport} onValueChange={setSelectedReport}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="allocation">Allocation Reports</SelectItem>
                  <SelectItem value="user">User Activity Reports</SelectItem>
                  <SelectItem value="product">Product Inventory Reports</SelectItem>
                  <SelectItem value="revenue">Revenue Reports</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateRange">Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                  <SelectItem value="custom">Custom range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="user">User</Label>
              <Select value={filters.user} onValueChange={(value) => setFilters({ ...filters, user: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="john">John Doe</SelectItem>
                  <SelectItem value="jane">Jane Smith</SelectItem>
                  <SelectItem value="mike">Mike Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {dateRange === "custom" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button onClick={loadReportData} disabled={loading}>
              {loading ? "Loading..." : "Generate Report"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Report Results */}
      <Card>
        <CardHeader>
          <CardTitle>Report Results</CardTitle>
          <CardDescription>
            {loading ? "Generating report..." : `${reportData[selectedReport]?.length || 0} records found`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {selectedReport === "allocation" && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">ID</th>
                        <th className="text-left py-2">User</th>
                        <th className="text-left py-2">Product</th>
                        <th className="text-left py-2">Status</th>
                        <th className="text-left py-2">Date</th>
                        <th className="text-left py-2">Admin</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.allocation.map((item) => (
                        <tr key={item.id} className="border-b">
                          <td className="py-2">#{item.id}</td>
                          <td className="py-2">{item.user}</td>
                          <td className="py-2">{item.product}</td>
                          <td className="py-2">{getStatusBadge(item.status)}</td>
                          <td className="py-2">{item.date}</td>
                          <td className="py-2">{item.admin}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {selectedReport === "user" && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">ID</th>
                        <th className="text-left py-2">Name</th>
                        <th className="text-left py-2">Email</th>
                        <th className="text-left py-2">Status</th>
                        <th className="text-left py-2">Allocations</th>
                        <th className="text-left py-2">Last Login</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.user.map((item) => (
                        <tr key={item.id} className="border-b">
                          <td className="py-2">#{item.id}</td>
                          <td className="py-2">{item.name}</td>
                          <td className="py-2">{item.email}</td>
                          <td className="py-2">{getStatusBadge(item.status)}</td>
                          <td className="py-2">{item.allocations}</td>
                          <td className="py-2">{item.lastLogin}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {selectedReport === "product" && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">ID</th>
                        <th className="text-left py-2">Name</th>
                        <th className="text-left py-2">Category</th>
                        <th className="text-left py-2">Stock</th>
                        <th className="text-left py-2">Allocated</th>
                        <th className="text-left py-2">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.product.map((item) => (
                        <tr key={item.id} className="border-b">
                          <td className="py-2">#{item.id}</td>
                          <td className="py-2">{item.name}</td>
                          <td className="py-2">{item.category}</td>
                          <td className="py-2">{item.stock}</td>
                          <td className="py-2">{item.allocated}</td>
                          <td className="py-2">${item.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {selectedReport === "revenue" && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Month</th>
                        <th className="text-left py-2">Revenue</th>
                        <th className="text-left py-2">Orders</th>
                        <th className="text-left py-2">Growth</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.revenue.map((item) => (
                        <tr key={item.id} className="border-b">
                          <td className="py-2">{item.month}</td>
                          <td className="py-2">${item.revenue.toLocaleString()}</td>
                          <td className="py-2">{item.orders}</td>
                          <td className="py-2">
                            <Badge variant="default" className="bg-green-100 text-green-800">
                              {item.growth}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Schedule Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Set up automated report generation and delivery
            </p>
            <Button variant="outline" size="sm" className="w-full">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Report Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Save and reuse report configurations
            </p>
            <Button variant="outline" size="sm" className="w-full">
              <FileText className="w-4 h-4 mr-2" />
              Manage
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Data Export</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Export data in various formats for analysis
            </p>
            <Button variant="outline" size="sm" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </CardContent>
        </Card>
      </div>
      </div>
    </DashboardLayout>
  )
}
