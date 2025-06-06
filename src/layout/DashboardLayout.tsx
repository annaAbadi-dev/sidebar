// src/layout/DashboardLayout.tsx
// import { SidebarProvider } from "@/components/ui/sidebar";
// import AppSidebar from "../components/Sidebar";
// import { Outlet } from "react-router-dom";

// const DashboardLayout: React.FC = () => {
//   return (
//     <SidebarProvider>
//       <div className="flex h-screen">
//         <AppSidebar />
//         <main className="flex-1 p-6 overflow-auto">
//           <Outlet />
//         </main>
//       </div>
//     </SidebarProvider>
//   );
// };

// export default DashboardLayout;
// src/layout/DashboardLayout.tsx
// src/layout/DashboardLayout.tsx
// Current DashboardLayout.tsx
// src/layout/DashboardLayout.tsx
// src/layout/DashboardLayout.tsx
import AppSidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar"; // <-- Add this import back

const DashboardLayout: React.FC = () => {
  return (
    // Add the provider back as the top-level wrapper
    <SidebarProvider>
      <div className="flex h-screen bg-background w-full">

        {/* This wrapper div controls the sidebar's layout */}
        <div className="w-64 flex-shrink-0 border-r">
          <AppSidebar />
        </div>

        {/* The main content area */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
        
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;