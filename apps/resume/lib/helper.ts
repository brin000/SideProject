import { v4 as uuidv4 } from "uuid";
import html2canvas from "html2canvas";


export const generateDocUUID = (): string => {
  // 较短的字符串在建立索引和查询时性能更好
  const uuid = uuidv4().replace(/-/g, "");
  return `doc-${uuid.substring(0, 16)}`;
};

export const generateThumbnail = async () => {
  const resumeElement = document.getElementById(
    "resume-preview-id",
  ) as HTMLElement;

  if (!resumeElement) {
    console.error("Resume preview element not found");
    return;
  }

  try {
    const canvas = await html2canvas(resumeElement);
    const image = canvas.toDataURL("image/png");
    return image;
  } catch (error) {
    console.error("Error generating thumbnail:", error);
  }
};
