import { useEffect, useState } from "react";
import { useResumeContext } from "@/context/resume-info-provider";
import { EducationType } from "@/types/resume.type";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import { Loader, Plus, X } from "lucide-react";
import { Label } from "@repo/ui/components/label";
import { useUpdateDocument } from "@/hooks/query-hooks/use-document";
import { generateThumbnail } from "@/lib/helper";
import { toast } from "@repo/ui/hooks/use-toast";

const initialState = {
  id: undefined,
  docId: undefined,
  universityName: "",
  startDate: "",
  endDate: "",
  degree: "",
  major: "",
  description: "",
};

const EducationForm  = ({ handleNext }: { handleNext: () => void }) => {
  const { resumeInfo, onUpdate } = useResumeContext();
  const { mutateAsync, isPending } = useUpdateDocument();

  const [educationList, setEducationList] = useState(() => {
    return resumeInfo?.educations?.length
      ? resumeInfo.educations
      : [initialState];
  });

  useEffect(() => {
    if (!resumeInfo) return;

    onUpdate({
      ...resumeInfo,
      educations: educationList,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [educationList]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;

    setEducationList((prevState) => {
      const newEducationList = [...prevState];
      newEducationList[index] = {
        ...newEducationList[index],
        [name]: value,  
      } as EducationType;
      return newEducationList;
    });
  };

  const addNewEducation = () => {
    setEducationList([...educationList, initialState]);
  };

  const removeEducation = (index: number) => {
    const newList = [...educationList];
    newList.splice(index, 1);
    setEducationList(newList);
  };

  const formFields = [
    { id: "universityName", type: "text", required: true, label: "University Name", span: 2 },
    { id: "degree", type: "text", required: false, label: "Degree", span: 1 },
    { id: "major", type: "text", required: false, label: "Major", span: 1 },
    { id: "startDate", type: "date", required: false, label: "Start Date", span: 1 },
    { id: "endDate", type: "date", required: false, label: "End Date", span: 1 },
    { id: "description", type: "textarea", required: false, label: "Description", span: 2 },
  ] as const;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(educationList);
    const thumbnail = await generateThumbnail();
    const currentNo = resumeInfo?.currentPosition ? resumeInfo?.currentPosition + 1 : 1;

    await mutateAsync(
      {
        currentPosition: currentNo,
        thumbnail,
        educations: educationList,
      },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Education updated successfully",
          });
          handleNext();
        },
      }
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-lg font-bold">Education</h2>
      <p className="text-sm">
        Please add your education to your resume.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="border w-full h-auto divide-y-[1px] rounded-md px-3 pb-4 my-5">
          {educationList.map((item, index) => (
            <div key={index}>
              <div className="relative grid grid-cols-2 mb-5 pt-4 gap-3">
                {educationList?.length > 1 && (
                  <Button
                    variant="secondary"
                    type="button"
                    className="size-[20px] text-center rounded-full absolute -top-3 -right-5 "
                    size="icon"
                    onClick={() => removeEducation(index)}
                  >
                    <X size="13px" className="text-black-300" />
                  </Button>
                )}

                {formFields.map(({ id, type, label, required, span }) => (
                  <div key={id} className={`col-span-${span}`}>
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


                {index === educationList.length - 1 &&
                    educationList.length < 5 && (
                    <Button
                      variant="outline"
                      type="button"
                      className="gap-1 mt-1 text-primary border-primary"
                      onClick={addNewEducation}
                    >
                      <Plus size="15px" />
                      Add More Education
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

export default EducationForm;
