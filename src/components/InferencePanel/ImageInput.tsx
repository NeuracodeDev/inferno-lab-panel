
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
      <label className="text-sm text-neutral-400 font-medium">
        Input Image:
      </label>
      <div
        className={cn(
          "w-full h-32 border-2 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer transition-colors",
          image ? "border-green-700 bg-green-900/10" : isDragging ? "border-blue-500 bg-blue-900/20" : "border-neutral-700 bg-[#101418] hover:bg-neutral-800/50"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        {image ? (
          <div className="relative w-full h-full p-2">
            <button 
              className="absolute top-1 right-1 p-1 bg-neutral-800 rounded-full hover:bg-red-900 z-10"
              onClick={clearImage}
            >
              <X size={16} className="text-neutral-200" />
            </button>
            <img 
              src={image} 
              alt="Preview" 
              className="w-full h-full object-contain" 
            />
          </div>
        ) : (
          <>
            <Upload className="w-8 h-8 text-neutral-500" />
            <p className="mt-2 text-sm text-neutral-400">Upload Image or Drag & Drop</p>
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
