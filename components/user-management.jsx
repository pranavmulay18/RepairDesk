"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  UserPlus, 
  Edit, 
  Trash2, 
  Mail, 
  Phone, 
  MapPin,
  Search,
  Filter
} from "lucide-react";
import { toast } from "sonner";



export function UserManagement() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Form states
  const [newUser, setNewUser] = useState({
    name: "",
    mobile: "",
    email: "",
    address: ""
  });
  
  const [editUser, setEditUser] = useState({
    name: "",
    mobile: "",
    email: "",
    address: ""
  });

  useEffect(() => {
    // Load demo user data
    const demoUsers = [
      {
        id: "1",
        name: "John Doe",
        mobile: "+1 234-567-8900",
        email: "john@example.com",
        address: "123 Main St, City, State",
        createdAt: "2024-01-15",
        totalProducts: 3,
        totalAmount: 450.00
      },
      {
        id: "2",
        name: "Jane Smith",
        mobile: "+1 234-567-8901",
        email: "jane@example.com",
        address: "456 Oak Ave, City, State",
        createdAt: "2024-02-20",
        totalProducts: 2,
        totalAmount: 280.00
      },
      {
        id: "3",
        name: "Mike Johnson",
        mobile: "+1 234-567-8902",
        address: "789 Pine Rd, City, State",
        createdAt: "2024-03-10",
        totalProducts: 1,
        totalAmount: 150.00
      },
      {
        id: "4",
        name: "Sarah Wilson",
        mobile: "+1 234-567-8903",
        email: "sarah@example.com",
        address: "321 Elm St, City, State",
        createdAt: "2024-03-25",
        totalProducts: 0,
        totalAmount: 0.00
      }
    ];
    setUsers(demoUsers);
    setFilteredUsers(demoUsers);
  }, []);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.mobile.includes(searchTerm) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const addUser = () => {
    if (!newUser.name || !newUser.mobile || !newUser.address) {
      toast.error("Please fill all required fields");
      return;
    }

    const user = {
      id: Date.now().toString(),
      name: newUser.name,
      mobile: newUser.mobile,
      email: newUser.email || undefined,
      address: newUser.address,
      createdAt: new Date().toISOString().split('T')[0],
      totalProducts: 0,
      totalAmount: 0.00
    };

    setUsers([...users, user]);
    setNewUser({ name: "", mobile: "", email: "", address: "" });
    setShowAddUser(false);
    toast.success("User added successfully");
  };

  const editUserDetails = () => {
    if (!editUser.name || !editUser.mobile || !editUser.address) {
      toast.error("Please fill all required fields");
      return;
    }

    const updatedUsers = users.map(user => {
      if (user.id === selectedUser?.id) {
        return {
          ...user,
          name: editUser.name,
          mobile: editUser.mobile,
          email: editUser.email || undefined,
          address: editUser.address
        };
      }
      return user;
    });

    setUsers(updatedUsers);
    setShowEditUser(false);
    setSelectedUser(null);
    toast.success("User details updated successfully");
  };

  const deleteUser = () => {
    if (selectedUser) {
      setUsers(users.filter(user => user.id !== selectedUser.id));
      setShowDeleteConfirm(false);
      setSelectedUser(null);
      toast.success("User deleted successfully");
    }
  };

  const openEditDialog = (user) => {
    setSelectedUser(user);
    setEditUser({
      name: user.name,
      mobile: user.mobile,
      email: user.email || "",
      address: user.address
    });
    setShowEditUser(true);
  };

  const openDeleteDialog = (user) => {
    setSelectedUser(user);
    setShowDeleteConfirm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">User Accounts</h2>
          <p className="text-gray-600">Manage all users in the system</p>
        </div>
        <Button onClick={() => setShowAddUser(true)}>
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search users by name, mobile, email, or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="hover:shadow-lg transition-shadow min-h-0">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1 min-w-0">
                  <CardTitle className="flex items-center space-x-2 text-sm">
                    <Users className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="truncate">{user.name}</span>
                  </CardTitle>
                  <CardDescription className="flex items-center space-x-2 mt-1">
                    <Phone className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate text-xs">{user.mobile}</span>
                  </CardDescription>
                  {user.email && (
                    <CardDescription className="flex items-center space-x-2 mt-1">
                      <Mail className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate text-xs">{user.email}</span>
                    </CardDescription>
                  )}
                  <CardDescription className="flex items-center space-x-2 mt-1">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate text-xs">{user.address}</span>
                  </CardDescription>
                </div>
                <div className="flex flex-col items-end space-y-1 flex-shrink-0">
                  <Badge variant="secondary" className="text-xs px-1 py-0.5">
                    {user.totalProducts} Products
                  </Badge>
                  <Badge variant="outline" className="text-xs px-1 py-0.5">
                    ₹{user.totalAmount.toFixed(2)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <p className="text-xs text-gray-500">Created: {user.createdAt}</p>
                <div className="flex flex-wrap gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openEditDialog(user)}
                    className="text-xs h-7 px-2"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => openDeleteDialog(user)}
                    className="text-xs h-7 px-2"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-600">
            {searchTerm ? "Try adjusting your search terms" : "Get started by adding your first user"}
          </p>
        </div>
      )}

      {/* Add User Dialog */}
      <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>Enter user details to add them to the system.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="userName">Name *</Label>
              <Input
                id="userName"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                placeholder="Enter user name"
              />
            </div>
            <div>
              <Label htmlFor="userMobile">Mobile *</Label>
              <Input
                id="userMobile"
                value={newUser.mobile}
                onChange={(e) => setNewUser({ ...newUser, mobile: e.target.value })}
                placeholder="Enter mobile number"
              />
            </div>
            <div>
              <Label htmlFor="userEmail">Email</Label>
              <Input
                id="userEmail"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="Enter email address (optional)"
              />
            </div>
            <div>
              <Label htmlFor="userAddress">Address *</Label>
              <Input
                id="userAddress"
                value={newUser.address}
                onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                placeholder="Enter address"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddUser(false)}>Cancel</Button>
            <Button onClick={addUser}>Add User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={showEditUser} onOpenChange={setShowEditUser}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User: {selectedUser?.name}</DialogTitle>
            <DialogDescription>Update user details and information.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="editUserName">Name *</Label>
              <Input
                id="editUserName"
                value={editUser.name}
                onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                placeholder="Enter user name"
              />
            </div>
            <div>
              <Label htmlFor="editUserMobile">Mobile *</Label>
              <Input
                id="editUserMobile"
                value={editUser.mobile}
                onChange={(e) => setEditUser({ ...editUser, mobile: e.target.value })}
                placeholder="Enter mobile number"
              />
            </div>
            <div>
              <Label htmlFor="editUserEmail">Email</Label>
              <Input
                id="editUserEmail"
                type="email"
                value={editUser.email}
                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                placeholder="Enter email address (optional)"
              />
            </div>
            <div>
              <Label htmlFor="editUserAddress">Address *</Label>
              <Input
                id="editUserAddress"
                value={editUser.address}
                onChange={(e) => setEditUser({ ...editUser, address: e.target.value })}
                placeholder="Enter address"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditUser(false)}>Cancel</Button>
            <Button onClick={editUserDetails}>Update User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Trash2 className="w-5 h-5 text-red-600" />
              <span>Delete User</span>
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedUser?.name}? This action cannot be undone.
              All associated products and data will also be removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
            <Button variant="destructive" onClick={deleteUser}>Delete User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

