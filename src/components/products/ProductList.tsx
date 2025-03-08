
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, RefreshCw, Eye } from "lucide-react";

interface ProductListProps {
  filter: "all" | "synced" | "unsynced" | "issues";
  searchQuery: string;
}

// Mock data - This would come from your Gadget.dev API in a real implementation
const mockProducts = [
  { id: "1", title: "Eau de Parfum - Floral", status: "synced", sku: "EDP-FL-001", variants: 3, updatedAt: "2023-10-01" },
  { id: "2", title: "Moisturizing Cream - Sensitive Skin", status: "synced", sku: "MC-SS-001", variants: 2, updatedAt: "2023-10-02" },
  { id: "3", title: "Lip Balm - Cherry", status: "issues", sku: "LB-CH-001", variants: 4, updatedAt: "2023-10-03" },
  { id: "4", title: "Eye Shadow Palette - Sunset", status: "unsynced", sku: "ESP-SUN-001", variants: 1, updatedAt: "2023-10-04" },
  { id: "5", title: "Face Mask - Hydrating", status: "synced", sku: "FM-HYD-001", variants: 2, updatedAt: "2023-10-05" },
];

const ProductList: React.FC<ProductListProps> = ({ filter, searchQuery }) => {
  // Filter products based on the selected filter and search query
  const filteredProducts = mockProducts
    .filter(product => 
      filter === "all" || product.status === filter
    )
    .filter(product => 
      searchQuery === "" || 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "synced":
        return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" /> Synced</Badge>;
      case "unsynced":
        return <Badge variant="outline"><RefreshCw className="w-3 h-3 mr-1" /> Unsynced</Badge>;
      case "issues":
        return <Badge variant="destructive"><AlertCircle className="w-3 h-3 mr-1" /> Issues</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div>
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found.</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Variants</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.title}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{product.variants}</TableCell>
                <TableCell>{getStatusBadge(product.status)}</TableCell>
                <TableCell>{product.updatedAt}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ProductList;
