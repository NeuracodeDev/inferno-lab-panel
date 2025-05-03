
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
    <div className="bg-[#0A1929]/80 backdrop-blur-md rounded-lg overflow-hidden w-full border border-[#1A365D]/30 shadow-[0_0_15px_rgba(66,153,225,0.15)]">
      <div className="border-b border-[#26416B] p-4 bg-[#0C1E33]/70">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-cyan-200">
            Inference Tester
          </span>
        </h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
        {/* Left Column - Input & Controls */}
        <div className="space-y-5 p-4 bg-[#0C1E33]/50 backdrop-blur-lg rounded-lg border border-[#1A365D]/50">
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
                  ? 'bg-[#234876]/50 text-blue-300/50 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 shadow-[0_0_8px_rgba(66,153,225,0.6)]'}
              `}
            >
              <Play size={18} />
              <span>Run Inference</span>
            </button>
            
            <button
              onClick={handleClear}
              className="px-4 py-2 rounded-md bg-[#1E293B]/60 text-blue-200 hover:bg-[#1E293B] border border-[#334155]/50 transition-colors shadow-[0_0_5px_rgba(66,153,225,0.15)]"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
        
        {/* Right Column - Output & Results */}
        <div className="space-y-5 p-4 bg-[#0C1E33]/50 backdrop-blur-lg rounded-lg border border-[#1A365D]/50">
          {/* Input Preview */}
          {(textInput || imageInput) && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-blue-300">Input Preview:</h3>
              {inputType === "text" ? (
                <div className="p-2 bg-[#081221]/70 border border-[#1A365D]/40 rounded text-sm text-cyan-200 max-h-16 overflow-y-auto">
                  {textInput}
                </div>
              ) : (
                imageInput && (
                  <div className="w-16 h-16 rounded overflow-hidden border border-[#1A365D]/40 shadow-[0_0_5px_rgba(66,153,225,0.3)]">
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
                <h3 className="text-sm font-medium text-blue-300">Prediction:</h3>
                <div className="p-3 bg-[#081221]/70 border border-[#1A365D]/40 rounded shadow-[0_0_10px_rgba(66,153,225,0.2)]">
                  <p className="text-lg font-medium">
                    {inputType === "image" ? "Class Label: " : "Sentiment: "}
                    <span className="text-cyan-300 font-semibold">{mainPrediction.label}</span>
                  </p>
                </div>
              </div>
              
              {/* Confidence Scores */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-blue-300">Confidence Scores:</h3>
                <ConfidenceBar predictions={predictions} />
              </div>
              
              {/* Visualization Placeholder */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-blue-300">Explanation / Visualization:</h3>
                <div className="p-3 bg-[#081221]/70 rounded text-blue-400/60 text-sm flex items-center justify-center h-24 border border-[#1A365D]/40 border-dashed shadow-[0_0_10px_rgba(66,153,225,0.1)]">
                  {inputType === "image" 
                    ? "[Attention Map / Saliency will appear here]"
                    : "[Word importance visualization will appear here]"}
                </div>
              </div>
              
              {/* Performance Metrics */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-blue-300">Metrics:</h3>
                <div className="flex items-center gap-2 p-2 bg-[#081221]/70 border border-[#1A365D]/40 rounded text-sm shadow-[0_0_5px_rgba(66,153,225,0.15)]">
                  <Clock size={16} className="text-blue-400" />
                  <span className="text-blue-200">Inference Time:</span>
                  <span className="text-cyan-300 font-mono">{inferenceTime} ms</span>
                </div>
              </div>
            </>
          )}
          
          {!inferenceComplete && !isRunning && (
            <div className="flex items-center justify-center h-64 text-blue-400/60">
              Run inference to see results
            </div>
          )}
          
          {isRunning && (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="w-8 h-8 border-t-2 border-b-2 border-blue-400 rounded-full animate-spin shadow-[0_0_10px_rgba(66,153,225,0.6)]"></div>
              <p className="mt-4 text-blue-300">Running inference...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InferenceTester;
