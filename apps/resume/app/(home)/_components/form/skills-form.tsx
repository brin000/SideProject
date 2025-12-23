import { useEffect, useState } from "react";
import { useResumeContext } from "@/context/resume-info-provider";
import { SkillType } from "@/types/resume.type";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import { Rating } from "@repo/ui/components/rating";
import { Loader, Plus, X } from "lucide-react";
import { Label } from "@repo/ui/components/label";
import { useUpdateDocument } from "@/hooks/query-hooks/use-document";
import { generateThumbnail } from "@/lib/helper";
import { toast } from "@repo/ui/hooks/use-toast";
const initialState = {
  name: "",
  rating: 0,
};

const SkillsForm = ({ handleNext }: { handleNext: () => void }) => {
  const { resumeInfo, onUpdate } = useResumeContext();
  const { mutateAsync, isPending } = useUpdateDocument();

  const [skillsList, setSkillsList] = useState(() => {
    return resumeInfo?.skills?.length ? resumeInfo.skills : [initialState];
  });

  useEffect(() => {
    if (!resumeInfo) return;

    onUpdate({
      ...resumeInfo,
      skills: skillsList,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skillsList]);

  const handleChange = (
    value: string | number,
    key: keyof SkillType,
    index: number
  ) => {
    setSkillsList((prevState) => {
      const newSkillsList = [...prevState];
      newSkillsList[index] = {
        ...newSkillsList[index],
        [key]: value,
      } as SkillType;
      return newSkillsList;
    });
  };

  const addNewSkill = () => {
    setSkillsList([...skillsList, initialState]);
  };

  const removeSkill = (index: number) => {
    const newList = [...skillsList];
    newList.splice(index, 1);
    setSkillsList(newList);
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(skillsList);
    const thumbnail = await generateThumbnail();

    await mutateAsync(
      {
        currentPosition: 1,
        thumbnail,
        skills: skillsList,
      },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Skills updated successfully",
          });
          handleNext();
        },
      }
    );
  };

  return (
    <div className="w-full">
      <h2 className="text-lg font-bold">Skills</h2>
      <p className="text-sm">Please add your skills to your resume.</p>

      <form onSubmit={handleSubmit}>
        <div className="border w-full h-auto divide-y-[1px] rounded-md px-3 pb-4 my-5">
          {skillsList.map((item, index) => (
            <div key={index}>
              <div className="relative flex justify-between items-center mb-5 pt-4 gap-3">
                {skillsList?.length > 1 && (
                  <Button
                    variant="secondary"
                    type="button"
                    className="size-[20px] text-center rounded-full absolute -top-3 -right-5 "
                    size="icon"
                    disabled={isPending}
                    onClick={() => removeSkill(index)}
                  >
                    <X size="13px" />
                  </Button>
                )}

                <div className="flex-1">
                  <Label>Skill Name</Label>
                  <Input
                    name="name"
                    type="text"
                    placeholder=""
                    required
                    value={item.name || ""}
                    autoComplete="off"
                    onChange={(e) =>
                      handleChange(e.target.value, "name", index)
                    }
                  />
                </div>

                <div className="shrink-0 pt-5">
                  <Rating
                    style={{ maxWidth: 120 }}
                    value={item.rating || 0}
                    isDisabled={!item.name}
                    onChange={(value: number) =>
                      handleChange(value, "rating", index)
                    }
                  />
                </div>
              </div>

              {index === skillsList.length - 1 && skillsList.length < 15 && (
                <Button
                  variant="outline"
                  type="button"
                  className="gap-1 mt-1 text-primary border-primary"
                  onClick={addNewSkill}
                >
                  <Plus size="15px" />
                  Add More Skills
                </Button>
              )}
            </div>
          ))}
        </div>
        <Button type="submit" className="mt-4" disabled={isPending}>
          {isPending && <Loader className="animate-spin size-4" />}
          Saving & Done
        </Button>
      </form>
    </div>
  );
};

export default SkillsForm;
