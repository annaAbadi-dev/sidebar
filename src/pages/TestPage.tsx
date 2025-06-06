import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// This is a self-contained component to test the layout in isolation.
export default function TestPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Layout Test Page</h1>

      {/* The Tabs provider wraps everything */}
      <Tabs defaultValue="short_content" className="w-full">
        {/* The toolbar with a stable, full-width flex container */}
        <div className="flex justify-between items-center w-full border-b pb-4">
          {/* Group 1: The TabsList */}
          <TabsList>
            <TabsTrigger value="short_content">Short Content Tab</TabsTrigger>
            <TabsTrigger value="long_content">Long Content Tab</TabsTrigger>
          </TabsList>

          {/* Group 2: The Buttons, correctly wrapped */}
          <div className="flex gap-2">
            <Button variant={'black'}>Test Button 1</Button>
            <Button>Test Button 2</Button>
          </div>
        </div>

        {/* The content area, separate from the toolbar's flexbox */}
        <div className="mt-4">
          <TabsContent value="short_content">
            <p>
              This is the content for the first tab. The header layout should be
              correct.
            </p>
          </TabsContent>
          <TabsContent value="long_content">
            <div className="bg-slate-100 p-4 rounded-md">
              <p>
                This tab has different, longer content to simulate a complex
                component.
              </p>
              <p>
                The header layout above should remain perfectly stable and
                correctly spaced out, regardless of the content here.
              </p>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
