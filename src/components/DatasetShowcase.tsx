
import { Database, Image as ImageIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

const DatasetShowcase = () => {
  const sampleImages = [
    { id: 1, type: 'cat', emoji: '🐱', label: 'Persian Cat' },
    { id: 2, type: 'dog', emoji: '🐶', label: 'Golden Retriever' },
    { id: 3, type: 'cat', emoji: '🐈', label: 'Tabby Cat' },
    { id: 4, type: 'dog', emoji: '🐕', label: 'Beagle' },
    { id: 5, type: 'cat', emoji: '😺', label: 'Siamese Cat' },
    { id: 6, type: 'dog', emoji: '🦮', label: 'German Shepherd' },
  ];

  return (
    <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-xl">
      <h3 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
        <Database className="h-6 w-6 text-purple-600" />
        Training Dataset
      </h3>
      
      <div className="space-y-4">
        <p className="text-gray-600 text-sm">
          Our SVM model was trained on the famous Kaggle Cats vs Dogs dataset, containing thousands of labeled images.
        </p>
        
        <div className="grid grid-cols-3 gap-3">
          {sampleImages.map((sample) => (
            <div 
              key={sample.id} 
              className="bg-white/70 rounded-lg p-3 text-center hover:bg-white/90 transition-all duration-200 hover:scale-105"
            >
              <div className="text-2xl mb-1">{sample.emoji}</div>
              <div className="text-xs font-medium text-gray-700">{sample.label}</div>
              <div className={`text-xs mt-1 px-2 py-1 rounded-full ${
                sample.type === 'cat' 
                  ? 'bg-orange-100 text-orange-600' 
                  : 'bg-blue-100 text-blue-600'
              }`}>
                {sample.type}
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm bg-white/60 rounded-lg p-4">
          <div className="text-center">
            <ImageIcon className="h-4 w-4 text-purple-600 mx-auto mb-1" />
            <div className="font-semibold text-gray-800">12,500</div>
            <div className="text-gray-600">Cat Images</div>
          </div>
          <div className="text-center">
            <ImageIcon className="h-4 w-4 text-purple-600 mx-auto mb-1" />
            <div className="font-semibold text-gray-800">12,500</div>
            <div className="text-gray-600">Dog Images</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DatasetShowcase;
