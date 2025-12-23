import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dot, EllipsisVertical, FileText, Globe, Lock } from "lucide-react";

type ResumeItemProps = {
  documentId: string;
  title: string;
  status: "archived" | "private" | "public";
  themeColor: string | null;
  thumbnail: string | null;
  updatedAt: string | null;
};

const ResumeItem = ({
  documentId,
  title,
  status,
  themeColor,
  thumbnail,
  updatedAt,
}: ResumeItemProps) => {
  "use client";

  const router = useRouter();

  const docDate = updatedAt ? format(new Date(updatedAt), "MMM dd, yyyy") : "";

  const gotoDoc = () => {
    router.push(`/dashboard/document/${documentId}/edit`);
  };

  return (
    <div
      role="button"
      className="cursor-pointer max-w-[164px] h-[197px] w-full border rounded-lg transition-all hover:border-primary hover:shadow-md shadow-primary "
      style={{
        border: themeColor || "",
      }}
      onClick={gotoDoc}
    >
      <div className="flex flex-col w-full h-full justify-center items-center rounded-lg bg-[#fdfdfd] dark:bg-secondary">
        <div className="w-full flex flex-1 px-1 pt-2">
          <div className="w-full flex-1 flex justify-center items-center  bg-white dark:bg-gray-700 rounded-t-lg">
            {thumbnail ? (
              <div className="relative w-full h-full rounded-t-lg overflow-hidden">
                <Image
                  fill
                  src={thumbnail}
                  alt={title}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            ) : (
              <FileText size="30px" />
            )}
          </div>
        </div>

        {/* Baby Content */}
        <div className="shrink w-full border-t pt-2 pb-2.5 px-2.5 gap-0.5">
          <div className="flex items-center justify-between">
            <h5 className="block font-semibold text-sm mb-0.5 truncate w-[200px]">
              {title}
            </h5>
            <button className="text-muted-foreground">
              <EllipsisVertical size="20px" />
            </button>
          </div>

          <div className="flex items-center text-xs font-medium text-muted-foreground">
            <span className="flex items-center gap-0.5">
              {status === "private" ? (
                <>
                  <Lock size="12px" />
                  Private
                </>
              ) : (
                <>
                  <Globe size="12px" className="text-primary" />
                  Public
                </>
              )}
            </span>
            <Dot size="15px" />
            <span>{docDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeItem;
