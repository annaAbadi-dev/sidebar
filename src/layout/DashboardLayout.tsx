// src/layout/DashboardLayout.tsx
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
