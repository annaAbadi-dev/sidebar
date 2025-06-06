import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // If using URL params for eventId
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle2, ChevronRight, Search } from "lucide-react";

import {
  NameAndDetailsForm,
  type NameAndDetailsData,
} from "@/components/events/forms/NameAndDetailsForm";

export interface ConfigStep {
  id: string; // Corresponds to a key in EventFormData
  label: string;
  isOptional?: boolean;
  isCompleted?: boolean;
}

interface EventFormData {
  "name-details"?: NameAndDetailsData; // Key matches ConfigStep id
  financials?: any; // Replace 'any' with FinancialsData once defined
  permissions?: any; // Replace 'any' with PermissionsData once defined
  // ... other steps data
}

export default function EventSetupPage() {
  const { eventId } = useParams<{ eventId: string }>(); // Example: if event ID comes from URL
  const [currentEventName, setCurrentEventName] = useState(
    "Demo AC Competition"
  ); // Placeholder

  const initialSteps: ConfigStep[] = [
    { id: "name-details", label: "Name & Details" },
    { id: "financials", label: "Financials", isCompleted: false },
    { id: "permissions", label: "Permissions" },
    { id: "registrations", label: "Registrations", isCompleted: false },
    { id: "registration-rules", label: "Registration Rules", isOptional: true },
    { id: "data-requirements", label: "Data Requirements", isOptional: true },
    { id: "design-form", label: "Design Form", isOptional: true },
    {
      id: "general-ledger-codes",
      label: "General Ledger Codes",
      isOptional: true,
    },
    { id: "notifications", label: "Notifications", isOptional: true },
  ];

  const [configSteps, setConfigSteps] = useState<ConfigStep[]>(initialSteps);
  const [activeStepId, setActiveStepId] = useState<string>("name-details");

  const [formData, setFormData] = useState<EventFormData>({
    "name-details": {
      language: "EN",
      eventStatus: "Draft",
      listingVisible: false,
      listingFeatured: false,
      eventNameEn: "Demo AC Competition", // Default or fetched
      eventNameFr: "",
      eventAddress: "1600 Pennsylvania Avenue NW, Washington, DC 20500", // Default or fetched
      eventUrl: "3138-demo-ac-competition", // Default or fetched
      eventWebsite: "",
    },
    // Initialize other steps' data here if needed
  });
  const [unsavedChanges, setUnsavedChanges] = useState<Record<string, boolean>>(
    {}
  );

  // Effect to potentially load data when eventId changes (if applicable)
  useEffect(() => {
    if (eventId) {
      // console.log("Fetching or setting up data for event:", eventId);
      // Here you would typically:
      // 1. Fetch event data from an API using eventId.
      // 2. Update setCurrentEventName.
      // 3. Populate setFormData with the fetched data.
      // 4. Update setConfigSteps if completion status comes from the backend.
    }
  }, [eventId]);

  const handleNavItemClick = (stepId: string) => {
    setActiveStepId(stepId);
  };

  const handleDataChange = (stepId: keyof EventFormData, newData: any) => {
    setFormData((prev) => ({ ...prev, [stepId]: newData }));
    setUnsavedChanges((prev) => ({ ...prev, [stepId]: true }));
  };

  const handleSaveChanges = (stepId: string) => {
    console.log(
      `Saving data for ${stepId}:`,
      formData[stepId as keyof EventFormData]
    );
    // TODO: Implement actual save logic (e.g., API call)
    // On successful save:
    setConfigSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === stepId ? { ...step, isCompleted: true } : step
      )
    );
    setUnsavedChanges((prev) => ({ ...prev, [stepId]: false }));
    // alert(`${configSteps.find(s => s.id === stepId)?.label} saved successfully!`);
  };

  const handleCancelChanges = (stepId: string) => {
    console.log(`Cancelling changes for ${stepId}`);
    // TODO: Implement robust revert logic. This might involve:
    // 1. Keeping a copy of the original data for the step.
    // 2. Re-fetching data from the server for that step.
    // For now, just clears the unsaved flag and potentially resets to initial (if simple)
    // This example doesn't store a deep "original" state for revert, so formData isn't reverted here.
    setUnsavedChanges((prev) => ({ ...prev, [stepId]: false }));
    // If you have a mechanism to get the last saved state of formData[stepId], apply it here.
  };

  const requiredSteps = configSteps.filter((step) => !step.isOptional);
  const optionalSteps = configSteps.filter((step) => step.isOptional);

  const CurrentFormComponent = () => {
    const activeStepData = formData[activeStepId as keyof EventFormData];

    switch (activeStepId) {
      case "name-details":
        return (
          <NameAndDetailsForm
            initialData={
              (activeStepData as NameAndDetailsData) || {
                /* default empty state */ language: "EN",
                eventStatus: "Draft",
                listingVisible: false,
                listingFeatured: false,
                eventNameEn: "",
                eventNameFr: "",
                eventAddress: "",
                eventUrl: "",
                eventWebsite: "",
              }
            }
            onChange={(newData) => handleDataChange("name-details", newData)}
          />
        );
      // case 'financials':
      //   return (
      //     <FinancialsForm
      //       initialData={activeStepData as FinancialsData || { /* default */ }}
      //       onChange={(newData) => handleDataChange('financials', newData)}
      //     />
      //   );
      // ... Add cases for other form components
      default:
        return (
          <div className="p-4">
            Select a step to configure. (Form for{" "}
            {configSteps.find((s) => s.id === activeStepId)?.label} -
            Placeholder)
          </div>
        );
    }
  };

  return (
    // Replace 'theme_header_height' with actual header height e.g., '4rem', '64px'
    <div className="flex h-[calc(100vh-theme_header_height)] bg-muted/30">
      {/* Left Navigation Sidebar */}
      <div className="w-72 flex-shrink-0 border-r bg-background p-4 flex flex-col space-y-4">
        <h2 className="text-lg font-semibold px-2">{currentEventName} Setup</h2>{" "}
        {/* Or generic "Event Setup" */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search event setup..." className="pl-9 h-9" />{" "}
          {/* Adjusted padding for icon */}
        </div>
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground tracking-wide px-2 mb-1">
            REQUIRED STEPS
          </h3>
          {requiredSteps.map((step) => (
            <Button
              key={step.id}
              variant={activeStepId === step.id ? "secondary" : "ghost"}
              className={`w-full justify-between h-auto m-2 py-2.5 px-4 text-sm rounded-md ${
                activeStepId === step.id
                  ? "font-semibold text-primary"
                  : "font-normal text-foreground"
              }`}
              onClick={() => handleNavItemClick(step.id)}
            >
              <span className="flex items-center">
                {step.isCompleted && (
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-600 flex-shrink-0" />
                )}
                {!step.isCompleted && (
                  <span className="w-4 h-4 mr-2 flex-shrink-0"></span>
                )}{" "}
                {/* Placeholder for alignment */}
                {step.label}
              </span>
              {activeStepId === step.id && (
                <ChevronRight className="h-4 w-4 text-primary flex-shrink-0" />
              )}
            </Button>
          ))}
        </div>
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground tracking-wide px-2 mb-1 mt-3">
            OPTIONAL STEPS
          </h3>
          {optionalSteps.map((step) => (
            <Button
              key={step.id}
              variant={activeStepId === step.id ? "secondary" : "ghost"}
              className={`w-full justify-between h-auto m-2 py-2.5 px-2 text-sm rounded-md ${
                activeStepId === step.id
                  ? "font-semibold text-primary"
                  : "font-normal text-foreground"
              }`}
              onClick={() => handleNavItemClick(step.id)}
            >
              <span className="flex items-center">
                {step.isCompleted && (
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-600 flex-shrink-0" />
                )}
                {!step.isCompleted && (
                  <span className="w-4 h-4 mr-2 flex-shrink-0"></span>
                )}{" "}
                {/* Placeholder for alignment */}
                {step.label}
              </span>
              {activeStepId === step.id && (
                <ChevronRight className="h-4 w-4 text-primary flex-shrink-0" />
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {" "}
        {/* Added overflow-hidden here */}
        <ScrollArea className="flex-1 p-6 pb-12">
          {" "}
          {/* Main content scrolls, added more bottom padding */}
          <div>
            {" "}
            {/* Optional: constrain width of form content */}
            <CurrentFormComponent />
          </div>
        </ScrollArea>
        {/* Footer for Save/Cancel */}
        <div className="border-t bg-background p-4 flex justify-between items-center flex-shrink-0">
          <div>
            {unsavedChanges[activeStepId] && (
              <span className="text-sm text-muted-foreground">
                Status: Unsaved Changes
              </span>
            )}
            {!unsavedChanges[activeStepId] &&
              configSteps.find((s) => s.id === activeStepId)?.isCompleted && (
                <span className="text-sm text-green-600">
                  Status: Changes saved
                </span>
              )}
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => handleCancelChanges(activeStepId)}
              className="h-9"
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleSaveChanges(activeStepId)}
              disabled={!unsavedChanges[activeStepId]}
              className="h-9"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
