import { INITIAL_THEME_COLOR } from "@/constant/colors";
import { ResumeDataType } from "@/types/resume.type";
import { Skeleton } from "@repo/ui/components/skeleton";
import React from "react";

interface PersonalInfoProps {
  isLoading: boolean;
  resumeInfo?: ResumeDataType;
}

const PersonalInfo = ({ isLoading, resumeInfo }: PersonalInfoProps) => {
  const themeColor = resumeInfo?.themeColor || INITIAL_THEME_COLOR;

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="w-full min-h-14">
      <h2
        className="font-bold text-xl text-center"
        style={{ color: themeColor }}
      >
        {resumeInfo?.personalInfo?.firstName || "First Name"}{" "}
        {resumeInfo?.personalInfo?.lastName || "Last Name"}
      </h2>
      <h5 className="text-center text-sm font-medium">
        {resumeInfo?.personalInfo?.jobTitle || "Job Title"}
      </h5>
      <p className="text-center text-[13px] font-normal">
        {resumeInfo?.personalInfo?.address || "Address"}
      </p>

      <div className="flex items-center justify-between pt-3">
        <h5 className="font-normal text-[13px]">
          {resumeInfo?.personalInfo?.phone || "Phone"}
        </h5>
        <h5 className="font-normal text-[13px]">
          {resumeInfo?.personalInfo?.email || "Email"}
        </h5>
      </div>

      <hr
        className=" border-b-[1.5px] my-2"
        style={{ borderColor: themeColor }}
      />
    </div>
  );
};

const SkeletonLoader = () => {
  return (
    <div className="w-full min-h-14">
      <Skeleton className="w-1/2 h-6 mx-auto mb-2" />
      <Skeleton className="w-1/4 h-6 mx-auto mb-2" />
      <Skeleton className="w-1/3 h-6 mx-auto mb-2" />
      <div className="flex items-center justify-between pt-3">
        <Skeleton className="w-1/4 h-3" />
        <Skeleton className="w-1/4 h-3" />
      </div>
      <Skeleton className="w-full h-[1.5px] my-2" />
    </div>
  );
};

export default PersonalInfo;
