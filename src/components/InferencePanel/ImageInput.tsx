
import React, { useState, useRef } from "react";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ImageInputProps = {
  image: string | null;
  onImageChange: (image: string | null) => void;
  className?: string;
};

const ImageInput = ({ image, onImageChange, className }: ImageInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleImageFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleImageFile(file);
    }
  };

  const handleImageFile = (file: File) => {
    if (!file.type.match('image.*')) {
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      onImageChange(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={cn("flex flex-col gap-1 w-full", className)}>
      <label className="text-sm text-blue-300 font-medium">
        Input Image:
      </label>
      <div
        className={cn(
          "w-full h-32 border-2 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer transition-colors",
          image 
            ? "border-cyan-700/70 bg-cyan-900/10 shadow-[0_0_8px_rgba(66,153,225,0.2)]" 
            : isDragging 
              ? "border-blue-500/70 bg-blue-900/20 shadow-[0_0_8px_rgba(66,153,225,0.3)]" 
              : "border-[#1A365D]/60 bg-[#081221]/70 hover:bg-[#0F2942]/50 shadow-[0_0_5px_rgba(66,153,225,0.1)]"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        {image ? (
          <div className="relative w-full h-full p-2">
            <button 
              className="absolute top-1 right-1 p-1 bg-[#081221]/90 rounded-full hover:bg-red-900/80 z-10 shadow-[0_0_5px_rgba(66,153,225,0.3)]"
              onClick={clearImage}
            >
              <X size={16} className="text-blue-200" />
            </button>
            <img 
              src={image} 
              alt="Preview" 
              className="w-full h-full object-contain" 
            />
          </div>
        ) : (
          <>
            <Upload className="w-8 h-8 text-blue-400" />
            <p className="mt-2 text-sm text-blue-300">Upload Image or Drag & Drop</p>
          </>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ImageInput;
