import React from 'react';
import { Tabs as RadixTab, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';
import { Create } from './Create';
import { Upload } from './Upload';
import { PasteCode } from './PasteCode';

interface TabsProps {
  defaultValue?: string;
  className?: string;
  children?: React.ReactNode;
}

const TabsContentClass = "w-full justify-center items-center mt-6 h-60 bg-white rounded-[20px]"

const Tabs = React.forwardRef<HTMLInputElement, TabsProps>(
    ({ defaultValue = "create", className, children }, ref) => {
      return (
        <RadixTab
          defaultValue={defaultValue}
          className={className}
          ref={ref}
        >
          <TabsList className="flex h-12 items-center rounded-lg bg-[#F7F7F8] p-1">
            <TabsTrigger 
              className="flex-1 rounded-[20px] px-3 py-2 text-[15px] font-medium text-gray-500 transition-colors hover:text-gray-900 data-[state=active]:bg-black data-[state=active]:text-white"
              value="create"
            >
              Create
            </TabsTrigger>
            <div className="mx-1 h-4 w-[1px] bg-gray-200" />
            <TabsTrigger 
              className="flex-1 rounded-[20px] px-3 py-2 text-[15px] font-medium text-gray-500 transition-colors hover:text-gray-900 data-[state=active]:bg-black data-[state=active]:text-white"
              value="upload"
            >
              Upload
            </TabsTrigger>
            <div className="mx-1 h-4 w-[1px] bg-gray-200" />
            <TabsTrigger 
              className="flex-1 rounded-[20px] px-3 py-2 text-[15px] font-medium text-gray-500 transition-colors hover:text-gray-900 data-[state=active]:bg-black data-[state=active]:text-white"
              value="pasteCode"
            >
              Paste Code
            </TabsTrigger>
          </TabsList>
          <TabsContent value="create" className={TabsContentClass}>
            <Create 
              className="max-w-md w-full" 
              placeholder='Tell me what you want to build — e.g. "Make me a personal portfolio"'
            />
          </TabsContent>
          <TabsContent value="upload" className={TabsContentClass}>
            <Upload />
          </TabsContent>
          <TabsContent value="pasteCode" className={TabsContentClass}>
            <PasteCode />
          </TabsContent>
        </RadixTab>
      );
    }
  );
  
  Tabs.displayName = "Tabs";
  
  export { Tabs };