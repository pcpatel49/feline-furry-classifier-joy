import { Brain, Clock, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ClassificationData } from '../pages/Index';

interface ClassificationResultProps {
  result: ClassificationData | null;
  isProcessing: boolean;
  imageUrl: string;
}

const ClassificationResult = ({ result, isProcessing, imageUrl }: ClassificationResultProps) => {
  if (isProcessing) {
    return (
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <div className="text-center space-y-4">
          <div className="animate-spin mx-auto">
            <Brain className="h-12 w-12 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Processing Image...</h3>
          <p className="text-gray-600">SVM algorithm is analyzing the image features</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
          </div>
        </div>
      </Card>
    );
  }

  if (!result) return null;

  const confidencePercentage = Math.round(result.confidence * 100);
  const isHighConfidence = result.confidence > 0.8;

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">Classification Result</h3>
      
      <div className="space-y-6">
        {/* Main Result */}
        <div className="text-center p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
          <div className="text-6xl mb-2">
            {result.prediction === 'cat' ? '🐱' : '🐶'}
          </div>
          <h4 className="text-3xl font-bold text-gray-800 capitalize mb-2">
            {result.prediction}
          </h4>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
            isHighConfidence 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            <TrendingUp className="h-4 w-4" />
            {confidencePercentage}% Confidence
          </div>
        </div>

        {/* Confidence Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Confidence Level</span>
            <span>{confidencePercentage}%</span>
          </div>
          <Progress value={confidencePercentage} className="h-3" />
        </div>

        {/* Processing Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Clock className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
            <div className="text-sm text-gray-600">Processing Time</div>
            <div className="font-semibold text-gray-800">{Math.round(result.processingTime)}ms</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Brain className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <div className="text-sm text-gray-600">Algorithm</div>
            <div className="font-semibold text-gray-800">RBF SVM</div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>• Feature extraction using HOG descriptors</p>
          <p>• RBF kernel with γ=0.001, C=100</p>
          <p>• Trained on 25,000 labeled images</p>
        </div>
      </div>
    </Card>
  );
};

export default ClassificationResult;
