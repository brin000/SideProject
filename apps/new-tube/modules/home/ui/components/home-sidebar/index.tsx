import { Sidebar, SidebarContent } from "@repo/ui/components/sidebar";
import { MainSection } from "./main-section";
import { Separator } from "@repo/ui/components/separator";
import { PersonalSection } from "./personal-section";

const HomeSidebar = () => {
  return (
    <Sidebar className="pt-16 z-40 border-none" collapsible="icon">
      <SidebarContent className="bg-background">
        <MainSection />
        <Separator />
        <PersonalSection />
      </SidebarContent>
    </Sidebar>
  );
};

export { HomeSidebar };
