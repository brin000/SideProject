"use client";

import { useCreateDocument } from "@/hooks/query-hooks/use-document";
import { FileText, Loader, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const AddResume = () => {
  const router = useRouter();
  const { isPending, mutate } = useCreateDocument();

  const onCreateResume = () => {
    mutate(
      {
        title: "Untitled Resume",
      },
      {
        onSuccess: (res) => {
          const documentId = res.data?.documentId;
          router.push(`/dashboard/document/${documentId}/edit`);
        },
      },
    );
  };

  return (
    <>
      <div
        role="button"
        className="p-0.5 w-full cursor-pointer max-w-[164px]"
        onClick={onCreateResume}
      >
        <div className="py-24 h-[183px] flex flex-col rounded-lg gap-2 w-full max-w-full bg-white border items-center justify-center transition hover:border-primary hover:shadow dark:bg-secondary">
          <span>
            <Plus size="30px" />
          </span>
          <p className="text-sm font-semibold">Blank Resume</p>
        </div>
      </div>

      {isPending && (
        <div className="fixed inset-0 z-[999] backdrop-blur bg-black/30 w flex flex-col gap-2 items-center justify-center">
          <Loader size="35px" className="animate-spin" />
          <div className="flex items-center gap-2">
            <FileText />
            Creating Blank Resume...
          </div>
        </div>
      )}
    </>
  );
};

export default AddResume;
