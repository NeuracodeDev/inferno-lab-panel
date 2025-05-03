
import React from "react";
import InferenceTester from "@/components/InferencePanel/InferenceTester";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#14171A] text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <InferenceTester />
      </div>
    </div>
  );
};

export default Index;
