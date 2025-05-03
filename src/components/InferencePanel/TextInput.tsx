
import React from "react";
import { cn } from "@/lib/utils";

type TextInputProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

const TextInput = ({ value, onChange, className }: TextInputProps) => {
  return (
    <div className={cn("flex flex-col gap-1 w-full", className)}>
      <label htmlFor="text-input" className="text-sm text-blue-300 font-medium">
        Input Text:
      </label>
      <textarea
        id="text-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-32 bg-[#081221] text-cyan-100 px-3 py-2 rounded-md border border-[#1A365D] resize-y focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-[0_0_5px_rgba(66,153,225,0.15)]"
        placeholder="Enter text for inference..."
      />
    </div>
  );
};

export default TextInput;
