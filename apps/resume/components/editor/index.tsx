"use client";
import { useState } from "react";

import { Button } from "@repo/ui/components/button";
import { Label } from "@repo/ui/components/label";
import { Loader, Sparkles } from "lucide-react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { toast } from "@repo/ui/hooks/use-toast";
// import { PromptTemplate, StringOutputParser } from "@repo/ai";
// import { googleModels } from "@repo/ai/lib/models";

type RichTextEditorProps = {
  jobTitle: string | null;
  initialValue: string;
  onEditChange: (value: string | undefined) => void;
};

// 工作描述生成提示模板
const TEMPLATE = `Create 6-7 HTML bullet points for a {jobTitle} role. Use <ul> and <li> tags. Focus on skills, technologies, and contributions.`;

// 从AI响应中提取<ul>标签内容的工具函数
const extractULContent = (output: string) => {
  const match = output.match(/<ul>[\s\S]*<\/ul>/);
  return match ? match[0] : "";
};

const RichTextEditor = ({
  jobTitle,
  initialValue,
  onEditChange,
}: RichTextEditorProps) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(initialValue || undefined);

  // 创建 LangChain 链
  // const generateChain = PromptTemplate.fromTemplate(TEMPLATE)
  //   .pipe(googleModels)
  //   .pipe(new StringOutputParser())
  //   .pipe(extractULContent);

  // AI生成工作描述
  const generateSummaryFormAI = async () => {
    if (!jobTitle) {
      toast({
        title: "请输入职位名称",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      // const response = await generateChain.invoke({ jobTitle });

      // setValue(response);
      // onEditChange(response);
    } catch (error) {
      console.error("生成描述失败:", error);
      toast({
        title: "生成描述失败",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between my-2">
        <Label htmlFor="jobTitle">工作总结</Label>
        <Button
          type="button"
          variant="outline"
          className="gap-1"
          disabled={loading}
          onClick={generateSummaryFormAI}
        >
          <Sparkles className="text-purple-500" size="15px" />
          AI生成
          {loading && <Loader size="13px" className="animate-spin" />}
        </Button>
      </div>

      <EditorProvider>
        <Editor
          value={value}
          containerProps={{
            style: {
              resize: "vertical",
              lineHeight: 1.2,
              fontSize: "13.5px",
            },
          }}
          onChange={(e) => {
            setValue(e.target.value);
            onEditChange(e.target.value);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor;
