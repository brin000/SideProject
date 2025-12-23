import { useEffect, useState } from "react";
import { useResumeContext } from "@/context/resume-info-provider";
import { ExperienceType } from "@/types/resume.type";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import { Loader, Plus, X } from "lucide-react";
import { Label } from "@repo/ui/components/label";
import { useUpdateDocument } from "@/hooks/query-hooks/use-document";
import RichTextEditor from "@/components/editor";
import { generateThumbnail } from "@/lib/helper";
import { toast } from "@repo/ui/hooks/use-toast";

const initialState = {
  id: undefined,
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummary: "",
  currentlyWorking: false,
};

const ProfessionForm = ({ handleNext }: { handleNext: () => void }) => {
  const { resumeInfo, onUpdate } = useResumeContext();
  const { mutateAsync, isPending } = useUpdateDocument();

  const [experienceList, setExperienceList] = useState(() => {
    return resumeInfo?.experiences?.length
      ? resumeInfo.experiences
      : [initialState];
  });

  useEffect(() => {
    if (!resumeInfo) return;

    onUpdate({
      ...resumeInfo,
      experiences: experienceList,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [experienceList]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;

    setExperienceList((prevState) => {
      const newExperienceList = [...prevState];
      newExperienceList[index] = {
        ...newExperienceList[index],
        [name]: value,  
      } as ExperienceType;
      return newExperienceList;
    });
  };

  const addNewExperience = () => {
    setExperienceList([...experienceList, initialState]);
  };

  const removeExperience = (index: number) => {
    const newList = [...experienceList];
    newList.splice(index, 1);
    setExperienceList(newList);
  };

  const formFields = [
    { id: "title", type: "text", required: true, label: "Position Title", span: 1 },
    { id: "companyName", type: "text", required: false, label: "Company Name", span: 1 },
    { id: "city", type: "text", required: false, label: "City", span: 1 },
    { id: "state", type: "text", required: false, label: "State", span: 1 },
    { id: "startDate", type: "date", required: false, label: "Start Date", span: 1 },
    { id: "endDate", type: "date", required: false, label: "End Date", span: 1 },
  ] as const;

  const handleEditor = (value: string | undefined, name: string, index: number) => {
    const newList = [...experienceList];
    newList[index] = {
      ...newList[index],
      [name]: value,
    } as ExperienceType;
    setExperienceList(newList);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(experienceList);
    const thumbnail = await generateThumbnail();
    const currentNo = resumeInfo?.currentPosition ? resumeInfo?.currentPosition + 1 : 1;

    await mutateAsync(
      {
        currentPosition: currentNo,
        thumbnail,
        experiences: experienceList,
      },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Experience updated successfully",
          });
          handleNext();
        },
      }
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-lg font-bold">Professional Experience</h2>
      <p className="text-sm">
        Please add your professional experience to your resume.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="border w-full h-auto divide-y-[1px] rounded-md px-3 pb-4 my-5">
          {experienceList.map((item, index) => (
            <div key={index}>
              <div className="relative grid grid-cols-2 mb-5 pt-4 gap-3">
                {experienceList?.length > 1 && (
                  <Button
                    variant="secondary"
                    type="button"
                    className="size-[20px] text-center rounded-full absolute -top-3 -right-5 "
                    size="icon"
                    onClick={() => removeExperience(index)}
                  >
                    <X size="13px" className="text-black-300" />
                  </Button>
                )}

                {formFields.map(({ id, type, label, required }) => (
                  <div key={id}>
                    <Label className="text-sm">
                      {label}
                    </Label>
                    <Input
                      type={type}
                      required={required}
                      placeholder=""
                      autoComplete="off"
                      name={id}
                      value={
                        item[id as (typeof formFields)[number]["id"]] || ""
                      }
                      onChange={(e) => handleChange(e, index)}
                      disabled={resumeInfo?.status === "archived"}
                    />
                  </div>
                ))}

                <div className="col-span-2">
                  <RichTextEditor 
                    jobTitle={item.title}
                    initialValue={item.workSummary || ''}
                    onEditChange={(value) => handleEditor(value, 'workSummary', index)}
                  />
                </div>

                {index === experienceList.length - 1 &&
                  experienceList.length < 5 && (
                    <Button
                      variant="outline"
                      type="button"
                      className="gap-1 mt-1 text-primary border-primary"
                      onClick={addNewExperience}
                    >
                      <Plus size="15px" />
                      Add More Experience
                    </Button>
                  )}
              </div>
            </div>
          ))}
        </div>
        <Button type="submit" className="mt-4" disabled={isPending}>
          {isPending && <Loader className="animate-spin size-4" />}
          Saving Changes
        </Button>
      </form>
    </div>
  );
};

export default ProfessionForm;
