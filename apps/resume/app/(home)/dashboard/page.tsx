import AddResume from "../_components/add-resume";
import ResumeList from "../_components/resume-list";

const DashboardPage = () => {
  return (
    <div className="w-full">
      <div className="w-full mx-auto max-w-7xl py-5 px-5 ">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">Resume Builder</h1>
            <p className="text-base dark:text-inherit text-muted-foreground">
              Create your resume with ease and get the job you deserve.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            {/* <h5 className=""> </h5> */}
          </div>
        </div>

        <div className="w-full pt-11">
          <h5 className="text-xl font-semibold dark:text-inherit mb-3">
            All Resumes
          </h5>
          <div className="flex flex-wrap w-full gap-5">
            <AddResume />
            <ResumeList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
