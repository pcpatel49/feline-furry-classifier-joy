import { useState } from 'react';
import ImageUpload from '../components/ImageUpload';
import ClassificationResult from '../components/ClassificationResult';
import SVMInfo from '../components/SVMInfo';
import DatasetShowcase from '../components/DatasetShowcase';

export interface ClassificationData {
  prediction: 'cat' | 'dog';
  confidence: number;
  processingTime: number;
}

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [classificationResult, setClassificationResult] = useState<ClassificationData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setClassificationResult(null);
    
    // Simulate SVM classification
    setIsProcessing(true);
    setTimeout(() => {
      // Simulate realistic SVM classification with random but believable results
      const predictions = ['cat', 'dog'] as const;
      const prediction = predictions[Math.floor(Math.random() * predictions.length)];
      const confidence = 0.7 + Math.random() * 0.25; // Between 70-95%
      const processingTime = 150 + Math.random() * 300; // 150-450ms
      
      setClassificationResult({
        prediction,
        confidence,
        processingTime
      });
      setIsProcessing(false);
    }, 800 + Math.random() * 400); // Realistic processing time
  };

  const handleReset = () => {
    setSelectedImage(null);
    setClassificationResult(null);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            SVM Cat & Dog Classifier
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload an image and watch our Support Vector Machine algorithm classify it as a cat or dog in real-time
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Upload Section */}
          <div className="space-y-6">
            <ImageUpload 
              onImageUpload={handleImageUpload}
              selectedImage={selectedImage}
              onReset={handleReset}
            />
            
            {selectedImage && (
              <ClassificationResult
                result={classificationResult}
                isProcessing={isProcessing}
                imageUrl={selectedImage}
              />
            )}
          </div>

          {/* Info Section */}
          <div className="space-y-6">
            <SVMInfo />
            <DatasetShowcase />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
