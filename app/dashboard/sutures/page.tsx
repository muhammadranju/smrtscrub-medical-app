"use client";

import PageHeader from "@/components/dashboard/PageHeader";
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
  useCreateSutureMutation,
  useCreateSuturesBulkMutation,
  useDeleteSutureMutation,
  useGetSuturesQuery,
  useUpdateSutureMutation,
} from "@/lib/redux/features/api/inventory/suturesApiSlice";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";

const ITEMS_PER_PAGE = 10;

function SuturesPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: suturesData, isLoading: isLoadingSutures } = useGetSuturesQuery(
    { page: currentPage, limit: ITEMS_PER_PAGE },
  );

  const [createSuture, { isLoading: isCreatingSuture }] =
    useCreateSutureMutation();
  const [createSuturesBulk, { isLoading: isCreatingSutureBulk }] =
    useCreateSuturesBulkMutation();
  const [updateSuture, { isLoading: isUpdatingSuture }] =
    useUpdateSutureMutation();
  const [deleteSuture, { isLoading: isDeletingSuture }] =
    useDeleteSutureMutation();

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

  const sutures = suturesData?.data || [];
  const pagination = suturesData?.pagination;
  const totalPages = pagination?.totalPage ?? 1;

  const handleAddSingle = async () => {
    if (!singleName.trim()) return;

    try {
      await createSuture({ name: singleName.trim() }).unwrap();
      setSingleName("");
      setIsSingleOpen(false);
    } catch (error) {
      console.error("Failed to create suture", error);
    }
  };

  const handleAddBulk = async () => {
    const cleaned = bulkNames.map((n) => n.trim()).filter(Boolean);
    if (!cleaned.length) return;

    const payload = {
      items: cleaned.map((name) => ({ name })),
    };

    try {
      await createSuturesBulk(payload).unwrap();
      setBulkNames([""]);
      setIsBulkOpen(false);
    } catch (error) {
      console.error("Failed to create sutures in bulk", error);
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
      await deleteSuture(id).unwrap();
    } catch (error) {
      console.error("Failed to delete suture", error);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sutures"
        description="Manage reusable sutures for preference cards"
      />

      <div className="bg-white rounded-xl border border-purple-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-100 bg-purple-50/40">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Sutures List
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Manage frequently used sutures
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
                    <DialogTitle>Add Suture</DialogTitle>
                  </DialogHeader>

                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-2">
                        Single suture
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
                          disabled={isCreatingSuture}
                          type="button"
                          onClick={handleAddSingle}
                        >
                          {isCreatingSuture ? "Saving..." : "Save"}
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
                    <DialogTitle>Add multiple sutures</DialogTitle>
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
                    disabled={isCreatingSutureBulk}
                    onClick={handleAddBulk}
                  >
                    {isCreatingSutureBulk ? "Saving..." : "Save All"}
                  </Button>
                  {isCreatingSutureBulk && (
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
                  Sutures
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
              {isLoadingSutures && sutures.length === 0
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
                : sutures.map((item: any) => (
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
                            disabled={isDeletingSuture}
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
              {!isLoadingSutures && sutures.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="py-6 px-6 text-sm text-gray-400 text-center"
                  >
                    No sutures added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {!isLoadingSutures && (
          <div className="flex items-center justify-end gap-2 mt-4 px-6 pb-4">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-[#9945FF] text-white"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {page}
              </Button>
            ))}

            <Button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </Button>
          </div>
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
            <DialogTitle>Edit Suture</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <Button
              className="w-full bg-[#9945FF] hover:bg-[#7f3ad4]"
              disabled={!editId || !editName.trim() || isUpdatingSuture}
              onClick={async () => {
                if (!editId || !editName.trim()) return;
                try {
                  await updateSuture({
                    id: editId,
                    name: editName.trim(),
                  }).unwrap();
                  setIsEditOpen(false);
                  setEditId(null);
                  setEditName("");
                } catch (error) {
                  console.error("Failed to update suture", error);
                }
              }}
            >
              {isUpdatingSuture ? "Saving..." : "Save"}
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
              disabled={isDeletingSuture}
            >
              {isDeletingSuture ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default SuturesPage;
