"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  PackagePlus, 
  Edit, 
  Trash2, 
  DollarSign,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  AlertTriangle
} from "lucide-react";
import { toast } from "sonner";



export function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Form states
  const [newProduct, setNewProduct] = useState({
    name: "",
    quantity: 0,
    amount: 0,
    tax: 0
  });
  
  const [editProduct, setEditProduct] = useState({
    name: "",
    quantity: 0,
    amount: 0,
    tax: 0
  });

  useEffect(() => {
    // Load demo product data
    const demoProducts = [
      {
        id: "1",
        name: "iPhone Screen",
        availableQuantity: 50,
        amount: 150,
        tax: 10,
        createdAt: "2024-01-15",
        totalSold: 25,
        totalRevenue: 4000
      },
      {
        id: "2",
        name: "Battery Replacement",
        availableQuantity: 30,
        amount: 80,
        tax: 8,
        createdAt: "2024-02-20",
        totalSold: 15,
        totalRevenue: 1320
      },
      {
        id: "3",
        name: "Charging Port",
        availableQuantity: 25,
        amount: 45,
        tax: 5,
        createdAt: "2024-03-10",
        totalSold: 10,
        totalRevenue: 500
      },
      {
        id: "4",
        name: "Camera Module",
        availableQuantity: 20,
        amount: 120,
        tax: 12,
        createdAt: "2024-03-25",
        totalSold: 8,
        totalRevenue: 1056
      }
    ];
    setProducts(demoProducts);
    setFilteredProducts(demoProducts);
  }, []);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const addProduct = () => {
    if (!newProduct.name || newProduct.quantity <= 0 || newProduct.amount <= 0) {
      toast.error("Please fill all required fields");
      return;
    }

    const product = {
      id: Date.now().toString(),
      name: newProduct.name,
      availableQuantity: newProduct.quantity,
      amount: newProduct.amount,
      tax: newProduct.tax,
      createdAt: new Date().toISOString().split('T')[0],
      totalSold: 0,
      totalRevenue: 0
    };

    setProducts([...products, product]);
    setNewProduct({ name: "", quantity: 0, amount: 0, tax: 0 });
    setShowAddProduct(false);
    toast.success("Product added successfully");
  };

  const editProductDetails = () => {
    if (!editProduct.name || editProduct.quantity < 0 || editProduct.amount <= 0) {
      toast.error("Please fill all required fields");
      return;
    }

    const updatedProducts = products.map(product => {
      if (product.id === selectedProduct?.id) {
        return {
          ...product,
          name: editProduct.name,
          availableQuantity: editProduct.quantity,
          amount: editProduct.amount,
          tax: editProduct.tax
        };
      }
      return product;
    });

    setProducts(updatedProducts);
    setShowEditProduct(false);
    setSelectedProduct(null);
    toast.success("Product updated successfully");
  };

  const deleteProduct = () => {
    if (selectedProduct) {
      setProducts(products.filter(product => product.id !== selectedProduct.id));
      setShowDeleteConfirm(false);
      setSelectedProduct(null);
      toast.success("Product deleted successfully");
    }
  };

  const openEditDialog = (product) => {
    setSelectedProduct(product);
    setEditProduct({
      name: product.name,
      quantity: product.availableQuantity,
      amount: product.amount,
      tax: product.tax
    });
    setShowEditProduct(true);
  };

  const openDeleteDialog = (product) => {
    setSelectedProduct(product);
    setShowDeleteConfirm(true);
  };

  const getStockStatus = (quantity) => {
    if (quantity === 0) return { status: "Out of Stock", color: "destructive" };
    if (quantity <= 5) return { status: "Low Stock", color: "default" };
    return { status: "In Stock", color: "secondary" };
  };

  const getRevenueTrend = (product) => {
    const avgRevenue = product.totalRevenue / (product.totalSold || 1);
    const currentPrice = product.amount + product.tax;
    if (currentPrice > avgRevenue) return "up";
    if (currentPrice < avgRevenue) return "down";
    return "stable";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Product Inventory</h2>
          <p className="text-gray-600">Manage system products and inventory</p>
        </div>
        <Button onClick={() => setShowAddProduct(true)}>
          <PackagePlus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search products by name..."
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

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredProducts.map((product) => {
          const stockStatus = getStockStatus(product.availableQuantity);
          const revenueTrend = getRevenueTrend(product);
          
          return (
            <Card key={product.id} className="hover:shadow-lg transition-shadow min-h-0">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="flex items-center space-x-2 text-sm">
                      <Package className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span className="truncate">{product.name}</span>
                    </CardTitle>
                    <CardDescription className="flex items-center space-x-2 mt-1">
                      <DollarSign className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate text-xs">₹{product.amount} + ₹{product.tax} tax</span>
                    </CardDescription>
                  </div>
                  <div className="flex flex-col items-end space-y-1 flex-shrink-0">
                    <Badge variant={stockStatus.color} className="text-xs px-1 py-0.5">
                      {stockStatus.status}
                    </Badge>
                    <Badge variant="outline" className="text-xs px-1 py-0.5">
                      {product.availableQuantity} in stock
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-gray-500">Total Sold</p>
                      <p className="font-medium">{product.totalSold}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Revenue</p>
                      <p className="font-medium">₹{product.totalRevenue.toFixed(2)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Created: {product.createdAt}</span>
                    {revenueTrend !== "stable" && (
                      <div className="flex items-center space-x-1">
                        {revenueTrend === "up" ? (
                          <TrendingUp className="w-3 h-3 text-green-600" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-red-600" />
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEditDialog(product)}
                      className="text-xs h-7 px-2"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => openDeleteDialog(product)}
                      className="text-xs h-7 px-2"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">
            {searchTerm ? "Try adjusting your search terms" : "Get started by adding your first product"}
          </p>
        </div>
      )}

      {/* Add Product Dialog */}
      <Dialog open={showAddProduct} onOpenChange={setShowAddProduct}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>Create a new product for the system inventory.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="productName">Product Name *</Label>
              <Input
                id="productName"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                placeholder="Enter product name"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="productQuantity">Available Quantity *</Label>
                <Input
                  id="productQuantity"
                  type="number"
                  min="0"
                  value={newProduct.quantity}
                  onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) || 0 })}
                  placeholder="Enter quantity"
                />
              </div>
              <div>
                <Label htmlFor="productAmount">Amount *</Label>
                <Input
                  id="productAmount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={newProduct.amount}
                  onChange={(e) => setNewProduct({ ...newProduct, amount: parseFloat(e.target.value) || 0 })}
                  placeholder="Enter amount"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="productTax">Tax</Label>
              <Input
                id="productTax"
                type="number"
                min="0"
                step="0.01"
                value={newProduct.tax}
                onChange={(e) => setNewProduct({ ...newProduct, tax: parseFloat(e.target.value) || 0 })}
                placeholder="Enter tax amount"
              />
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Price:</span>
                <span className="text-lg font-bold text-blue-600">
                  ₹{(newProduct.amount + newProduct.tax).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddProduct(false)}>Cancel</Button>
            <Button onClick={addProduct}>Add Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={showEditProduct} onOpenChange={setShowEditProduct}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product: {selectedProduct?.name}</DialogTitle>
            <DialogDescription>Update product details and pricing.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="editProductName">Product Name *</Label>
              <Input
                id="editProductName"
                value={editProduct.name}
                onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                placeholder="Enter product name"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="editProductQuantity">Available Quantity *</Label>
                <Input
                  id="editProductQuantity"
                  type="number"
                  min="0"
                  value={editProduct.quantity}
                  onChange={(e) => setEditProduct({ ...editProduct, quantity: parseInt(e.target.value) || 0 })}
                  placeholder="Enter quantity"
                />
              </div>
              <div>
                <Label htmlFor="editProductAmount">Amount *</Label>
                <Input
                  id="editProductAmount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={editProduct.amount}
                  onChange={(e) => setEditProduct({ ...editProduct, amount: parseFloat(e.target.value) || 0 })}
                  placeholder="Enter amount"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="editProductTax">Tax</Label>
              <Input
                id="editProductTax"
                type="number"
                min="0"
                step="0.01"
                value={editProduct.tax}
                onChange={(e) => setEditProduct({ ...editProduct, tax: parseFloat(e.target.value) || 0 })}
                placeholder="Enter tax amount"
              />
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Price:</span>
                <span className="text-lg font-bold text-blue-600">
                  ₹{(editProduct.amount + editProduct.tax).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditProduct(false)}>Cancel</Button>
            <Button onClick={editProductDetails}>Update Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span>Delete Product</span>
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedProduct?.name}? This action cannot be undone.
              All associated data and inventory will be permanently removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
            <Button variant="destructive" onClick={deleteProduct}>Delete Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
