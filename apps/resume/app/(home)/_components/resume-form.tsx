"use client";
import { useResumeContext } from "@/context/resume-info-provider";
import { Button } from "@repo/ui/components/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useState } from "react";
import PersonalInfoForm from "./form/personal-info-form";
import SummaryForm from "./form/summary-form";
import ProfessionForm from "./form/profession-form";
import EducationForm from "./form/education-form";
import SkillsForm from "./form/skills-form";

const ResumeForm = () => {
  const { resumeInfo } = useResumeContext();
  const [activeFormIndex, setActiveFormIndex] = useState(1);

  const handleNext = () => {
    const newIndex = activeFormIndex + 1;
    setActiveFormIndex(newIndex);
  };

  return (
    <div className="flex-1 w-full lg:sticky lg top-16">
      <div className="shadow-md rounded-md bg-white !border-t-primary !border-t-4 dark:bg-card dark:border dark:border-gray-800">
        <div className="flex items-center gap-1 px-3 justify-end border-b py-3 min-h-10">
          {activeFormIndex > 1 && (
            <Button
              variant="outline"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
              className="!px-2 !py-1 !h-auto"
            >
              <ArrowLeft size="16px" />
              Previous
            </Button>
          )}

          <Button
            variant="outline"
            onClick={handleNext}
            disabled={
              activeFormIndex === 5 || resumeInfo?.status === "archived"
            }
            className="!px-2 !py-1 !h-auto"
          >
            <ArrowRight size="16px" />
            Next
          </Button>
        </div>

        <div className="px-5 py-3 pb-5">
          {/* personal Info Form */}
          {activeFormIndex === 1 && (
            <PersonalInfoForm handleNext={handleNext} />
          )}

          {/* Summary Form */}
          {
            activeFormIndex === 2 && (
              <SummaryForm handleNext={handleNext} />
            )
          }

          {/* Profession Form */}
          {activeFormIndex === 3 && <ProfessionForm handleNext={handleNext} />}

          {/* Education Form */}
          {activeFormIndex === 4 && <EducationForm handleNext={handleNext} />}

          {/* Skills Form */}
          {activeFormIndex === 5 && <SkillsForm handleNext={handleNext} />}
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;
