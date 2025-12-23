import { useEffect, useState } from "react";
import { useResumeContext } from "@/context/resume-info-provider";
import { PersonalInfoType } from "@/types/resume.type";
import { generateThumbnail } from "@/lib/helper";
import { useUpdateDocument } from "@/hooks/query-hooks/use-document";
import { toast } from "@repo/ui/hooks/use-toast";

import { Loader } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import PersonalInfoSkeletonLoader from "@/components/skeleton-loader/personal-info-loader";

const initialState: PersonalInfoType = {
  id: undefined,
  firstName: "",
  lastName: "",
  jobTitle: "",
  email: "",
  phone: "",
  address: "",
};

const PersonalInfoForm = ({ handleNext }: { handleNext: () => void }) => {
  const { resumeInfo, onUpdate } = useResumeContext();
  const [personalInfo, setPersonalInfo] = useState(initialState);
  const { mutateAsync, isPending } = useUpdateDocument();

  const isLoading = false;

  useEffect(() => {
    if (resumeInfo?.personalInfo) {
      setPersonalInfo(resumeInfo.personalInfo);
    }
  }, [resumeInfo?.personalInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedInfo = { ...personalInfo, [name]: value };
    setPersonalInfo(updatedInfo);

    if (!resumeInfo) return;
    onUpdate({
      ...resumeInfo,
      personalInfo: updatedInfo,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const thumbnail = await generateThumbnail();

    const currentNo = resumeInfo?.currentPosition
      ? resumeInfo?.currentPosition + 1
      : 1;

    await mutateAsync(
      {
        currentPosition: currentNo,
        thumbnail: thumbnail,
        personalInfo: personalInfo,
      },
      {
        onSuccess() {
          toast({
            title: "Success",
            description: "Personal updated successfully",
          });
          handleNext();
        },
      },
    );
  };

  const formFields = [
    { id: "firstName", label: "First Name", span: 1 },
    { id: "lastName", label: "Last Name", span: 1 },
    { id: "jobTitle", label: "Job Title", span: 1 },
    { id: "address", label: "Address", span: 2 },
    { id: "phone", label: "Phone Number", span: 2 },
  ];

  if (isLoading) {
    return <PersonalInfoSkeletonLoader />;
  }

  return (
    <div>
      <div className="w-full">
        <h2 className="font-bold text-lg">Personal Information</h2>
        <p className="text-sm">Get Started with the personal information</p>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 mt-5 gap-3">
            {formFields.map(({ id, label, span }) => (
              <div key={id} className={span === 2 ? "col-span-2" : ""}>
                <Label htmlFor={id} className="text-sm">
                  {label}
                </Label>
                <Input
                  required
                  id={id}
                  name={id}
                  placeholder=""
                  autoComplete="off"
                  value={personalInfo[id as keyof PersonalInfoType] || ""}
                  onChange={handleChange}
                  disabled={resumeInfo?.status === "archived"}
                />
              </div>
            ))}
          </div>
          <Button
            type="submit"
            className="mt-4"
            disabled={isPending || resumeInfo?.status === "archived"}
          >
            {isPending && <Loader className="animate-spin size-4" />}
            Saving Changes
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
