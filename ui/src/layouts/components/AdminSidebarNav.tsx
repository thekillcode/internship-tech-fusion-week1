import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ChevronRight, CircleGauge, Settings, ShoppingCart, type LucideProps } from "lucide-react";
import { Link, useLocation } from "react-router-dom";


interface NavMenuItem {
  title: string;
  url: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  isActive: boolean;
  items?: NavSubMenu[]; // Now allows nested items
}
interface NavSubMenu {
  title: string;
  url: string;
  isActive: boolean;
}
interface NavMenuI {
  admin_routes: NavMenuItem[];
}


const AdminSidebarNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const data: NavMenuI = {
    admin_routes: [
      {
        title: "Dashboard",
        url: "/",
        icon: CircleGauge,
        isActive: false,
        items: []
      },
      {
        title: "POS",
        url: "#",
        icon: ShoppingCart,
        isActive: false,
        items: [
          
          {
            title: "Categories",
            url: "/categories",
            isActive: false,
          }
        ]
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings,
        isActive: false,
        items: [
          {
            title: "Mail Settings",
            url: "/mail-settings",
            isActive: false,
          }
        
        ]
      }
    ],
  }

  const isMenuItemActive = (menuItem: NavMenuItem): boolean => {
    if (menuItem.url === currentPath) return true;
    if (menuItem.items) {
      return menuItem.items.some(subItem => subItem.url === currentPath);
    }
    return false;
  };

  // Function to check if a submenu item is active
  const isSubMenuItemActive = (url: string): boolean => {
    return url === currentPath;
  };

  const routes = data.admin_routes.map(route => ({
    ...route,
    isActive: isMenuItemActive(route),
    items: route.items?.map(item => ({
      ...item,
      isActive: isSubMenuItemActive(item.url)
    }))
  }));
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Genral</SidebarGroupLabel>
      <SidebarMenu className="gap-2">

        {routes.map((route) => route.items?.length ? (
          <Collapsible
            key={route.title}
            asChild
            defaultOpen={route.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={route.title}>
                  {route.icon && <route.icon />}
                  <span className={cn([route.isActive && "font-bold"])}>{route.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {route.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <Link className={cn([subItem.isActive && "font-bold"])} to={subItem.url}>
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        )
          :
          <SidebarMenuItem key={route.title}>
            <SidebarMenuButton asChild>
              <Link to={route.url} className="font-medium">
                {route.icon && <route.icon />}
                <span>{route.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}
        {/* {routes.map((route, i) => (
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href={route.url} className="font-medium">
                {route.icon && <route.icon />}
                <span>{route.title}</span>
              </a>
            </SidebarMenuButton>
            {route?.items?.length ? (
              <SidebarMenuSub>
                {route.items.map((item) => (
                  <SidebarMenuSubItem key={item.title}>
                    <SidebarMenuSubButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            ) : null}

          </SidebarMenuItem>
        ))} */}
      </SidebarMenu>



    </SidebarGroup>
  );
}

export default AdminSidebarNav;