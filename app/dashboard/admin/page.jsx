"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, UserPlus, Edit, Trash2, Eye, EyeOff, Search, Filter } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function AdminManagementPage() {
  const [admins, setAdmins] = useState([])
  const [showAddAdmin, setShowAddAdmin] = useState(false)
  const [showEditAdmin, setShowEditAdmin] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [selectedAdmin, setSelectedAdmin] = useState(null)
  const { toast } = useToast()

  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "admin"
  })

  const [editAdmin, setEditAdmin] = useState({
    name: "",
    email: "",
    role: "admin"
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const [deletePassword, setDeletePassword] = useState("")
  const [showPasswords, setShowPasswords] = useState({
    new: false,
    confirm: false,
    current: false,
    delete: false
  })

  useEffect(() => {
    // Load demo admin data
    setAdmins([
      {
        id: "1",
        name: "Super Admin",
        email: "admin@repairdesk.com",
        role: "super_admin",
        isActive: true,
        createdAt: "2024-01-01"
      },
      {
        id: "2",
        name: "John Manager",
        email: "john@repairdesk.com",
        role: "admin",
        isActive: true,
        createdAt: "2024-02-15"
      },
      {
        id: "3",
        name: "Sarah Assistant",
        email: "sarah@repairdesk.com",
        role: "admin",
        isActive: false,
        createdAt: "2024-03-10"
      }
    ])
  }, [])

  const addAdmin = () => {
    if (!newAdmin.name || !newAdmin.email || !newAdmin.password) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive"
      })
      return
    }

    if (newAdmin.password !== newAdmin.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      })
      return
    }

    if (newAdmin.password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive"
      })
      return
    }

    const admin = {
      id: Date.now().toString(),
      name: newAdmin.name,
      email: newAdmin.email,
      role: newAdmin.role,
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0]
    }

    setAdmins([...admins, admin])
    setNewAdmin({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "admin"
    })
    setShowAddAdmin(false)
    toast({
      title: "Success",
      description: "Admin added successfully"
    })
  }

  const editAdminDetails = () => {
    if (!editAdmin.name || !editAdmin.email) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive"
      })
      return
    }

    const updatedAdmins = admins.map(admin => {
      if (admin.id === selectedAdmin.id) {
        return { ...admin, ...editAdmin }
      }
      return admin
    })

    setAdmins(updatedAdmins)
    setShowEditAdmin(false)
    setSelectedAdmin(null)
    toast({
      title: "Success",
      description: "Admin details updated successfully"
    })
  }

  const deleteAdmin = () => {
    if (deletePassword !== "DELETE") {
      toast({
        title: "Error",
        description: "Please type DELETE to confirm",
        variant: "destructive"
      })
      return
    }

    const updatedAdmins = admins.filter(admin => admin.id !== selectedAdmin.id)
    setAdmins(updatedAdmins)
    setShowDeleteConfirm(false)
    setSelectedAdmin(null)
    setDeletePassword("")
    toast({
      title: "Success",
      description: "Admin deleted successfully"
    })
  }

  const filteredAdmins = admins.filter(admin => {
    const matchesSearch = admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         admin.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "all" || admin.role === filterRole
    return matchesSearch && matchesRole
  })

  const getRoleBadgeVariant = (role) => {
    switch (role) {
      case "super_admin":
        return "destructive"
      case "admin":
        return "default"
      default:
        return "secondary"
    }
  }

  const getRoleDisplayName = (role) => {
    switch (role) {
      case "super_admin":
        return "Super Admin"
      case "admin":
        return "Admin"
      default:
        return role
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Management</h1>
          <p className="text-muted-foreground">
            Manage system administrators and their permissions
          </p>
        </div>
        <Button onClick={() => setShowAddAdmin(true)} className="w-full sm:w-auto">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Admin
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger>
                  <SelectValue placeholder="All roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All roles</SelectItem>
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Admins List */}
      <Card>
        <CardHeader>
          <CardTitle>System Administrators</CardTitle>
          <CardDescription>
            {filteredAdmins.length} admin{filteredAdmins.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAdmins.map((admin) => (
              <div key={admin.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{admin.name}</h3>
                    <p className="text-sm text-muted-foreground">{admin.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={getRoleBadgeVariant(admin.role)}>
                        {getRoleDisplayName(admin.role)}
                      </Badge>
                      <Badge variant={admin.isActive ? "default" : "secondary"}>
                        {admin.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedAdmin(admin)
                      setEditAdmin({ name: admin.name, email: admin.email, role: admin.role })
                      setShowEditAdmin(true)
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedAdmin(admin)
                      setShowDeleteConfirm(true)
                    }}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Admin Dialog */}
      <Dialog open={showAddAdmin} onOpenChange={setShowAddAdmin}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Admin</DialogTitle>
            <DialogDescription>
              Create a new system administrator account
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="adminName">Name</label>
              <Input
                id="adminName"
                value={newAdmin.name}
                onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                placeholder="Enter admin name"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="adminEmail">Email</label>
              <Input
                id="adminEmail"
                type="email"
                value={newAdmin.email}
                onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                placeholder="Enter admin email"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="adminRole">Role</label>
              <Select
                value={newAdmin.role}
                onValueChange={(value) => setNewAdmin({ ...newAdmin, role: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="adminPassword">Password</label>
              <div className="relative">
                <Input
                  id="adminPassword"
                  type={showPasswords.new ? "text" : "password"}
                  value={newAdmin.password}
                  onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                  placeholder="Enter password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                >
                  {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="grid gap-2">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPasswords.confirm ? "text" : "password"}
                  value={newAdmin.confirmPassword}
                  onChange={(e) => setNewAdmin({ ...newAdmin, confirmPassword: e.target.value })}
                  placeholder="Confirm password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                >
                  {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddAdmin(false)}>
              Cancel
            </Button>
            <Button onClick={addAdmin}>Add Admin</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Admin Dialog */}
      <Dialog open={showEditAdmin} onOpenChange={setShowEditAdmin}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Admin</DialogTitle>
            <DialogDescription>
              Update admin information
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="editName">Name</label>
              <Input
                id="editName"
                value={editAdmin.name}
                onChange={(e) => setEditAdmin({ ...editAdmin, name: e.target.value })}
                placeholder="Enter admin name"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="editEmail">Email</label>
              <Input
                id="editEmail"
                type="email"
                value={editAdmin.email}
                onChange={(e) => setEditAdmin({ ...editAdmin, email: e.target.value })}
                placeholder="Enter admin email"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="editRole">Role</label>
              <Select
                value={editAdmin.role}
                onValueChange={(value) => setEditAdmin({ ...editAdmin, role: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditAdmin(false)}>
              Cancel
            </Button>
            <Button onClick={editAdminDetails}>Update Admin</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Admin</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the admin account.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="deletePassword">
                Type <span className="font-mono bg-muted px-2 py-1 rounded">DELETE</span> to confirm
              </label>
              <Input
                id="deletePassword"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                placeholder="Type DELETE to confirm"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={deleteAdmin}>
              Delete Admin
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
    </DashboardLayout>
  )
}
