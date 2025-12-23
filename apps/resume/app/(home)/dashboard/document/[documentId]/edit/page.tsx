import EditResume from "@/app/(home)/_components/edit-resume";
import { ResumeInfoProvider } from "@/context/resume-info-provider";

function Page() {
  return (
    <div>
      <ResumeInfoProvider>
        <EditResume />
      </ResumeInfoProvider>
    </div>
  );
}

export default Page;
