import { ResumeDataType } from "@/types/resume.type";
import { Skeleton } from "@repo/ui/components/skeleton";

interface SummaryProps {
  isLoading: boolean;
  resumeInfo?: ResumeDataType;
}

const SummaryPreview = ({ isLoading, resumeInfo }: SummaryProps) => {
  return (
    <div className="w-full min-h-10">
      {isLoading ? (
        <Skeleton className="w-full h-6" />
      ) : (
        <p className="text-[13px] !leading-4">
          {resumeInfo?.summary ||
            "Enter a brief description of your profession background."}
        </p>
      )}
    </div>
  );
};

export default SummaryPreview;
