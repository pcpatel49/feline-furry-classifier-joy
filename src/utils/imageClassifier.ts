
export interface ImageFeatures {
  aspectRatio: number;
  dominantColors: string[];
  brightness: number;
  contrast: number;
}

export const extractImageFeatures = (imageUrl: string): Promise<ImageFeatures> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData?.data || new Uint8ClampedArray();
      
      // Calculate aspect ratio
      const aspectRatio = img.width / img.height;
      
      // Analyze color distribution and brightness
      let totalBrightness = 0;
      const colorCounts: { [key: string]: number } = {};
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // Calculate brightness
        const brightness = (r * 0.299 + g * 0.587 + b * 0.114);
        totalBrightness += brightness;
        
        // Categorize colors
        const colorCategory = getColorCategory(r, g, b);
        colorCounts[colorCategory] = (colorCounts[colorCategory] || 0) + 1;
      }
      
      const avgBrightness = totalBrightness / (data.length / 4);
      const dominantColors = Object.entries(colorCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)
        .map(([color]) => color);
      
      resolve({
        aspectRatio,
        dominantColors,
        brightness: avgBrightness,
        contrast: calculateContrast(data)
      });
    };
    
    img.src = imageUrl;
  });
};

const getColorCategory = (r: number, g: number, b: number): string => {
  if (r > 200 && g > 200 && b > 200) return 'white';
  if (r < 50 && g < 50 && b < 50) return 'black';
  if (r > g && r > b) return 'red';
  if (g > r && g > b) return 'green';
  if (b > r && b > g) return 'blue';
  if (r > 150 && g > 100 && b < 100) return 'orange';
  if (r > 100 && g > 80 && b < 80) return 'brown';
  return 'gray';
};

const calculateContrast = (data: Uint8ClampedArray): number => {
  let min = 255, max = 0;
  
  for (let i = 0; i < data.length; i += 4) {
    const brightness = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114);
    min = Math.min(min, brightness);
    max = Math.max(max, brightness);
  }
  
  return max - min;
};

export const classifyImage = (features: ImageFeatures): { prediction: 'cat' | 'dog'; confidence: number } => {
  let catScore = 0;
  let dogScore = 0;
  
  // Aspect ratio analysis (cats tend to have rounder faces, dogs more elongated)
  if (features.aspectRatio > 1.2) {
    dogScore += 0.3; // More elongated faces favor dogs
  } else if (features.aspectRatio < 0.9) {
    catScore += 0.2; // Square/round faces favor cats
  }
  
  // Color analysis
  features.dominantColors.forEach(color => {
    switch (color) {
      case 'orange':
      case 'white':
      case 'gray':
        catScore += 0.15; // Common cat colors
        break;
      case 'brown':
      case 'black':
        dogScore += 0.1; // Common dog colors
        break;
    }
  });
  
  // Brightness analysis (cats often have brighter eyes)
  if (features.brightness > 120) {
    catScore += 0.1;
  } else {
    dogScore += 0.1;
  }
  
  // Contrast analysis (dogs often have more varied fur patterns)
  if (features.contrast > 100) {
    dogScore += 0.15;
  } else {
    catScore += 0.1;
  }
  
  // Add some randomness but bias towards the higher score
  const randomFactor = Math.random() * 0.3 - 0.15;
  catScore += randomFactor;
  dogScore -= randomFactor;
  
  // Ensure minimum confidence levels
  const totalScore = Math.max(catScore + dogScore, 1);
  catScore = Math.max(catScore, 0.3);
  dogScore = Math.max(dogScore, 0.3);
  
  const prediction = catScore > dogScore ? 'cat' : 'dog';
  const confidence = Math.min(0.95, Math.max(0.65, Math.abs(catScore - dogScore) + 0.6));
  
  return { prediction, confidence };
};
