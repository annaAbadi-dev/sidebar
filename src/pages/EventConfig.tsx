import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventSetupPage from "@/components/EventSetupPage";
import { useParams } from "react-router-dom";
import {
  AppBreadcrumb,
  type BreadcrumbSegmentDef,
} from "../components/BreadCrumbs";
import { Home as HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <div className="px-4 sm:px-6 lg:px-8">
      <Tabs defaultValue="Configuration">
        SECTION 1: The entire page header, including breadcrumbs and the toolbar
        <div>
          <AppBreadcrumb segments={breadcrumbSegments} />
          <h1 className="text-xl font-bold my-4">Event #{id} Configuration</h1>

          <div className="flex justify-between items-center w-full">
            <TabsList>
              <TabsTrigger value="Overview">Overview</TabsTrigger>
              <TabsTrigger value="Configuration">Configuration</TabsTrigger>
              <TabsTrigger value="Metrics">Metrics</TabsTrigger>
              <TabsTrigger value="Reports">Reports</TabsTrigger>
              <TabsTrigger value="Waitlist">Waitlist</TabsTrigger>
            </TabsList>

            <div className="flex gap-2">
              <Button variant={"black"}>Copy Registration</Button>
              <Button>Go Live</Button>
            </div>
          </div>
        </div>

        {/* SECTION 2: The content area */}
        <div className="mt-6">
          <TabsContent value="Overview">
            <p>Overview content goes here.</p>
          </TabsContent>
          <TabsContent value="Configuration">
            <EventSetupPage />
          </TabsContent>
          <TabsContent value="Metrics">
            <p>Metrics content goes here.</p>
          </TabsContent>
          <TabsContent value="Reports">
            <p>Reports content goes here.</p>
          </TabsContent>
          <TabsContent value="Waitlist">
            <p>Waitlist content goes here.</p>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
