"use client"

import * as React from "react"
import { cn } from "@monorepo/utils/styles"
import { Plus, ArrowUp } from "lucide-react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onFileSelect?: (file: File) => void;
  onSubmit?: () => void;
  disabled?: boolean;
}

const Create = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, onFileSelect, onSubmit, disabled = false, ...props }, ref) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [textValue, setTextValue] = React.useState('');

    const handleFileClick = () => {
      fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && onFileSelect) {
        onFileSelect(file);
      }
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTextValue(e.target.value);
    };

    return (
      <div className="w-full h-full flex flex-col justify-between items-center p-4 gap-1.5">
        <div className="flex flex-col w-full gap-1.5">
          <textarea
            className="resize-none outline-none border-none bg-transparent min-h-[120px] max-h-[120px] h-[120px] text-sm font-normal font-inter overflow-auto p-4"
            placeholder="Tell me what you want to build..."
            rows={3}
            onChange={handleTextChange}
          />
        </div>
        <div className="flex justify-between w-full">
          <button
            type="button"
            onClick={handleFileClick}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer border border-[rgba(0,0,0,0.12)]"
          >
            <Plus className="w-5 h-5 text-[#cccccc]" />
          </button>
          <button
            type="button"
            onClick={onSubmit}
            disabled={disabled || !textValue.trim()}
            className={cn(
              "w-10 h-10 flex items-center justify-center rounded-full transition-colors cursor-pointer",
              disabled || !textValue.trim() ? "bg-[rgba(0,0,0,0.06)] text-black/15 cursor-not-allowed" : "bg-primary text-white"
            )}
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".png,.jpg,.jpeg,.svg,.html,.css,.js"
          onChange={handleFileChange}
        />
      </div>
    );
  }
);

Create.displayName = "Create";

export { Create };
