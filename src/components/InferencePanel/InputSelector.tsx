
import React from "react";
import { FileImage, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

type InputType = "text" | "image";

type InputSelectorProps = {
  selectedType: InputType;
  onTypeChange: (type: InputType) => void;
  className?: string;
};

const InputSelector = ({
  selectedType,
  onTypeChange,
  className,
}: InputSelectorProps) => {
  return (
    <div className={cn("flex space-x-2", className)}>
      <button
        onClick={() => onTypeChange("text")}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
          selectedType === "text"
            ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-[0_0_8px_rgba(66,153,225,0.4)]"
            : "bg-[#081221]/70 text-blue-300 hover:bg-[#0F2942] border border-[#1A365D]/40"
        )}
      >
        <FileText size={18} />
        <span>Text</span>
      </button>
      <button
        onClick={() => onTypeChange("image")}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
          selectedType === "image"
            ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-[0_0_8px_rgba(66,153,225,0.4)]"
            : "bg-[#081221]/70 text-blue-300 hover:bg-[#0F2942] border border-[#1A365D]/40"
        )}
      >
        <FileImage size={18} />
        <span>Image</span>
      </button>
    </div>
  );
};

export default InputSelector;
