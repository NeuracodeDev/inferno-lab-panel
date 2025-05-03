
import React from "react";

type Prediction = {
  label: string;
  confidence: number;
};

type ConfidenceBarProps = {
  predictions: Prediction[];
};

const ConfidenceBar = ({ predictions }: ConfidenceBarProps) => {
  // Sort predictions by confidence (highest first)
  const sortedPredictions = [...predictions].sort((a, b) => b.confidence - a.confidence);

  return (
    <div className="space-y-2 w-full">
      {sortedPredictions.map((prediction) => (
        <div key={prediction.label} className="flex items-center">
          <div className="w-20 text-sm text-right pr-2 text-[#D0D0D0]">
            {prediction.label}
          </div>
          <div className="flex-1 h-6 bg-[#101418] rounded overflow-hidden">
            <div
              className="h-full bg-blue-600 flex items-center justify-end px-2 text-xs text-white"
              style={{ width: `${prediction.confidence * 100}%` }}
            >
              {(prediction.confidence * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConfidenceBar;
