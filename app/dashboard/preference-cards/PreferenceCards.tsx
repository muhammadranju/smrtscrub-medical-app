"use client";

import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetPublicPreferenceCardsQuery,
  useGetSinglePreferenceCardQuery,
  useUpdatePreferenceCardMutation,
} from "@/lib/redux/features/api/preferences/preferenceApiSlice";
import { Check, Eye, X } from "lucide-react";
import { useState } from "react";
import CardDetailsContent from "./CardDetailsContent";

import Pagination from "@/components/dashboard/Pagination";

export interface IPreferenceCard {
  id: string;
  cardTitle: string;
  surgeon: {
    name: string;
    specialty: string;
  };
  verificationStatus: string;
  downloadCount: number;
  createdAt: string;
  updatedAt: string;
}

const PreferenceCardsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedCard, setSelectedCard] = useState<IPreferenceCard | null>(
    null,
  );
  const {
    data: preferenceCardsData,
    isLoading,
    refetch,
  } = useGetPublicPreferenceCardsQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  const preferenceCards = preferenceCardsData?.data || [];
  const meta = preferenceCardsData?.meta || { total: 0, totalPages: 1 };

  const { data: singlePreferenceCardData, isLoading: isSingleLoading } =
    useGetSinglePreferenceCardQuery(selectedCard?.id || "", {
      skip: !selectedCard?.id,
    });
  const singlePreferenceCard = singlePreferenceCardData?.data || null;

  const [updatePreferenceCard, { isLoading: isUpdating }] =
    useUpdatePreferenceCardMutation();

  console.log(singlePreferenceCard);

  const handleApprove = async () => {
    if (!selectedCard) return;
    try {
      await updatePreferenceCard({
        id: selectedCard.id,
        verificationStatus: "VERIFIED",
      }).unwrap();
      refetch();
      setSelectedCard(null);
    } catch (error) {
      console.error("Failed to approve preference card", error);
    }
  };

  return (
    <>
      <PageHeader
        title="Preference Cards"
        description="View and manage all surgical preference cards"
      />
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Surgeon
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Procedure Title
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Specialty
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
                  Verified
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Downloads
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index} className="animate-pulse">
                      <td className="py-4 px-6">
                        <Skeleton className="h-4 w-32" />
                      </td>
                      <td className="py-4 px-6">
                        <Skeleton className="h-4 w-48" />
                      </td>
                      <td className="py-4 px-6">
                        <Skeleton className="h-4 w-36" />
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex justify-center">
                          <Skeleton className="h-6 w-6 rounded-full" />
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <Skeleton className="h-4 w-10" />
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex justify-end">
                          <Skeleton className="h-8 w-8 rounded-full" />
                        </div>
                      </td>
                    </tr>
                  ))
                : preferenceCards.map((card: IPreferenceCard) => (
                    <tr
                      key={card.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <span className="font-bold text-gray-900 text-sm">
                          {card?.surgeon?.name}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-900">
                        {card?.cardTitle}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500">
                        {card?.surgeon?.specialty}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex justify-center">
                          {card.verificationStatus === "VERIFIED" ? (
                            <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                              <Check
                                size={14}
                                className="text-green-500"
                                strokeWidth={3}
                              />
                            </div>
                          ) : (
                            <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center">
                              <X
                                size={14}
                                className="text-gray-400"
                                strokeWidth={3}
                              />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm font-bold text-gray-900 pl-8">
                        {card.downloadCount}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              onClick={() => setSelectedCard(card)}
                              className="text-gray-800 bg-white hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                            >
                              <Eye size={20} />
                            </Button>
                          </DialogTrigger>
                          <DialogContent 
                            showCloseButton={false}
                            className="p-0 overflow-hidden max-w-2xl relative"
                          >
                            <DialogClose asChild>
                              <button className="absolute right-6 top-6 z-10 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all outline-none">
                                <X size={20} />
                              </button>
                            </DialogClose>
                            <DialogTitle className="sr-only">
                              Preference card details
                            </DialogTitle>
                            <CardDetailsContent
                              onApprove={handleApprove}
                              selectedCard={singlePreferenceCard}
                              isLoading={isSingleLoading}
                              isUpdating={isUpdating}
                            />
                          </DialogContent>
                        </Dialog>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={meta.totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default PreferenceCardsList;
