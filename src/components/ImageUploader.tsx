
import React, { useState } from "react";
import { UploadCloud, X, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface ImageUploaderProps {
  onImageSelected: (image: File) => void;
  imageTypes?: string[];
  label?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelected,
  imageTypes = ["image/jpeg", "image/png"],
  label = "Upload Image"
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const validateFile = (file: File): boolean => {
    if (!file) return false;
    
    if (!imageTypes.includes(file.type)) {
      setError(`Invalid file type. Please upload ${imageTypes.join(", ")}`);
      return false;
    }
    
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setError("File size too large. Maximum size is 10MB");
      return false;
    }
    
    setError(null);
    return true;
  };
  
  const processFile = (file: File) => {
    if (validateFile(file)) {
      setPreview(URL.createObjectURL(file));
      onImageSelected(file);
      toast({
        title: "Image uploaded",
        description: "Your image has been uploaded successfully.",
        variant: "default",
      });
    } else {
      toast({
        title: "Upload failed",
        description: error || "Failed to upload image",
        variant: "destructive",
      });
    }
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };
  
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all",
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20",
          preview ? "h-auto" : "h-64",
          "flex flex-col items-center justify-center"
        )}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept={imageTypes.join(",")}
          onChange={handleFileChange}
        />
        
        {preview ? (
          <div className="relative w-full">
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 rounded-full"
              onClick={clearImage}
            >
              <X size={16} />
            </Button>
            <img
              src={preview}
              alt="Preview"
              className="max-h-64 mx-auto object-contain rounded-md"
            />
            <div className="mt-2 flex items-center justify-center text-sm text-green-600 gap-1">
              <Check size={16} />
              <span>Image ready for analysis</span>
            </div>
          </div>
        ) : (
          <>
            <UploadCloud
              className="h-12 w-12 text-muted-foreground mb-2"
              strokeWidth={1.5}
            />
            <h3 className="text-lg font-medium mb-1">{label}</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Drag & drop your image here or click to browse
            </p>
            <Button variant="outline" size="sm">
              Select Image
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              Supported formats: {imageTypes.map(type => type.split('/')[1]).join(', ')}
            </p>
          </>
        )}
      </div>
      
      {error && (
        <div className="mt-2 text-sm text-destructive flex items-center gap-1">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
