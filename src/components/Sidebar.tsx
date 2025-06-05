import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
} from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";
import { Calendar, Home, Users, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { type FC } from "react";

interface NavItem {
  name: string;
  icon: FC<{ className?: string }>;
  path: string;
}

const navItems: NavItem[] = [
  { name: "Events", icon: Calendar, path: "/events" },
  { name: "Programs", icon: Home, path: "/programs" },
  { name: "Memberships", icon: Users, path: "/memberships" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

const AppSidebar: React.FC = () => {
  const location = useLocation();

  return (
    <Sidebar className="border-r h-screen">
      <SidebarHeader>
        <h2 className="text-lg font-semibold p-4">My App</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {navItems.map(({ name, icon: Icon, path }) => {
            const isActive = location.pathname.startsWith(path);
            return (
              <Link
                to={path}
                key={path}
                className={`flex items-center px-4 py-2 rounded hover:bg-gray-100 ${
                  isActive ? "bg-gray-200 font-medium" : ""
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {name}
              </Link>
            );
          })}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <p className="text-sm p-4">© 2025 My Company</p>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
