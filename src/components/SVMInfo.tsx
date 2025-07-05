
import { Brain, Target, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';

const SVMInfo = () => {
  return (
    <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-0 shadow-xl">
      <h3 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
        <Brain className="h-6 w-6 text-indigo-600" />
        How SVM Works
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Target className="h-5 w-5 text-indigo-600 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">Feature Extraction</h4>
            <p className="text-sm text-gray-600">
              Images are converted to numerical features using techniques like HOG (Histogram of Oriented Gradients) to capture shape and texture patterns.
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <Zap className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">Decision Boundary</h4>
            <p className="text-sm text-gray-600">
              SVM finds the optimal hyperplane that separates cats from dogs with maximum margin, using support vectors as key reference points.
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <Brain className="h-5 w-5 text-indigo-600 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">RBF Kernel</h4>
            <p className="text-sm text-gray-600">
              The Radial Basis Function kernel allows SVM to handle non-linear patterns by mapping data to higher dimensions.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-white/60 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">Model Performance</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Accuracy:</span>
            <span className="font-semibold text-green-600 ml-2">94.2%</span>
          </div>
          <div>
            <span className="text-gray-600">Training Size:</span>
            <span className="font-semibold text-indigo-600 ml-2">25K images</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SVMInfo;
