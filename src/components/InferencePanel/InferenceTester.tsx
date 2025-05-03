
import React, { useState } from "react";
import ModelSelector from "./ModelSelector";
import InputSelector from "./InputSelector";
import TextInput from "./TextInput";
import ImageInput from "./ImageInput";
import ConfidenceBar from "./ConfidenceBar";
import { Clock, Play, Trash2 } from "lucide-react";

const mockCatPredictions = [
  { label: "Cat", confidence: 0.925 },
  { label: "Dog", confidence: 0.050 },
  { label: "Bird", confidence: 0.015 },
  { label: "Truck", confidence: 0.010 },
];

const mockTextPredictions = [
  { label: "Positive", confidence: 0.78 },
  { label: "Neutral", confidence: 0.15 },
  { label: "Negative", confidence: 0.07 },
];

type InputType = "text" | "image";

const InferenceTester = () => {
  const [selectedModel, setSelectedModel] = useState("cifar10-resnet-best.pth");
  const [inputType, setInputType] = useState<InputType>("image");
  const [textInput, setTextInput] = useState("");
  const [imageInput, setImageInput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [inferenceComplete, setInferenceComplete] = useState(false);
  const [inferenceTime, setInferenceTime] = useState<number | null>(null);

  const handleClear = () => {
    setTextInput("");
    setImageInput(null);
    setInferenceComplete(false);
    setInferenceTime(null);
  };

  const handleRunInference = () => {
    if (!textInput && !imageInput) return;
    
    setIsRunning(true);
    setInferenceComplete(false);
    
    // Simulate inference processing
    setTimeout(() => {
      setIsRunning(false);
      setInferenceComplete(true);
      setInferenceTime(35); // Simulated inference time in ms
    }, 800);
  };

  const predictions = inputType === "image" ? mockCatPredictions : mockTextPredictions;
  const mainPrediction = predictions[0];

  return (
    <div className="bg-[#1A1D21] rounded-lg shadow-lg overflow-hidden w-full">
      <div className="border-b border-neutral-800 p-4">
        <h2 className="text-xl font-semibold text-white">Inference Tester</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
        {/* Left Column - Input & Controls */}
        <div className="space-y-5">
          <ModelSelector 
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
          />
          
          <InputSelector 
            selectedType={inputType}
            onTypeChange={setInputType}
          />
          
          {inputType === "text" ? (
            <TextInput 
              value={textInput}
              onChange={setTextInput}
            />
          ) : (
            <ImageInput 
              image={imageInput}
              onImageChange={setImageInput}
            />
          )}
          
          <div className="flex gap-3">
            <button
              onClick={handleRunInference}
              disabled={isRunning || (!textInput && !imageInput)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition-colors
                ${isRunning || (!textInput && !imageInput) 
                  ? 'bg-neutral-700 text-neutral-400 cursor-not-allowed' 
                  : 'bg-[#2E7D32] text-white hover:bg-green-800'}
              `}
            >
              <Play size={18} />
              <span>⚡ Run Inference</span>
            </button>
            
            <button
              onClick={handleClear}
              className="px-4 py-2 rounded-md bg-neutral-800 text-neutral-300 hover:bg-neutral-700 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
        
        {/* Right Column - Output & Results */}
        <div className="space-y-5 p-4 bg-[#161A1E] rounded-md">
          {/* Input Preview */}
          {(textInput || imageInput) && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-neutral-400">Input Preview:</h3>
              {inputType === "text" ? (
                <div className="p-2 bg-[#101418] rounded text-sm text-[#A0CAE8] max-h-16 overflow-y-auto">
                  {textInput}
                </div>
              ) : (
                imageInput && (
                  <div className="w-16 h-16 rounded overflow-hidden">
                    <img 
                      src={imageInput} 
                      alt="Preview" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                )
              )}
            </div>
          )}
          
          {/* Prediction Output */}
          {inferenceComplete && (
            <>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-neutral-400">Prediction:</h3>
                <div className="p-3 bg-[#101418] rounded">
                  <p className="text-lg font-medium text-[#A0CAE8]">
                    {inputType === "image" ? "Class Label: " : "Sentiment: "}
                    <span className="text-white">{mainPrediction.label}</span>
                  </p>
                </div>
              </div>
              
              {/* Confidence Scores */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-neutral-400">Confidence Scores:</h3>
                <ConfidenceBar predictions={predictions} />
              </div>
              
              {/* Visualization Placeholder */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-neutral-400">Explanation / Visualization:</h3>
                <div className="p-3 bg-[#101418] rounded text-neutral-500 text-sm flex items-center justify-center h-24 border border-dashed border-neutral-700">
                  {inputType === "image" 
                    ? "[Attention Map / Saliency will appear here]"
                    : "[Word importance visualization will appear here]"}
                </div>
              </div>
              
              {/* Performance Metrics */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-neutral-400">Metrics:</h3>
                <div className="flex items-center gap-2 p-2 bg-[#101418] rounded text-sm">
                  <Clock size={16} className="text-neutral-400" />
                  <span className="text-neutral-300">Inference Time:</span>
                  <span className="text-[#A0CAE8] font-mono">{inferenceTime} ms</span>
                </div>
              </div>
            </>
          )}
          
          {!inferenceComplete && !isRunning && (
            <div className="flex items-center justify-center h-64 text-neutral-500">
              Run inference to see results
            </div>
          )}
          
          {isRunning && (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="w-8 h-8 border-t-2 border-blue-500 rounded-full animate-spin"></div>
              <p className="mt-4 text-neutral-400">Running inference...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InferenceTester;
