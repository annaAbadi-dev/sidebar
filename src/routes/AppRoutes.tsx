import { Routes, Route } from "react-router-dom";
import DashboardLayout from "@/layout/DashboardLayout";
import EventsList from "@/pages/EventsList";
import EventConfig from "@/pages/EventConfig";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route path="events" element={<EventsList />} />
        <Route path="events/:id" element={<EventConfig />} />
        {/* Add other routes here */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
