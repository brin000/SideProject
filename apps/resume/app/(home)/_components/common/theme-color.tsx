import { useEffect, useState } from "react";

import { useResumeContext } from "@/context/resume-info-provider";
import { useUpdateDocument } from "@/hooks/query-hooks/use-document";
import { THEME_COLORS, INITIAL_THEME_COLOR } from "@/constant/colors";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@repo/ui/components/popover";
import { Button } from "@repo/ui/components/button";
import { ChevronDown, Palette } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";
import { generateThumbnail } from "@/lib/helper";
import { toast } from "@repo/ui/hooks/use-toast";
import useDebounce from "@/hooks/use-debounce";

const ThemeColor = () => {
  const { resumeInfo, onUpdate } = useResumeContext();

  const { mutateAsync } = useUpdateDocument();

  const [selectedColor, setSelectedColor] = useState(INITIAL_THEME_COLOR);

  const debounceColor = useDebounce<string>(selectedColor, 1000);

  useEffect(() => {
    if (debounceColor) onSave();
  // eslint-disable-next-line
  }, [debounceColor]);  

  const onColorSelect = async (color: string) => { 
    setSelectedColor(color);
    if (!resumeInfo) return;

    onUpdate({
      ...resumeInfo,
      themeColor: color,
    });
  };

  const onSave = async () => {
    if (!selectedColor || selectedColor === INITIAL_THEME_COLOR) return;

    const thumbnail = await generateThumbnail();  

    await mutateAsync({
      thumbnail,
      themeColor: selectedColor,
    }, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Theme color updated successfully",
        });
      },
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          disabled={resumeInfo?.status === "archived"}
          className="bg-white border gap-1 dark:bg-gray-800 p-2 lg:w-auto lg:p-4"
        >
          <div className="flex items-center gap-1">
            <Palette size="17px" />
            <span className="hidden lg:flex">Theme</span>
            <ChevronDown size="14px" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="bg-background">
        <h2 className="mb-2 text-sm font-bold">Select Theme Color</h2>
        <div className="grid grid-cols-5 gap-2">
          {THEME_COLORS.map((color, index) => (
            <div
              role="button"
              key={index}
              onClick={() => onColorSelect(color)}
              className={cn(
                "h-5 rounded-[5px] hover:border-black border",
                selectedColor === color && "border-black"
              )}
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeColor;
