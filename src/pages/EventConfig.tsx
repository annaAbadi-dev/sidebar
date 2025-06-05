import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventSetupPage from "@/components/EventSetupPage";
import { useParams } from "react-router-dom";
import {
  AppBreadcrumb,
  type BreadcrumbSegmentDef,
} from "../components/BreadCrumbs";
import { Home as HomeIcon } from "lucide-react";

export default function EventConfig() {
  const { id } = useParams();
  const breadcrumbSegments: BreadcrumbSegmentDef[] = [
    { label: "Home", path: "/", icon: HomeIcon },
    { label: "Programs", path: "/programs" },
    { label: "Events" },
    { label: "Configuration" },
    { label: `${id}` }, // Last item is automatically treated as current, no path needed
  ];

  return (
    <div className="space-y-6">
      <AppBreadcrumb segments={breadcrumbSegments} />
      <h1 className="text-xl font-bold">Event #{id} Configuration</h1>
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Overview</TabsTrigger>
          <TabsTrigger value="Configuration">Configuration</TabsTrigger>
          <TabsTrigger value="Metrics">Metrics</TabsTrigger>
          <TabsTrigger value="Reports">Reports</TabsTrigger>
          <TabsTrigger value="Waitlist">Waitlist</TabsTrigger>
        </TabsList>
        <TabsContent value="Overview"></TabsContent>
        <TabsContent value="Configuration">
          <EventSetupPage />
        </TabsContent>
      </Tabs>
    </div>
  );
}
