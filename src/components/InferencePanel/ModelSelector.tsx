
import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type ModelSelectorProps = {
  selectedModel: string;
  onModelChange: (model: string) => void;
  className?: string;
};

const ModelSelector = ({
  selectedModel,
  onModelChange,
  className,
}: ModelSelectorProps) => {
  const models = [
    "cifar10-resnet-best.pth",
    "onnx-mobilenet-v2.onnx",
    "transformer-gpt2-small.pt",
    "yolov5-medium.pt",
  ];

  return (
    <div className={cn("flex flex-col gap-1 w-full", className)}>
      <label htmlFor="model-select" className="text-sm text-neutral-400 font-medium">
        Model/Checkpoint:
      </label>
      <div className="relative">
        <select
          id="model-select"
          value={selectedModel}
          onChange={(e) => onModelChange(e.target.value)}
          className="w-full bg-[#101418] text-[#D0D0D0] px-3 py-2 rounded-md border border-neutral-800 appearance-none focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600"
        >
          {models.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ChevronDown className="h-4 w-4 text-neutral-400" />
        </div>
      </div>
    </div>
  );
};

export default ModelSelector;
