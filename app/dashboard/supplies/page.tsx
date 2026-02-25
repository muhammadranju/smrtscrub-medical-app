"use client";
import PageHeader from "@/components/dashboard/PageHeader";
import Pagination from "@/components/dashboard/Pagination";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  useCreateSuppliesBulkMutation,
  useCreateSupplyMutation,
  useDeleteSupplyMutation,
  useGetSuppliesQuery,
  useUpdateSupplyMutation,
} from "@/lib/redux/features/api/inventory/suppliesApiSlice";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 10;

function SuppliesPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: suppliesData, isLoading: isLoadingSupplies } =
    useGetSuppliesQuery({ page: currentPage, limit: ITEMS_PER_PAGE });

  const [createSupply, { isLoading: isCreatingSupply }] =
    useCreateSupplyMutation();
  const [createSuppliesBulk, { isLoading: isCreatingSupplyBulk }] =
    useCreateSuppliesBulkMutation();
  const [updateSupply, { isLoading: isUpdatingSupply }] =
    useUpdateSupplyMutation();
  const [deleteSupply, { isLoading: isDeletingSupply }] =
    useDeleteSupplyMutation();

  const [singleName, setSingleName] = useState("");
  const [bulkNames, setBulkNames] = useState<string[]>([""]);
  const [isSingleOpen, setIsSingleOpen] = useState(false);
  const [isBulkOpen, setIsBulkOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState<string | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const supplies = suppliesData?.data || [];
  const pagination = suppliesData?.pagination;
  const totalPages = pagination?.totalPage ?? 1;

  const handleAddSingle = async () => {
    if (!singleName.trim()) return;

    try {
      await createSupply({ name: singleName.trim() }).unwrap();
      setSingleName("");
      setIsSingleOpen(false);
    } catch (error) {
      console.error("Failed to create supply", error);
    }
  };

  const handleAddBulk = async () => {
    const cleaned = bulkNames.map((n) => n.trim()).filter(Boolean);
    if (!cleaned.length) return;

    const payload = {
      items: cleaned.map((name) => ({ name })),
    };

    try {
      await createSuppliesBulk(payload).unwrap();
      setBulkNames([""]);
      setIsBulkOpen(false);
    } catch (error) {
      console.error("Failed to create supplies in bulk", error);
    }
  };

  const handleAddBulkField = () => {
    setBulkNames((prev) => [...prev, ""]);
  };

  const handleBulkNameChange = (index: number, value: string) => {
    setBulkNames((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleRemoveBulkField = (index: number) => {
    setBulkNames((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSupply(id).unwrap();
    } catch (error) {
      console.error("Failed to delete supply", error);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Supplies"
        description="Manage reusable supplies for preference cards"
      />

      <div className="bg-white rounded-xl border border-purple-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-100 bg-purple-50/40">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Supplies List
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Manage frequently used supplies
            </p>
          </div>
          <div className="flex gap-x-2">
            <div className="flex items-center gap-3">
              <Dialog open={isSingleOpen} onOpenChange={setIsSingleOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    className="flex items-center gap-1 bg-[#9945FF] hover:bg-[#7f3ad4] text-white border border-[#9945FF]"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="text-xs">Add</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add Supply</DialogTitle>
                  </DialogHeader>

                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-2">
                        Single supply
                      </p>
                      <Input
                        placeholder="Name"
                        value={singleName}
                        onChange={(e) => setSingleName(e.target.value)}
                      />
                      <div className="mt-3 flex items-center gap-2">
                        <Button
                          className="flex-1 bg-red-800 hover:bg-red-600 text-white"
                          type="button"
                          onClick={() => setIsSingleOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="flex-1 bg-[#9945FF] hover:bg-[#7f3ad4]"
                          disabled={isCreatingSupply}
                          type="button"
                          onClick={handleAddSingle}
                        >
                          {isCreatingSupply ? "Saving..." : "Save"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex items-center gap-3">
              <Dialog open={isBulkOpen} onOpenChange={setIsBulkOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full justify-center text-xs bg-purple-50 text-[#9945FF] border border-purple-200 hover:bg-purple-50/80">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Many
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto relative">
                  <DialogHeader>
                    <DialogTitle>Add multiple supplies</DialogTitle>
                  </DialogHeader>

                  <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                    {bulkNames.map((value, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          placeholder={`Item ${index + 1}`}
                          value={value}
                          onChange={(e) =>
                            handleBulkNameChange(index, e.target.value)
                          }
                        />
                        {bulkNames.length > 1 && (
                          <Button
                            size="icon-sm"
                            variant="ghost"
                            type="button"
                            onClick={() => handleRemoveBulkField(index)}
                          >
                            <X className="w-4 h-4 text-gray-400" />
                          </Button>
                        )}
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full border-purple-200 text-[#9945FF] hover:bg-purple-50"
                      onClick={handleAddBulkField}
                    >
                      Add More
                    </Button>
                  </div>

                  <Button
                    className="mt-4 w-full bg-purple-500  hover:bg-purple-600"
                    type="button"
                    disabled={isCreatingSupplyBulk}
                    onClick={handleAddBulk}
                  >
                    {isCreatingSupplyBulk ? "Saving..." : "Save All"}
                  </Button>
                  {isCreatingSupplyBulk && (
                    <div className="absolute inset-0 bg-white/70 flex items-center justify-center text-sm font-semibold text-gray-700">
                      Saving...
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Supplies
                </th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoadingSupplies && supplies.length === 0
                ? Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index} className="animate-pulse">
                      <td className="py-3 px-6">
                        <Skeleton className="h-4 w-40" />
                      </td>
                      <td className="py-3 px-6">
                        <Skeleton className="h-4 w-24" />
                      </td>
                      <td className="py-3 px-6">
                        <div className="flex justify-end gap-2">
                          <Skeleton className="h-5 w-5 rounded-full" />
                          <Skeleton className="h-5 w-5 rounded-full" />
                        </div>
                      </td>
                    </tr>
                  ))
                : supplies.map((item: any) => (
                    <tr
                      key={item._id || item.id}
                      className="hover:bg-gray-50/50"
                    >
                      <td className="py-3 px-6 text-sm text-gray-900">
                        {item.name}
                      </td>
                      <td className="py-3 px-6 text-xs text-gray-500">
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString()
                          : "--"}
                      </td>
                      <td className="py-3 px-6 text-right text-xs text-gray-400">
                        <div className="flex justify-end gap-1">
                          <Button
                            size="icon-sm"
                            variant="ghost"
                            className="text-gray-500 hover:text-[#9945FF]"
                            onClick={() => {
                              setEditId(item._id || item.id);
                              setEditName(item.name);
                              setIsEditOpen(true);
                            }}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            size="icon-sm"
                            variant="ghost"
                            className="text-gray-400 hover:text-red-500"
                            disabled={isDeletingSupply}
                            onClick={() => {
                              setDeleteId(item._id || item.id);
                              setDeleteName(item.name);
                              setIsDeleteOpen(true);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
              {!isLoadingSupplies && supplies.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="py-6 px-6 text-sm text-gray-400 text-center"
                  >
                    No supplies added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {!isLoadingSupplies && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      <Dialog
        open={isEditOpen}
        onOpenChange={(open) => {
          setIsEditOpen(open);
          if (!open) {
            setEditId(null);
            setEditName("");
          }
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Supply</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <Button
              className="w-full bg-[#9945FF] hover:bg-[#7f3ad4]"
              disabled={!editId || !editName.trim() || isUpdatingSupply}
              onClick={async () => {
                if (!editId || !editName.trim()) return;
                try {
                  await updateSupply({
                    id: editId,
                    name: editName.trim(),
                  }).unwrap();
                  setIsEditOpen(false);
                  setEditId(null);
                  setEditName("");
                } catch (error) {
                  console.error("Failed to update supply", error);
                }
              }}
            >
              {isUpdatingSupply ? "Saving..." : "Save"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={isDeleteOpen}
        onOpenChange={(open) => {
          setIsDeleteOpen(open);
          if (!open) {
            setDeleteId(null);
            setDeleteName(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. It will permanently remove{" "}
              {deleteName || "this item"} from your inventory.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (!deleteId) return;
                await handleDelete(deleteId);
                setIsDeleteOpen(false);
                setDeleteId(null);
                setDeleteName(null);
              }}
              className="bg-red-500 hover:bg-red-600 text-white"
              disabled={isDeletingSupply}
            >
              {isDeletingSupply ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default SuppliesPage;
