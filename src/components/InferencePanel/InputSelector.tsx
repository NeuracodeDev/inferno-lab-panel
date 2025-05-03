
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
            ? "bg-[#2E7D32] text-white"
            : "bg-[#101418] text-[#D0D0D0] hover:bg-neutral-800"
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
            ? "bg-[#2E7D32] text-white"
            : "bg-[#101418] text-[#D0D0D0] hover:bg-neutral-800"
        )}
      >
        <FileImage size={18} />
        <span>Image</span>
      </button>
    </div>
  );
};

export default InputSelector;
