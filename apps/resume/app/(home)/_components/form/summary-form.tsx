"use client";
import React, { useState } from "react";

import { useResumeContext } from "@/context/resume-info-provider";
import { Label } from "@repo/ui/components/label";
import { Button } from "@repo/ui/components/button";
import { toast } from "@repo/ui/hooks/use-toast";
import { Textarea } from "@repo/ui/components/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Loader, Sparkles } from "lucide-react";
import { ResumeDataType } from "@/types/resume.type";
import { generateThumbnail } from "@/lib/helper";
import { useUpdateDocument } from "@/hooks/query-hooks/use-document";
// import { googleModels } from "@repo/ai/lib/models";
// import { ChatPromptTemplate, StructuredOutputParser } from "@repo/ai";
import { z } from "zod";

// 定义生成摘要的数据结构
interface GenerateSummaryType {
  fresher: string;
  mid: string;
  experienced: string;
}

// AI提示模板
const SUMMARY_TEMPLATE = `Generate 3 resume summaries for {jobTitle} at different levels, 3-4 lines each, highlight skills{format_instructions}`;

const summarySchema = z.object({
  fresher: z.string().describe("Junior summary"),
  mid: z.string().describe("Mid-level summary"),
  experienced: z.string().describe("Senior summary"),
});

const SummaryForm = ({ handleNext }: { handleNext: () => void }) => {
  const { resumeInfo, onUpdate } = useResumeContext();
  const { mutateAsync, isPending } = useUpdateDocument();

  const [isLoading, setIsLoading] = useState(false);
  const [aiGenerateSummary, setAiGenerateSummary] =
    useState<GenerateSummaryType | null>(null);

  // 更新摘要内容
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!resumeInfo) return;

    onUpdate({
      ...resumeInfo,
      summary: e.target.value,
    } as ResumeDataType);
  };

  // 保存摘要
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!resumeInfo) return;

    const thumbnail = await generateThumbnail();
    const currentNo = resumeInfo.currentPosition
      ? resumeInfo.currentPosition + 1
      : 1;

    try {
      await mutateAsync(
        {
          currentPosition: currentNo,
          thumbnail,
          summary: resumeInfo.summary,
        },
        {
          onSuccess: () => {
            toast({
              title: "成功",
              description: "摘要更新成功",
            });
            handleNext();
          },
        },
      );
    } catch (error) {
      console.log("error", error);
      toast({
        title: "保存失败",
        variant: "destructive",
      });
    }
  };

  // 使用AI生成摘要
  const generateSummaryFromAI = async () => {
    try {
      setIsLoading(true);
      const jobTitle = resumeInfo?.personalInfo?.jobTitle;

      if (!jobTitle) {
        toast({
          title: "请先填写职位名称",
          variant: "destructive",
        });
        return;
      }

      // const parser = StructuredOutputParser.fromZodSchema(summarySchema);
      // const chain = ChatPromptTemplate.fromTemplate(SUMMARY_TEMPLATE)
      //   .pipe(googleModels)
      //   .pipe(parser);
      // const response = await chain.invoke({
      //   jobTitle,
      //   format_instructions: parser.getFormatInstructions(),
      // });
      // setAiGenerateSummary(response);
    } catch (error) {
      console.error("生成摘要失败:", error);
      toast({
        title: "生成摘要失败",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 选择AI生成的摘要
  const handleSelect = (suggestion: string) => {
    if (!resumeInfo) return;

    onUpdate({
      ...resumeInfo,
      summary: suggestion,
    } as ResumeDataType);

    setAiGenerateSummary(null);
  };

  return (
    <div>
      <div className="w-full">
        <h2 className="font-bold text-lg">简历摘要</h2>
        <p className="text-sm">为您的简历添加摘要</p>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex items-end justify-between">
            <Label>添加摘要</Label>
            <Button
              type="button"
              variant="outline"
              className="gap-1"
              onClick={generateSummaryFromAI}
              disabled={isLoading}
            >
              <Sparkles className="text-purple-500" size="15px" />
              AI生成
            </Button>
          </div>
          <Textarea
            className="mt-5 min-h-36"
            required
            value={resumeInfo?.summary || ""}
            onChange={handleChange}
          />

          {aiGenerateSummary && (
            <div>
              <h5 className="font-semibold text-base my-4">AI建议</h5>
              {Object.entries(aiGenerateSummary).map(([key, value]) => (
                <Card
                  role="button"
                  key={key}
                  className="my-4 bg-primary/5 shadow-none border-primary/30 cursor-pointer"
                  onClick={() => handleSelect(value)}
                >
                  <CardHeader className="py-2">
                    <CardTitle className="font-semibold text-md first-letter:uppercase">
                      {key}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">{value}</CardContent>
                </Card>
              ))}
            </div>
          )}

          <Button
            type="submit"
            className="mt-4"
            disabled={
              isPending || isLoading || resumeInfo?.status === "archived"
            }
          >
            {isPending && <Loader className="animate-spin size-4" />}
            保存更改
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SummaryForm;
