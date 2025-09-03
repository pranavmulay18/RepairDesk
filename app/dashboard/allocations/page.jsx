"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, Search, Filter, Package, UserIcon, Calendar, CheckCircle, Clock, XCircle } from "lucide-react"





export default function AllocationsPage() {
  const [allocations, setAllocations] = useState([
    {
      id: "1",
      userId: "1",
      userName: "Alice Johnson",
      userEmail: "alice@example.com",
      productId: "1",
      productName: "Wireless Headphones",
      quantity: 2,
      allocatedDate: "2024-01-20",
      status: "Approved",
      notes: "For marketing team demo",
    },
    {
      id: "2",
      userId: "2",
      userName: "Bob Smith",
      userEmail: "bob@example.com",
      productId: "2",
      productName: "Smart Watch",
      quantity: 1,
      allocatedDate: "2024-01-19",
      status: "Pending",
      notes: "Employee reward program",
    },
    {
      id: "3",
      userId: "3",
      userName: "Carol Davis",
      userEmail: "carol@example.com",
      productId: "4",
      productName: "Yoga Mat",
      quantity: 3,
      allocatedDate: "2024-01-18",
      status: "Delivered",
      notes: "Wellness program supplies",
    },
    {
      id: "4",
      userId: "4",
      userName: "David Wilson",
      userEmail: "david@example.com",
      productId: "1",
      productName: "Wireless Headphones",
      quantity: 1,
      allocatedDate: "2024-01-17",
      status: "Rejected",
      notes: "Insufficient stock",
    },
  ])

  // Mock data for users and products
  const users = [
    { id: "1", name: "Alice Johnson", email: "alice@example.com" },
    { id: "2", name: "Bob Smith", email: "bob@example.com" },
    { id: "3", name: "Carol Davis", email: "carol@example.com" },
    { id: "4", name: "David Wilson", email: "david@example.com" },
  ]

  const products = [
    { id: "1", name: "Wireless Headphones", stock: 45, price: 199.99 },
    { id: "2", name: "Smart Watch", stock: 23, price: 299.99 },
    { id: "3", name: "Coffee Maker", stock: 0, price: 89.99 },
    { id: "4", name: "Yoga Mat", stock: 67, price: 49.99 },
    { id: "5", name: "Desk Lamp", stock: 12, price: 79.99 },
  ]

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [formData, setFormData] = useState({
    userId: "",
    productId: "",
    quantity: "",
    notes: "",
  })
  const [error, setError] = useState("")

  const filteredAllocations = allocations.filter((allocation) => {
    const matchesSearch =
      allocation.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      allocation.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      allocation.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || allocation.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const handleAddAllocation = () => {
    if (!formData.userId || !formData.productId || !formData.quantity) {
      setError("Please fill in all required fields")
      return
    }

    const user = users.find((u) => u.id === formData.userId)
    const product = products.find((p) => p.id === formData.productId)

    if (!user || !product) {
      setError("Invalid user or product selection")
      return
    }

    const quantity = Number.parseInt(formData.quantity)
    if (quantity > product.stock) {
      setError(`Insufficient stock. Available: ${product.stock}`)
      return
    }

    const newAllocation = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      productId: product.id,
      productName: product.name,
      quantity: quantity,
      allocatedDate: new Date().toISOString().split("T")[0],
      status: "Pending",
      notes: formData.notes,
    }

    setAllocations([newAllocation, ...allocations])
    setFormData({ userId: "", productId: "", quantity: "", notes: "" })
    setIsAddDialogOpen(false)
    setError("")
  }

  const handleStatusChange = (id, newStatus) => {
    setAllocations(
      allocations.map((allocation) => (allocation.id === id ? { ...allocation, status: newStatus } : allocation)),
    )
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "Rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "Delivered":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
        return CheckCircle
      case "Pending":
        return Clock
      case "Rejected":
        return XCircle
      case "Delivered":
        return Package
      default:
        return Clock
    }
  }

  const stats = [
    {
      title: "Total Allocations",
      value: allocations.length,
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      title: "Pending Approvals",
      value: allocations.filter((a) => a.status === "Pending").length,
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
    },
    {
      title: "Approved Today",
      value: allocations.filter(
        (a) => a.status === "Approved" && a.allocatedDate === new Date().toISOString().split("T")[0],
      ).length,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      title: "Total Value",
      value: `$${allocations
        .filter((a) => a.status === "Approved" || a.status === "Delivered")
        .reduce((sum, a) => {
          const product = products.find((p) => p.id === a.productId)
          return sum + (product ? product.price * a.quantity : 0)
        }, 0)
        .toLocaleString()}`,
      icon: UserIcon,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
    },
  ]

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Product Allocation</h1>
              <p className="text-muted-foreground">Manage product assignments to users</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 hover:scale-105 transition-transform">
                  <Plus className="w-4 h-4" />
                  New Allocation
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Allocation</DialogTitle>
                  <DialogDescription>Assign products to users for approval.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="user">Select User</Label>
                    <Select
                      value={formData.userId}
                      onValueChange={(value) => setFormData({ ...formData, userId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a user" />
                      </SelectTrigger>
                      <SelectContent>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name} ({user.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product">Select Product</Label>
                    <Select
                      value={formData.productId}
                      onValueChange={(value) => setFormData({ ...formData, productId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a product" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map((product) => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name} (Stock: {product.stock})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      placeholder="Enter quantity"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Input
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Add any notes or comments"
                    />
                  </div>
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <Button onClick={handleAddAllocation} className="w-full">
                    Create Allocation
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-200 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search allocations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Allocations List */}
          <div className="space-y-4">
            {filteredAllocations.map((allocation) => {
              const StatusIcon = getStatusIcon(allocation.status)
              const product = products.find((p) => p.id === allocation.productId)
              const totalValue = product ? product.price * allocation.quantity : 0

              return (
                <Card key={allocation.id} className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      {/* User Info */}
                      <div className="flex items-center gap-3 flex-1">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {allocation.userName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{allocation.userName}</h3>
                          <p className="text-sm text-muted-foreground">{allocation.userEmail}</p>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="flex items-center gap-3 flex-1">
                        <Package className="w-8 h-8 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">{allocation.productName}</h4>
                          <p className="text-sm text-muted-foreground">
                            Qty: {allocation.quantity} • Value: ${totalValue.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {/* Status and Date */}
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <Badge className={`${getStatusColor(allocation.status)} mb-1`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {allocation.status}
                          </Badge>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(allocation.allocatedDate).toLocaleDateString()}
                          </p>
                        </div>

                        {/* Status Actions */}
                        {allocation.status === "Pending" && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleStatusChange(allocation.id, "Approved")}
                              className="hover:scale-105 transition-transform"
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleStatusChange(allocation.id, "Rejected")}
                              className="hover:scale-105 transition-transform"
                            >
                              Reject
                            </Button>
                          </div>
                        )}

                        {allocation.status === "Approved" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusChange(allocation.id, "Delivered")}
                            className="hover:scale-105 transition-transform"
                          >
                            Mark Delivered
                          </Button>
                        )}
                      </div>
                    </div>

                    {allocation.notes && (
                      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          <strong>Notes:</strong> {allocation.notes}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filteredAllocations.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No allocations found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
