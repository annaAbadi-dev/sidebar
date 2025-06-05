import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

// Define the shape of the data this form handles
export interface NameAndDetailsData {
  language: 'EN' | 'FR';
  eventStatus: string;
  listingVisible: boolean;
  listingFeatured: boolean;
  eventNameEn: string;
  eventNameFr: string;
  eventAddress: string;
  eventUrl: string;
  eventWebsite: string;
}

interface NameAndDetailsFormProps {
  initialData: NameAndDetailsData;
  onChange: (data: NameAndDetailsData) => void; // Callback to notify parent of changes
}

export const NameAndDetailsForm: React.FC<NameAndDetailsFormProps> = ({ initialData, onChange }) => {
  const [data, setData] = useState<NameAndDetailsData>(initialData);

  useEffect(() => {
    // This effect ensures the form's local state updates if initialData prop changes.
    // This can happen if the parent component re-fetches or resets data.
    setData(initialData);
  }, [initialData]);

  const handleChange = (field: keyof NameAndDetailsData, value: any) => {
    const updatedData = { ...data, [field]: value };
    setData(updatedData);
    onChange(updatedData); // Propagate changes to the parent component
  };

  const handleCheckboxChange = (field: keyof NameAndDetailsData, checked: boolean | 'indeterminate') => {
    // Shadcn Checkbox onCheckedChange can return 'indeterminate'
    if (typeof checked === 'boolean') {
      handleChange(field, checked);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-1">Name & Details</h2>
      <p className="text-sm text-muted-foreground mb-6">
        All information entered will be displayed on the public registration page for this event.
      </p>

      <div>
        <Label className="text-xs font-semibold text-muted-foreground mb-1 block">LANGUAGE OPTIONS</Label>
        <div className="flex w-min rounded-md border p-0.5 bg-muted/60">
          <Button
            variant={data.language === 'EN' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleChange('language', 'EN')}
            className={`px-4 py-1 h-8 text-xs ${data.language === 'EN' ? 'bg-background shadow-sm' : 'shadow-none text-muted-foreground'}`}
          >
            English (EN)
          </Button>
          <Button
            variant={data.language === 'FR' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleChange('language', 'FR')}
            className={`px-4 py-1 h-8 text-xs ${data.language === 'FR' ? 'bg-background shadow-sm' : 'shadow-none text-muted-foreground'}`}
          >
            French (FR)
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 items-end">
        <div>
          <Label htmlFor="eventStatus" className="text-xs font-semibold text-muted-foreground">EVENT STATUS</Label>
          <Select value={data.eventStatus} onValueChange={(value) => handleChange('eventStatus', value)}>
            <SelectTrigger id="eventStatus" className="h-9 mt-1">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Published">Published</SelectItem>
              <SelectItem value="Archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2.5 pt-1 md:pt-0 self-center mt-3 md:mt-0">
          <div className="flex items-center space-x-2">
            <Checkbox id="listingVisible" checked={data.listingVisible} onCheckedChange={(checked) => handleCheckboxChange('listingVisible', checked)} />
            <Label htmlFor="listingVisible" className="text-sm font-normal cursor-pointer">Listing Visible</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="listingFeatured" checked={data.listingFeatured} onCheckedChange={(checked) => handleCheckboxChange('listingFeatured', checked)} />
            <Label htmlFor="listingFeatured" className="text-sm font-normal cursor-pointer">Listing Featured</Label>
          </div>
        </div>
      </div>

      {data.language === 'EN' && (
        <div className="space-y-1">
          <Label htmlFor="eventNameEn" className="text-xs font-semibold text-muted-foreground">EVENT NAME (EN)</Label>
          <Input id="eventNameEn" value={data.eventNameEn} onChange={(e) => handleChange('eventNameEn', e.target.value)} className="h-9"/>
        </div>
      )}
      {data.language === 'FR' && (
        <div className="space-y-1">
          <Label htmlFor="eventNameFr" className="text-xs font-semibold text-muted-foreground">EVENT NAME (FR)</Label>
          <Input id="eventNameFr" value={data.eventNameFr} onChange={(e) => handleChange('eventNameFr', e.target.value)} className="h-9" placeholder="Nom de l'événement"/>
        </div>
      )}

       <div className="space-y-1">
          <Label htmlFor="eventAddress" className="text-xs font-semibold text-muted-foreground">EVENT ADDRESS</Label>
          <Input id="eventAddress" value={data.eventAddress} onChange={(e) => handleChange('eventAddress', e.target.value)} className="h-9"/>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
              <Label htmlFor="eventUrl" className="text-xs font-semibold text-muted-foreground">EVENT URL</Label>
              <Input id="eventUrl" value={data.eventUrl} onChange={(e) => handleChange('eventUrl', e.target.value)} className="h-9"/>
          </div>
          <div className="space-y-1">
              <Label htmlFor="eventWebsite" className="text-xs font-semibold text-muted-foreground">EVENT WEBSITE</Label>
              <Input id="eventWebsite" placeholder="http://" value={data.eventWebsite} onChange={(e) => handleChange('eventWebsite', e.target.value)} className="h-9"/>
          </div>
      </div>
    </div>
  );
};