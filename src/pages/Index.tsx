
import React from "react";
import InferenceTester from "@/components/InferencePanel/InferenceTester";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A192F] to-[#051630] text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-200">
            AI Inference Testing Lab
          </h1>
          <p className="text-blue-300 mt-2">Run model inference and analyze results</p>
        </div>
        <InferenceTester />
      </div>
    </div>
  );
};

export default Index;
