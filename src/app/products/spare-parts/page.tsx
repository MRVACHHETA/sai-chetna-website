"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash, ImagePlus, Wand2, Search, RefreshCcw, Loader2, PlusCircle } from "lucide-react";
import Image from 'next/image'; // Added for Next.js Image component

interface SparePart {
  _id: string;
  name: string;
  model: string;
  quantity: number;
  price: number;
  status: "in-stock" | "out-of-stock";
  imageUrl?: string;
  description?: string;
}

export default function SparePartsPage() {
  const [parts, setParts] = useState<SparePart[]>([]);
  const [role, setRole] = useState("");
  const [search, setSearch] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedPart, setSelectedPart] = useState<SparePart | null>(null);
  const [newPart, setNewPart] = useState<Omit<SparePart, "_id" | "status">>({
    name: "",
    model: "",
    quantity: 0,
    price: 0,
    imageUrl: "",
    description: "",
  });
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchParts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/spare-parts");
      const data: SparePart[] = await res.json(); // Explicitly type data as SparePart[]
      const processedData = data.map((part) => ({ // 'part' is now implicitly SparePart
        ...part,
        // Fix for 'no-explicit-any': Cast to 'unknown as string' for safety before parsing
        price: parseFloat(part.price as unknown as string) || 0,
        quantity: parseInt(part.quantity as unknown as string) || 0,
      }));
      setParts(processedData);
    } catch (error) {
      console.error("Failed to fetch spare parts:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchParts();

    const userData = typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {};
    setRole(userData?.role || "");
  }, [fetchParts]);

  const deletePart = async (id: string) => {
    if (!confirm("Are you sure to delete this part?")) return;
    setActionLoading(id);
    try {
      const res = await fetch(`/api/spare-parts/${id}`, { method: "DELETE" });
      if (res.ok) {
        setParts((prev) => prev.filter((p) => p._id !== id));
      } else {
        const error = await res.text();
        alert("Failed to delete: " + error);
      }
    } catch (error) {
      console.error("Error deleting part:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const toggleStock = async (id: string, currentStatus: string) => {
    setActionLoading(id);
    const newStatus = currentStatus === "in-stock" ? "out-of-stock" : "in-stock";
    try {
      const res = await fetch(`/api/spare-parts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setParts((prev) =>
          prev.map((p) => (p._id === id ? { ...p, status: newStatus as "in-stock" | "out-of-stock" } : p))
        );
      } else {
        const error = await res.text();
        alert("Failed to update status: " + error);
      }
    } catch (error) {
      console.error("Error toggling stock:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setNewPart((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading("add");
    try {
      const res = await fetch("/api/spare-parts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newPart, status: "in-stock" }),
      });

      if (!res.ok) {
        const error = await res.text();
        return alert("Failed to add: " + error);
      }

      const saved: SparePart = await res.json(); // Explicitly type saved
      setParts((prev) => [
        ...prev,
        {
          ...saved,
          // Fix for 'no-explicit-any': Cast to 'unknown as string' for safety before parsing
          price: parseFloat(saved.price as unknown as string) || 0,
          quantity: parseInt(saved.quantity as unknown as string) || 0,
        },
      ]);
      setAddModalOpen(false);
      setNewPart({ name: "", model: "", quantity: 0, price: 0, imageUrl: "", description: "" });
    } catch (error) {
      console.error("Error adding part:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const openEditModal = (part: SparePart) => {
    setSelectedPart(part);
    setEditModalOpen(true);
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setSelectedPart((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [name]: type === "number" ? parseFloat(value) || 0 : value,
      };
    });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPart) return;

    setActionLoading(selectedPart._id);
    const { _id, ...cleaned } = selectedPart;

    try {
      const res = await fetch(`/api/spare-parts/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleaned),
      });

      if (!res.ok) {
        const error = await res.text();
        return alert("Failed to update: " + error);
      }

      const updated: SparePart = await res.json(); // Explicitly type updated
      setParts((prev) =>
        prev.map((p) =>
          p._id === _id
            ? {
                ...updated,
                // Fix for 'no-explicit-any': Cast to 'unknown as string' for safety before parsing
                price: parseFloat(updated.price as unknown as string) || 0,
                quantity: parseInt(updated.quantity as unknown as string) || 0,
              }
            : p
        )
      );
      setEditModalOpen(false);
      setSelectedPart(null);
    } catch (error) {
      console.error("Error updating part:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const filteredParts = parts.filter(
    (part) =>
      part?.name?.toLowerCase().includes(search.toLowerCase()) ||
      part?.model?.toLowerCase().includes(search.toLowerCase()) ||
      part?.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-br from-white to-blue-50 min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-6 text-center sm:text-left drop-shadow-sm">
          Spare Parts Manager
        </h1>

        {/* This div will *always* contain the search bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center mb-6">
          <div className="relative w-full sm:w-auto flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search by name, model, or description..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 w-full shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* This button is only shown for admin/super-admin roles */}
          {(role === "admin" || role === "super-admin") && (
            <Button
              onClick={() => setAddModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-2 shadow-md transition-all duration-200 flex items-center gap-2 group transform active:scale-95 w-full sm:w-auto"
              disabled={actionLoading === "add"}
            >
              {actionLoading === "add" ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <PlusCircle className="group-hover:scale-110 transition-transform duration-200" size={20} />
              )}
              Add New Spare Part
            </Button>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48 text-blue-600">
            <Loader2 className="h-8 w-8 animate-spin mr-2" />
            Loading spare parts...
          </div>
        ) : filteredParts.length === 0 ? (
          <div className="text-center text-gray-500 p-10 border rounded-lg bg-white shadow-sm">
            <p className="text-lg mb-2">No spare parts found.</p>
            {search && <p className="text-sm">Try adjusting your search or adding a new part.</p>}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-100 bg-white">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Image</th>
                  <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Model</th>
                  <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Qty</th>
                  <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredParts.map((part) => (
                  <tr key={part._id} className="border-t hover:bg-blue-50 transition-colors duration-150 ease-in-out">
                    <td className="p-4 whitespace-nowrap">
                      {part.imageUrl ? (
                        // Fix for 'no-img-element' warning: Use Next.js Image component
                        <Image
                          src={part.imageUrl}
                          alt={part.name}
                          width={64} // Corresponds to w-16
                          height={64} // Corresponds to h-16
                          className="w-16 h-16 object-cover rounded-md shadow-sm border border-gray-200"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-xs">No Image</div>
                      )}
                    </td>
                    <td className="p-4 whitespace-nowrap font-medium text-gray-900">{part.name}</td>
                    <td className="p-4 whitespace-nowrap text-gray-700">{part.model}</td>
                    <td className="p-4 whitespace-nowrap text-gray-700">{part.quantity}</td>
                    <td className="p-4 whitespace-nowrap text-gray-700">₹{part.price.toFixed(2)}</td>
                    <td className="p-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                          part.status === "in-stock"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {part.status === "in-stock" ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="p-2 whitespace-nowrap space-x-1">
                      {(role === "admin" || role === "super-admin") && (
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button
                            size="sm"
                            onClick={() => openEditModal(part)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md text-xs sm:text-sm shadow-sm transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-1 w-full sm:w-auto"
                            disabled={actionLoading === part._id}
                          >
                            {actionLoading === part._id ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <Pencil size={14} />
                            )}
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => deletePart(part._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-xs sm:text-sm shadow-sm transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-1 w-full sm:w-auto"
                            disabled={actionLoading === part._id}
                          >
                            {actionLoading === part._id ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <Trash size={14} />
                            )}
                            Delete
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => toggleStock(part._id, part.status)}
                            className={`px-3 py-1.5 rounded-md text-xs sm:text-sm shadow-sm transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-1 w-full sm:w-auto ${
                              part.status === "in-stock"
                                ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                                : "bg-green-500 hover:bg-green-600 text-white"
                            }`}
                            disabled={actionLoading === part._id}
                          >
                            {actionLoading === part._id ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <RefreshCcw size={14} />
                            )}
                            {part.status === "in-stock" ? "Mark Out" : "Mark In"}
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Part Modal */}
      <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
        <DialogContent className="sm:max-w-[425px] p-6 rounded-lg shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-700">Add New Spare Part</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddSubmit} className="space-y-4 pt-4">
            <div>
              <Label htmlFor="addName" className="text-sm font-medium text-gray-700">Name</Label>
              <Input id="addName" name="name" required onChange={handleInputChange} value={newPart.name} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
              <Label htmlFor="addModel" className="text-sm font-medium text-gray-700">Model</Label>
              <Input id="addModel" name="model" required onChange={handleInputChange} value={newPart.model} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
              <Label htmlFor="addQuantity" className="text-sm font-medium text-gray-700">Quantity</Label>
              <Input id="addQuantity" name="quantity" type="number" required onChange={handleInputChange} value={newPart.quantity === 0 ? "" : newPart.quantity} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
              <Label htmlFor="addPrice" className="text-sm font-medium text-gray-700">Price (₹)</Label>
              <Input id="addPrice" name="price" type="number" required onChange={handleInputChange} value={newPart.price === 0 ? "" : newPart.price} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
              <Label htmlFor="addImageUrl" className="text-sm font-medium text-gray-700">Image URL</Label>
              <Input id="addImageUrl" name="imageUrl" onChange={handleInputChange} value={newPart.imageUrl} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
              <Label htmlFor="addDescription" className="text-sm font-medium text-gray-700">Description</Label>
              <Textarea id="addDescription" name="description" rows={3} onChange={handleInputChange} value={newPart.description} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" disabled className="flex items-center gap-1">
                <ImagePlus size={16} /> Upload
              </Button>
              <Button type="button" variant="outline" disabled className="flex items-center gap-1">
                <Wand2 size={16} /> Generate Image
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white rounded-md px-4 py-2 shadow-sm transition-all duration-200 transform active:scale-95 flex items-center gap-1" disabled={actionLoading === "add"}>
                {actionLoading === "add" ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Save Part"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="sm:max-w-[425px] p-6 rounded-lg shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-700">Edit Spare Part</DialogTitle>
          </DialogHeader>
          {selectedPart && (
            <form onSubmit={handleEditSubmit} className="space-y-4 pt-4">
              <div>
                <Label htmlFor="editName" className="text-sm font-medium text-gray-700">Name</Label>
                <Input
                  id="editName"
                  name="name"
                  value={selectedPart.name}
                  onChange={handleEditChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="editModel" className="text-sm font-medium text-gray-700">Model</Label>
                <Input
                  id="editModel"
                  name="model"
                  value={selectedPart.model}
                  onChange={handleEditChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="editQuantity" className="text-sm font-medium text-gray-700">Quantity</Label>
                <Input
                  id="editQuantity"
                  name="quantity"
                  type="number"
                  value={selectedPart.quantity === 0 ? "" : selectedPart.quantity}
                  onChange={handleEditChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="editPrice" className="text-sm font-medium text-gray-700">Price</Label>
                <Input
                  id="editPrice"
                  name="price"
                  type="number"
                  value={selectedPart.price === 0 ? "" : selectedPart.price}
                  onChange={handleEditChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="editImageUrl" className="text-sm font-medium text-gray-700">Image URL</Label>
                <Input
                  id="editImageUrl"
                  name="imageUrl"
                  value={selectedPart.imageUrl || ""}
                  onChange={handleEditChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="editDescription" className="text-sm font-medium text-gray-700">Description</Label>
                <Textarea
                  id="editDescription"
                  name="description"
                  rows={3}
                  value={selectedPart.description || ""}
                  onChange={handleEditChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 shadow-sm transition-all duration-200 transform active:scale-95 flex items-center gap-1" disabled={actionLoading === selectedPart._id}>
                {actionLoading === selectedPart._id ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Update Part"
                )}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}