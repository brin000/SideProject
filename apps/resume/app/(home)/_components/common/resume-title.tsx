"use client";
import { cn } from "@repo/ui/lib/utils";
import { FileText, Globe, Lock, Trash2 } from "lucide-react";
import React, { useEffect, useRef } from "react";

interface ResumeTitleProps {
  initialTitle: string;
  isLoading: boolean;
  status: "archived" | "private" | "public" | undefined;
  onSave?: (newTitle: string) => void;
}

const ResumeTitle = ({ initialTitle, isLoading, status, onSave }: ResumeTitleProps) => {
  const [title, setTitle] = React.useState(initialTitle);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (initialTitle) {
      setTitle(initialTitle);
    }
  }, [initialTitle]);

  const handleBlur = (e: React.FocusEvent<HTMLHeadingElement>) => {
    const newTitle = e.target.innerText;
    setTitle(newTitle);
    if (onSave && typeof onSave === "function") {
      onSave(newTitle);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLHeadingElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  return (
    <div className="flex items-center gap-1 pr-4 ">
      <FileText className="stroke-primary" size="20px" />
      <h5
        ref={titleRef}
        className={cn(
          "text-[20px] px-1 text-gray-700 dark:text-gray-300 font-semibold opacity-100",
          {
            "!opacity-70 !pointer-events-none":
              isLoading || status === "archived",
          }
        )}
        contentEditable={isLoading || status === "archived" ? false : true}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        // 由于我们手动管理了 contentEditable 的内容，所以可以安全地禁用这个警告
        suppressContentEditableWarning={true}
      >
        {title}
      </h5>

      <span>
        {status === "private" ? (
          <Lock />
        ) : status === "public" ? (
          <Globe />
        ) : status === "archived" ? (
          <Trash2 />
        ) : null}
      </span>
    </div>
  );
};

export default ResumeTitle;
