"use client";

import { useResumeContext } from "@/context/resume-info-provider";
import { AlertCircle } from "lucide-react";
import React from "react";
import ResumeTitle from "./resume-title";
import { useUpdateDocument } from "@/hooks/query-hooks/use-document";
import { toast } from "@repo/ui/hooks/use-toast";
import ThemeColor from "./theme-color";
import PreviewModal from "../preview-modal";

const TopSection = () => {
  const { resumeInfo, isLoading, onUpdate } = useResumeContext();

  const { mutateAsync, isPending } = useUpdateDocument();

  const handleTitle = async (title: string) => {
    if (title === "Untitled Resume" || !title) return;

    if (resumeInfo) {
      onUpdate({
        ...resumeInfo,
        title,
      });
    }

    mutateAsync(
      {
        title,
      },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Resume title updated successfully",
          });
        },
      }
    );
  };

  return (
    <>
      {resumeInfo?.status === "archived" && (
        <div className="absolute z-[9] inset-0 h-6 top-0 bg-rose-500 text-center  text-base p-2 text-white flex justify-center items-center gap-x-2 font-medium">
          <AlertCircle size="16px" />
          This resume is in the trash bin.
        </div>
      )}
      <div className="w-full flex justify-between items-center border-b pb-3">
        <div className="flex items-center gap-2">
          <ResumeTitle
            isLoading={isLoading || isPending}
            initialTitle={resumeInfo?.title || ""}
            status={resumeInfo?.status}
            onSave={(value) => handleTitle(value)}
          />
        </div>
        <div className="flex items-center gap-2">
          {/* {Theme color} */}
          <ThemeColor />

          {/* Preview Model */}
          <PreviewModal />
          
          {/* Download Resume */}

          {/* Share Resume */}

          {/* More Option */}
        </div>
      </div>
    </>
  );
};

export default TopSection;
