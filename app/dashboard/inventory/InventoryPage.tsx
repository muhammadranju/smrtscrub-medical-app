"use client";

import PageHeader from "@/components/dashboard/PageHeader";
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
import {
  useCreateSutureMutation,
  useCreateSuturesBulkMutation,
  useDeleteSutureMutation,
  useGetSuturesQuery,
  useUpdateSutureMutation,
} from "@/lib/redux/features/api/inventory/suturesApiSlice";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";

type ItemType = "suture" | "supply";

const InventoryPage = () => {
  const { data: suturesData, isLoading: isLoadingSutures } =
    useGetSuturesQuery(null);
  const { data: suppliesData, isLoading: isLoadingSupplies } =
    useGetSuppliesQuery(null);

  const [createSuture, { isLoading: isCreatingSuture }] =
    useCreateSutureMutation();
  const [createSuturesBulk, { isLoading: isCreatingSutureBulk }] =
    useCreateSuturesBulkMutation();
  const [createSupply, { isLoading: isCreatingSupply }] =
    useCreateSupplyMutation();
  const [createSuppliesBulk, { isLoading: isCreatingSupplyBulk }] =
    useCreateSuppliesBulkMutation();
  const [updateSuture, { isLoading: isUpdatingSuture }] =
    useUpdateSutureMutation();
  const [updateSupply, { isLoading: isUpdatingSupply }] =
    useUpdateSupplyMutation();
  const [deleteSuture, { isLoading: isDeletingSuture }] =
    useDeleteSutureMutation();
  const [deleteSupply, { isLoading: isDeletingSupply }] =
    useDeleteSupplyMutation();

  const [singleName, setSingleName] = useState("");
  const [bulkNames, setBulkNames] = useState<string[]>([""]);
  const [openSingleFor, setOpenSingleFor] = useState<ItemType | null>(null);
  const [openBulkFor, setOpenBulkFor] = useState<ItemType | null>(null);
  const [editItem, setEditItem] = useState<{
    type: ItemType;
    id: string;
    name: string;
  } | null>(null);
  const [editName, setEditName] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState<{
    type: ItemType;
    id: string;
    name: string;
  } | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleAddSingle = async (type: ItemType, onSuccess?: () => void) => {
    if (!singleName.trim()) return;

    try {
      if (type === "suture") {
        await createSuture({ name: singleName.trim() }).unwrap();
      } else {
        await createSupply({ name: singleName.trim() }).unwrap();
      }
      setSingleName("");
      onSuccess?.();
    } catch (error) {
      console.error("Failed to create item", error);
    }
  };

  const handleAddBulk = async (type: ItemType) => {
    const cleaned = bulkNames.map((n) => n.trim()).filter(Boolean);
    if (!cleaned.length) return;

    const payload = {
      items: cleaned.map((name) => ({ name })),
    };

    try {
      if (type === "suture") {
        await createSuturesBulk(payload).unwrap();
      } else {
        await createSuppliesBulk(payload).unwrap();
      }
      setBulkNames([""]);
      setOpenBulkFor(null);
    } catch (error) {
      console.error("Failed to create items in bulk", error);
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

  const handleDelete = async (type: ItemType, id: string) => {
    try {
      if (type === "suture") {
        await deleteSuture(id).unwrap();
      } else {
        await deleteSupply(id).unwrap();
      }
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  };

  const renderList = (type: ItemType) => {
    const isBulkLoading =
      type === "suture" ? isCreatingSutureBulk : isCreatingSupplyBulk;

    const isListLoading =
      type === "suture" ? isLoadingSutures : isLoadingSupplies;

    const list =
      type === "suture" ? suturesData?.data || [] : suppliesData?.data || [];

    return (
      <div className="bg-white rounded-xl border border-purple-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-100 bg-purple-50/40">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              {type === "suture" ? "Sutures List" : "Supplies List"}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Manage frequently used{" "}
              {type === "suture" ? "sutures" : "supplies"}
            </p>
          </div>
          <div className="flex gap-x-2">
            <div className="flex items-center gap-3">
              <Dialog
                open={openSingleFor === type}
                onOpenChange={(open) => {
                  if (open) {
                    setOpenSingleFor(type);
                  } else {
                    setOpenSingleFor(null);
                    setSingleName("");
                  }
                }}
              >
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
                    <DialogTitle>
                      Add {type === "suture" ? "Suture" : "Supply"}
                    </DialogTitle>
                  </DialogHeader>

                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-2">
                        Single {type === "suture" ? "suture" : "supply"}
                      </p>
                      <Input
                        placeholder="Name"
                        value={singleName}
                        onChange={(e) => setSingleName(e.target.value)}
                      />
                      <div className="mt-3 flex items-center gap-2">
                        <Button
                          className="flex-1 bg-red-800 hover:bg-red-600 text-white"
                          disabled={
                            type === "suture"
                              ? isCreatingSuture
                              : isCreatingSupply
                          }
                          onClick={() => setOpenSingleFor(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="flex-1 bg-[#9945FF] hover:bg-[#7f3ad4]"
                          disabled={
                            type === "suture"
                              ? isCreatingSuture
                              : isCreatingSupply
                          }
                          onClick={() =>
                            handleAddSingle(type, () => setOpenSingleFor(null))
                          }
                        >
                          {type === "suture"
                            ? isCreatingSuture
                              ? "Saving..."
                              : "Save"
                            : isCreatingSupply
                              ? "Saving..."
                              : "Save"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex items-center gap-3">
              <Dialog
                open={openBulkFor === type}
                onOpenChange={(open) => {
                  if (open) {
                    setOpenBulkFor(type);
                  } else {
                    setOpenBulkFor(null);
                    setBulkNames([""]);
                  }
                }}
              >
                <DialogTrigger asChild>
                  <Button className="w-full justify-center text-xs bg-purple-50 text-[#9945FF] border border-purple-200 hover:bg-purple-50/80">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Many
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto relative">
                  <DialogHeader>
                    <DialogTitle>
                      Add multiple {type === "suture" ? "sutures" : "supplies"}
                    </DialogTitle>
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
                    className="mt-4 w-full"
                    type="button"
                    disabled={
                      type === "suture"
                        ? isCreatingSutureBulk
                        : isCreatingSupplyBulk
                    }
                    onClick={() => handleAddBulk(type)}
                  >
                    {type === "suture"
                      ? isCreatingSutureBulk
                        ? "Saving..."
                        : "Save All"
                      : isCreatingSupplyBulk
                        ? "Saving..."
                        : "Save All"}
                  </Button>
                  {isBulkLoading && (
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
                  {type === "suture" ? "Sutures" : "Supplies"}
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
              {isListLoading && list.length === 0
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
                : list.map((item: any) => (
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
                              setEditItem({
                                type,
                                id: item._id || item.id,
                                name: item.name,
                              });
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
                            disabled={
                              (type === "suture" && isDeletingSuture) ||
                              (type === "supply" && isDeletingSupply)
                            }
                            onClick={() => {
                              setDeleteItem({
                                type,
                                id: item._id || item.id,
                                name: item.name,
                              });
                              setIsDeleteOpen(true);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
              {!isListLoading && list.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="py-6 px-6 text-sm text-gray-400 text-center"
                  >
                    No {type === "suture" ? "sutures" : "supplies"} added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sutures & Supplies"
        description="Manage reusable sutures and supplies for preference cards"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {renderList("suture")}
        {renderList("supply")}
      </div>
      <Dialog
        open={isEditOpen}
        onOpenChange={(open) => {
          setIsEditOpen(open);
          if (!open) {
            setEditItem(null);
            setEditName("");
          }
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <Button
              className="w-full bg-[#9945FF] hover:bg-[#7f3ad4]"
              disabled={
                isUpdatingSuture ||
                isUpdatingSupply ||
                !editItem ||
                !editName.trim()
              }
              onClick={async () => {
                if (!editItem || !editName.trim()) return;
                try {
                  if (editItem.type === "suture") {
                    await updateSuture({
                      id: editItem.id,
                      name: editName.trim(),
                    }).unwrap();
                  } else {
                    await updateSupply({
                      id: editItem.id,
                      name: editName.trim(),
                    }).unwrap();
                  }
                  setIsEditOpen(false);
                  setEditItem(null);
                  setEditName("");
                } catch (error) {
                  console.error("Failed to update item", error);
                }
              }}
            >
              {isUpdatingSuture || isUpdatingSupply ? "Saving..." : "Save"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <AlertDialog
        open={isDeleteOpen}
        onOpenChange={(open) => {
          setIsDeleteOpen(open);
          if (!open) {
            setDeleteItem(null);
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
              {deleteItem?.name || "this item"} from your inventory.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (!deleteItem) return;
                await handleDelete(deleteItem.type, deleteItem.id);
                setIsDeleteOpen(false);
                setDeleteItem(null);
              }}
              className="bg-red-500 hover:bg-red-600 text-white"
              disabled={
                deleteItem?.type === "suture"
                  ? isDeletingSuture
                  : isDeletingSupply
              }
            >
              {deleteItem?.type === "suture"
                ? isDeletingSuture
                  ? "Deleting..."
                  : "Delete"
                : isDeletingSupply
                  ? "Deleting..."
                  : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default InventoryPage;
