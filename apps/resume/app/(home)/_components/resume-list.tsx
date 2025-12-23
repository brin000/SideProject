"use client";

import { Loader, RotateCw } from "lucide-react";
import React from "react";
import ResumeItem from "./common/resume-item";
import { useGetDocuments } from "@/hooks/query-hooks/use-document";

const ResumeList = () => {
  const { data, isLoading, isError, refetch } = useGetDocuments();
  const resumes = data?.data || [];
  return (
    <>
      {isLoading ? (
        <div className="flex items-center mx-5">
          <Loader className="animate-spin text-black dark:text-white size-10" />
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center mx-5">
          <button className="flex items-center gap-1" onClick={() => refetch()}>
            <RotateCw size="1em" />
            <span>Retry</span>
          </button>
        </div>
      ) : (
        <>
          {resumes.map((resume) => (
            <ResumeItem
              key={resume.documentId}
              documentId={resume.documentId}
              title={resume.title}
              status={resume.status}
              updatedAt={resume.updatedAt}
              themeColor={resume.themeColor}
              thumbnail={resume.thumbnail}
            />
          ))}
        </>
      )}
    </>
  );
};

export default ResumeList;
