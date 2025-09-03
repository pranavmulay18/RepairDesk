"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Users, 
  UserPlus, 
  Edit, 
  Trash2, 
  Lock, 
  Mail, 
  Shield, 
  Eye, 
  EyeOff,
  AlertTriangle
} from "lucide-react";
import { toast } from "sonner";



export function AdminManagement() {
  const [admins, setAdmins] = useState([]);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [showEditAdmin, setShowEditAdmin] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  
  // Form states
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "admin"
  });
  
  const [editAdmin, setEditAdmin] = useState({
    name: "",
    email: "",
    role: "admin"
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const [deletePassword, setDeletePassword] = useState("");
  const [showPasswords, setShowPasswords] = useState({
    new: false,
    confirm: false,
    current: false,
    delete: false
  });

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
    ]);
  }, []);

  const addAdmin = () => {
    if (!newAdmin.name || !newAdmin.email || !newAdmin.password) {
      toast.error("Please fill all required fields");
      return;
    }

    if (newAdmin.password !== newAdmin.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newAdmin.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    const admin = {
      id: Date.now().toString(),
      name: newAdmin.name,
      email: newAdmin.email,
      role: newAdmin.role,
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setAdmins([...admins, admin]);
    setNewAdmin({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "admin"
    });
    setShowAddAdmin(false);
    toast.success("Admin added successfully");
  };

  const editAdminDetails = () => {
    if (!editAdmin.name || !editAdmin.email) {
      toast.error("Please fill all required fields");
      return;
    }

    const updatedAdmins = admins.map(admin => {
      if (admin.id === selectedAdmin?.id) {
        return {
          ...admin,
          name: editAdmin.name,
          email: editAdmin.email,
          role: editAdmin.role
        };
      }
      return admin;
    });

    setAdmins(updatedAdmins);
    setShowEditAdmin(false);
    setSelectedAdmin(null);
    toast.success("Admin details updated successfully");
  };

  const changePassword = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error("Please fill all password fields");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long");
      return;
    }

    // In a real app, you would verify the current password with the backend
    if (passwordData.currentPassword !== "admin123") {
      toast.error("Current password is incorrect");
      return;
    }

    setShowChangePassword(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    toast.success("Password changed successfully");
  };

  const deleteAdmin = () => {
    if (!deletePassword) {
      toast.error("Please enter your password to confirm deletion");
      return;
    }

    // In a real app, you would verify the password with the backend
    if (deletePassword !== "admin123") {
      toast.error("Incorrect password");
      return;
    }

    if (selectedAdmin) {
      setAdmins(admins.filter(admin => admin.id !== selectedAdmin.id));
      setShowDeleteConfirm(false);
      setSelectedAdmin(null);
      setDeletePassword("");
      toast.success("Admin deleted successfully");
    }
  };

  const toggleAdminStatus = (adminId) => {
    const updatedAdmins = admins.map(admin => {
      if (admin.id === adminId) {
        return { ...admin, isActive: !admin.isActive };
      }
      return admin;
    });
    setAdmins(updatedAdmins);
    toast.success("Admin status updated");
  };

  const openEditDialog = (admin) => {
    setSelectedAdmin(admin);
    setEditAdmin({
      name: admin.name,
      email: admin.email,
      role: admin.role
    });
    setShowEditAdmin(true);
  };

  const openDeleteDialog = (admin) => {
    setSelectedAdmin(admin);
    setShowDeleteConfirm(true);
  };

  const openChangePasswordDialog = (admin) => {
    setSelectedAdmin(admin);
    setShowChangePassword(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Admin Accounts</h2>
          <p className="text-sm text-gray-600">Manage admin accounts and permissions</p>
        </div>
        <Button size="sm" onClick={() => setShowAddAdmin(true)}>
          <UserPlus className="w-4 h-4 mr-2" />
          Add Admin
        </Button>
      </div>

      {/* Admins Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {admins.map((admin) => (
                      <Card key={admin.id} className="hover:shadow-lg transition-shadow min-h-0">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="flex items-center space-x-2 text-sm">
                      <Shield className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span className="truncate">{admin.name}</span>
                    </CardTitle>
                    <CardDescription className="flex items-center space-x-2 mt-1">
                      <Mail className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate text-xs">{admin.email}</span>
                    </CardDescription>
                  </div>
                  <div className="flex flex-col items-end space-y-1 flex-shrink-0">
                    <Badge variant={admin.role === "super_admin" ? "default" : "secondary"} className="text-xs px-1 py-0.5">
                      {admin.role === "super_admin" ? "Super" : "Admin"}
                    </Badge>
                    <Badge variant={admin.isActive ? "default" : "destructive"} className="text-xs px-1 py-0.5">
                      {admin.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <p className="text-xs text-gray-500">Created: {admin.createdAt}</p>
                  <div className="grid grid-cols-2 gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEditDialog(admin)}
                      className="text-xs h-7 px-1"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openChangePasswordDialog(admin)}
                      className="text-xs h-7 px-1"
                    >
                      <Lock className="w-3 h-3 mr-1" />
                      Pass
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleAdminStatus(admin.id)}
                      className="text-xs h-7 px-1"
                    >
                      {admin.isActive ? "Deactivate" : "Activate"}
                    </Button>
                    {admin.role !== "super_admin" && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => openDeleteDialog(admin)}
                        className="text-xs h-7 px-1"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
        ))}
      </div>

      {/* Add Admin Dialog */}
      <Dialog open={showAddAdmin} onOpenChange={setShowAddAdmin}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Admin</DialogTitle>
            <DialogDescription>Create a new admin account with appropriate permissions.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="adminName">Name *</Label>
              <Input
                id="adminName"
                value={newAdmin.name}
                onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                placeholder="Enter admin name"
              />
            </div>
            <div>
              <Label htmlFor="adminEmail">Email *</Label>
              <Input
                id="adminEmail"
                type="email"
                value={newAdmin.email}
                onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                placeholder="Enter email address"
              />
            </div>
            <div>
              <Label htmlFor="adminRole">Role *</Label>
              <select
                id="adminRole"
                value={newAdmin.role}
                onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </div>
            <div>
              <Label htmlFor="adminPassword">Password *</Label>
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
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                >
                  {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="adminConfirmPassword">Confirm Password *</Label>
              <div className="relative">
                <Input
                  id="adminConfirmPassword"
                  type={showPasswords.confirm ? "text" : "password"}
                  value={newAdmin.confirmPassword}
                  onChange={(e) => setNewAdmin({ ...newAdmin, confirmPassword: e.target.value })}
                  placeholder="Confirm password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                >
                  {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddAdmin(false)}>Cancel</Button>
            <Button onClick={addAdmin}>Add Admin</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Admin Dialog */}
      <Dialog open={showEditAdmin} onOpenChange={setShowEditAdmin}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Admin: {selectedAdmin?.name}</DialogTitle>
            <DialogDescription>Update admin details and permissions.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="editName">Name *</Label>
              <Input
                id="editName"
                value={editAdmin.name}
                onChange={(e) => setEditAdmin({ ...editAdmin, name: e.target.value })}
                placeholder="Enter admin name"
              />
            </div>
            <div>
              <Label htmlFor="editEmail">Email *</Label>
              <Input
                id="editEmail"
                type="email"
                value={editAdmin.email}
                onChange={(e) => setEditAdmin({ ...editAdmin, email: e.target.value })}
                placeholder="Enter email address"
              />
            </div>
            <div>
              <Label htmlFor="editRole">Role *</Label>
              <select
                id="editRole"
                value={editAdmin.role}
                onChange={(e) => setEditAdmin({ ...editAdmin, role: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditAdmin(false)}>Cancel</Button>
            <Button onClick={editAdminDetails}>Update Admin</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={showChangePassword} onOpenChange={setShowChangePassword}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password: {selectedAdmin?.name}</DialogTitle>
            <DialogDescription>Update the admin's password securely.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">Current Password *</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showPasswords.current ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  placeholder="Enter current password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                >
                  {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="newPassword">New Password *</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPasswords.new ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  placeholder="Enter new password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                >
                  {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="confirmNewPassword">Confirm New Password *</Label>
              <div className="relative">
                <Input
                  id="confirmNewPassword"
                  type={showPasswords.confirm ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  placeholder="Confirm new password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                >
                  {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowChangePassword(false)}>Cancel</Button>
            <Button onClick={changePassword}>Change Password</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span>Delete Admin</span>
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedAdmin?.name}? This action cannot be undone.
              Please enter your password to confirm.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="deletePassword">Your Password *</Label>
              <div className="relative">
                <Input
                  id="deletePassword"
                  type={showPasswords.delete ? "text" : "password"}
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  placeholder="Enter your password to confirm"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPasswords({ ...showPasswords, delete: !showPasswords.delete })}
                >
                  {showPasswords.delete ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
            <Button variant="destructive" onClick={deleteAdmin}>Delete Admin</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

