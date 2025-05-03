
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
      <label htmlFor="text-input" className="text-sm text-neutral-400 font-medium">
        Input Text:
      </label>
      <textarea
        id="text-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-32 bg-[#101418] text-[#D0D0D0] px-3 py-2 rounded-md border border-neutral-800 resize-y focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600"
        placeholder="Enter text for inference..."
      />
    </div>
  );
};

export default TextInput;
