"use client";
import { useResumeContext } from "@/context/resume-info-provider";
import React from "react";
import PersonalInfo from "./preview/personal-info";
import SummaryPreview from "./preview/summary-preview";
import ExperiencePreview from "./preview/experience-preview";
import EducationPreview from "./preview/education-preview";
import SkillsPreview from "./preview/skills-preview";

const ResumePreview = () => {
  const { resumeInfo, isLoading } = useResumeContext();

  return (
    <div
      id="resume-preview-id"
      className="shadow-lg bg-white w-full flex-[1.02] h-full p-10 dark:border dark:bg-card dark:border-b-gray-800 dark:border-x-gray-800"
      style={{ borderTop: `13px solid ${resumeInfo?.themeColor}` }}
    >
      {/* personal info */}
      <PersonalInfo isLoading={isLoading} resumeInfo={resumeInfo} />

      {/* summary */}
      <SummaryPreview isLoading={isLoading} resumeInfo={resumeInfo} />

      {/* profession exp */}
      <ExperiencePreview isLoading={isLoading} resumeInfo={resumeInfo} />

      {/* education info */}
      <EducationPreview isLoading={isLoading} resumeInfo={resumeInfo} />

      {/* skills */}
      <SkillsPreview isLoading={isLoading} resumeInfo={resumeInfo} />
    </div>
  );
};

export default ResumePreview;
