"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Users, 
  Package, 
  Plus, 
  Trash2, 
  Edit, 
  UserPlus, 
  PackagePlus, 
  Settings,
  LogOut,
  Building2,
  Phone,
  Mail,
  MapPin,
  ShoppingCart,
  DollarSign,
  Calculator
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-layout";
import { AdminManagement } from "@/components/admin-management";
import { UserManagement } from "@/components/user-management";
import { ProductManagement } from "@/components/product-management";





export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [systemProducts, setSystemProducts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showProductManagement, setShowProductManagement] = useState(false);
  const [showAdminManagement, setShowAdminManagement] = useState(false);
  const [showUserManagement, setShowUserManagement] = useState(false);
  
  // Form states
  const [newUser, setNewUser] = useState({ name: "", mobile: "", email: "", address: "" });
  const [newProduct, setNewProduct] = useState({ name: "", quantity: 1, amount: 0, tax: 0 });
  const [newSystemProduct, setNewSystemProduct] = useState({ name: "", quantity: 0, amount: 0, tax: 0 });
  const [selectedProduct, setSelectedProduct] = useState("");
  const [productQuantity, setProductQuantity] = useState(1);
  
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/");
      return;
    }

    // Load demo data
    setUsers([
      {
        id: "1",
        name: "John Doe",
        mobile: "+1 234-567-8900",
        email: "john@example.com",
        address: "123 Main St, City, State",
        products: []
      },
      {
        id: "2",
        name: "Jane Smith",
        mobile: "+1 234-567-8901",
        email: "jane@example.com",
        address: "456 Oak Ave, City, State",
        products: []
      }
    ]);

    setSystemProducts([
      {
        id: "1",
        name: "iPhone Screen",
        availableQuantity: 50,
        amount: 150,
        tax: 10
      },
      {
        id: "2",
        name: "Battery Replacement",
        availableQuantity: 30,
        amount: 80,
        tax: 8
      },
      {
        id: "3",
        name: "Charging Port",
        availableQuantity: 25,
        amount: 45,
        tax: 5
      }
    ]);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    router.push("/");
    toast.success("Logged out successfully");
  };

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
      products: []
    };

    setUsers([...users, user]);
    setNewUser({ name: "", mobile: "", email: "", address: "" });
    setShowAddUser(false);
    toast.success("User added successfully");
  };

  const deleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
    toast.success("User deleted successfully");
  };

  const addProductToUser = () => {
    if (!selectedProduct || productQuantity <= 0) {
      toast.error("Please select a product and enter quantity");
      return;
    }

    const product = systemProducts.find(p => p.id === selectedProduct);
    if (!product) return;

    if (product.availableQuantity < productQuantity) {
      toast.error("Insufficient stock available");
      return;
    }

    const total = (product.amount * productQuantity) + (product.tax * productQuantity);
    const userProduct = {
      id: Date.now().toString(),
      name: product.name,
      quantity: productQuantity,
      amount: product.amount,
      tax: product.tax,
      total
    };

    const updatedUsers = users.map(user => {
      if (user.id === selectedUser?.id) {
        return {
          ...user,
          products: [...user.products, userProduct]
        };
      }
      return user;
    });

    setUsers(updatedUsers);
    
    // Update system product quantity
    const updatedSystemProducts = systemProducts.map(p => {
      if (p.id === selectedProduct) {
        return { ...p, availableQuantity: p.availableQuantity - productQuantity };
      }
      return p;
    });
    setSystemProducts(updatedSystemProducts);

    setSelectedProduct("");
    setProductQuantity(1);
    setShowAddProduct(false);
    toast.success("Product added successfully");
  };

  const deleteProductFromUser = (userId, productId) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          products: user.products.filter(p => p.id !== productId)
        };
      }
      return user;
    });
    setUsers(updatedUsers);
    toast.success("Product removed successfully");
  };

  const addSystemProduct = () => {
    if (!newSystemProduct.name || newSystemProduct.quantity <= 0 || newSystemProduct.amount <= 0) {
      toast.error("Please fill all required fields");
      return;
    }

    const product = {
      id: Date.now().toString(),
      name: newSystemProduct.name,
      availableQuantity: newSystemProduct.quantity,
      amount: newSystemProduct.amount,
      tax: newSystemProduct.tax
    };

    setSystemProducts([...systemProducts, product]);
    setNewSystemProduct({ name: "", quantity: 0, amount: 0, tax: 0 });
    setShowProductManagement(false);
    toast.success("Product added to system successfully");
  };

  const deleteSystemProduct = (productId) => {
    setSystemProducts(systemProducts.filter(p => p.id !== productId));
    toast.success("Product deleted successfully");
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Main Content */}
        <main className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
            <p className="text-gray-600">Manage users and their products</p>
          </div>
          <Button onClick={() => setShowAddUser(true)}>
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
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
                  <div className="flex flex-col space-y-1 flex-shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedUser(user);
                        setShowAddProduct(true);
                      }}
                      className="text-xs h-7 px-2"
                    >
                      <PackagePlus className="w-3 h-3 mr-1" />
                      Add Product
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteUser(user.id)}
                      className="text-xs h-7 px-2"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Products ({user.products.length})</span>
                    <Badge variant="secondary">
                      Total: ₹{user.products.reduce((sum, p) => sum + p.total, 0).toFixed(2)}
                    </Badge>
                  </div>
                  {user.products.length > 0 ? (
                    <div className="space-y-2">
                      {user.products.map((product) => (
                        <div key={product.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{product.name}</p>
                            <p className="text-xs text-gray-500">
                              Qty: {product.quantity} × ₹{product.amount} + Tax: ₹{product.tax}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2 flex-shrink-0">
                            <span className="text-sm font-bold">₹{product.total.toFixed(2)}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteProductFromUser(user.id, product.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-4">No products added yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Add User Dialog */}
      <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>Enter user details to add them to the system.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                placeholder="Enter user name"
              />
            </div>
            <div>
              <Label htmlFor="mobile">Mobile *</Label>
              <Input
                id="mobile"
                value={newUser.mobile}
                onChange={(e) => setNewUser({ ...newUser, mobile: e.target.value })}
                placeholder="Enter mobile number"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="Enter email address (optional)"
              />
            </div>
            <div>
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
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

      {/* Add Product Dialog */}
      <Dialog open={showAddProduct} onOpenChange={setShowAddProduct}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Product to {selectedUser?.name}</DialogTitle>
            <DialogDescription>Select a product and quantity to add to this user.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="product">Product *</Label>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent>
                  {systemProducts.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name} - ₹{product.amount} (Stock: {product.availableQuantity})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="quantity">Quantity *</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={productQuantity}
                onChange={(e) => setProductQuantity(parseInt(e.target.value) || 1)}
                placeholder="Enter quantity"
              />
            </div>
            {selectedProduct && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Amount:</span>
                  <span className="text-lg font-bold text-blue-600">
                    ₹{(() => {
                      const product = systemProducts.find(p => p.id === selectedProduct);
                      if (!product) return "0.00";
                      const total = (product.amount * productQuantity) + (product.tax * productQuantity);
                      return total.toFixed(2);
                    })()}
                  </span>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddProduct(false)}>Cancel</Button>
            <Button onClick={addProductToUser}>Add Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Product Management Dialog */}
      <Dialog open={showProductManagement} onOpenChange={setShowProductManagement}>
        <DialogContent className="max-w-6xl max-h-[85vh] p-0">
          <div className="flex flex-col h-full">
            <DialogHeader className="px-6 py-4 border-b bg-gray-50">
              <DialogTitle className="text-2xl">Product Management</DialogTitle>
              <DialogDescription>Manage system products and their inventory.</DialogDescription>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto p-6">
              <ProductManagement />
            </div>
            <DialogFooter className="px-6 py-4 border-t bg-gray-50">
              <Button variant="outline" onClick={() => setShowProductManagement(false)}>Close</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Admin Management Dialog */}
      <Dialog open={showAdminManagement} onOpenChange={setShowAdminManagement}>
        <DialogContent className="max-w-6xl max-h-[85vh] p-0">
          <div className="flex flex-col h-full">
            <DialogHeader className="px-6 py-4 border-b bg-gray-50">
              <DialogTitle className="text-2xl">Admin Management</DialogTitle>
              <DialogDescription>Manage admin accounts and permissions.</DialogDescription>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto p-4">
              <AdminManagement />
            </div>
            <DialogFooter className="px-6 py-4 border-t bg-gray-50">
              <Button variant="outline" onClick={() => setShowAdminManagement(false)}>Close</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* User Management Dialog */}
      <Dialog open={showUserManagement} onOpenChange={setShowUserManagement}>
        <DialogContent className="max-w-6xl max-h-[85vh] p-0">
          <div className="flex flex-col h-full">
            <DialogHeader className="px-6 py-4 border-b bg-gray-50">
              <DialogTitle className="text-2xl">User Management</DialogTitle>
              <DialogDescription>Manage all users in the system.</DialogDescription>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto p-6">
              <UserManagement />
            </div>
            <DialogFooter className="px-6 py-4 border-t bg-gray-50">
              <Button variant="outline" onClick={() => setShowUserManagement(false)}>Close</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
        </div>
      </DashboardLayout>
  );
}
