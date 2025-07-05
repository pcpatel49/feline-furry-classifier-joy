
import { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  selectedImage: string | null;
  onReset: () => void;
}

const ImageUpload = ({ onImageUpload, selectedImage, onReset }: ImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        onImageUpload(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">Upload Image</h3>
      
      {!selectedImage ? (
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
            isDragging
              ? 'border-indigo-500 bg-indigo-50'
              : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-lg text-gray-600 mb-2">
            Drop your image here or click to browse
          </p>
          <p className="text-sm text-gray-400">
            Supports JPG, PNG, GIF up to 10MB
          </p>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative rounded-xl overflow-hidden bg-gray-100">
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-64 object-cover"
            />
            <Button
              onClick={onReset}
              variant="secondary"
              size="sm"
              className="absolute top-2 right-2 bg-white/90 hover:bg-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <ImageIcon className="h-4 w-4" />
            <span>Image ready for classification</span>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ImageUpload;
