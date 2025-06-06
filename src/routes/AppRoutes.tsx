import { Routes, Route } from "react-router-dom";
import DashboardLayout from "@/layout/DashboardLayout";
import EventsList from "@/pages/EventsList";
import EventConfig from "@/pages/EventConfig";
import TestPage from '@/pages/TestPage';
import { ThemeProvider } from "@/components/theme-provider";

const AppRoutes: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route path="events" element={<EventsList />} />
          <Route path="events/:id" element={<EventConfig />} />
          <Route path="/test" element={<TestPage />} />
          {/* Add other routes here */}
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default AppRoutes;
