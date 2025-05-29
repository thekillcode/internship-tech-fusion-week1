
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "./components/AdminSidebar";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectDarkMode, toggleDarkMode } from "@/store/darkModeSlice";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";


const AdminLayout = () => {
  const darkmode = useAppSelector(selectDarkMode)
  const dispatch  = useAppDispatch()

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 pr-8 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <Button variant={"outline"} onClick={()=>dispatch(toggleDarkMode())}>
            {darkmode ? <Sun /> : <Moon />}
          </Button>
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}

export default AdminLayout;