import DashboardTabs from "@/components/DashboardTabs";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getAuthSession } from "@/libs/auth";
import { redirect, RedirectType } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getAuthSession();
  if (!session) {
    return redirect("/", RedirectType.replace);
  }
  return (
    <MaxWidthWrapper>
      <DashboardTabs key="dash lay" />
      {children}
    </MaxWidthWrapper>
  );
};

export default layout;
