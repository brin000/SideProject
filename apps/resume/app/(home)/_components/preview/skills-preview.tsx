import { INITIAL_THEME_COLOR } from "@/constant/colors";
import { ResumeDataType } from "@/types/resume.type";

interface SkillsPreviewProps {
  isLoading: boolean;
  resumeInfo?: ResumeDataType;
}
const SkillsPreview = ({ isLoading, resumeInfo }: SkillsPreviewProps) => {
  const themeColor = resumeInfo?.themeColor || INITIAL_THEME_COLOR;
  if (isLoading) {
    return <></>;
  }

  return (
    <div className="w-full my-5">
      <h5 className="text-center font-bold mb-2" style={{ color: themeColor }}>
        Skills
      </h5>
      <hr
        className="border-b-[1.5px] my-2"
        style={{ borderColor: themeColor }}
      />
      <div className="grid grid-cols-2 gap-x-10 gap-y-3 my-1 min-h-9">
        {resumeInfo?.skills?.map((skill, index) => (
          <div key={index} className="flex items-center justify-between">
            <h5 className="text-[13px]">{skill.name}</h5>
            {skill.rating && skill.name ? (
              <div className="h-2 bg-gray-200 w-[120px]">
                <div
                  className="h-2"
                  style={{
                    width: `${skill.rating * 20}%`,
                    backgroundColor: themeColor,
                  }}
                />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsPreview;
