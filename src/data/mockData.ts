
import { DiseaseResult } from "@/components/AnalysisResult";

// Mock disease detection results
export const mockDiseaseResults: DiseaseResult[] = [
  {
    name: "Diabetic Retinopathy",
    probability: 0.82,
    severity: "high",
    description: "Signs of vascular abnormalities consistent with diabetic retinopathy detected."
  },
  {
    name: "Glaucoma",
    probability: 0.35,
    severity: "medium",
    description: "Possible early signs of optic nerve damage. Further tests recommended."
  },
  {
    name: "Age-related Macular Degeneration",
    probability: 0.15,
    severity: "low",
    description: "Minor indications of macular changes. Low risk detected."
  },
  {
    name: "Cataracts",
    probability: 0.08,
    severity: "none",
    description: "No significant lens opacity detected at this time."
  }
];

// Mock platform features for comparison
export const platformFeatures = [
  {
    name: "Disease Prediction",
    description: "AI-powered diagnosis of eye conditions from uploaded images",
    patients: true,
    doctors: true,
    researchers: true
  },
  {
    name: "Simple Reports",
    description: "AI-generated reports in patient-friendly language",
    patients: true,
    doctors: false,
    researchers: false
  },
  {
    name: "Detailed Analysis",
    description: "In-depth feature importance and risk scoring",
    patients: false,
    doctors: true,
    researchers: true
  },
  {
    name: "Grad-CAM Heatmaps",
    description: "Visual heatmaps showing areas of interest in eye images",
    patients: true,
    doctors: true,
    researchers: true
  },
  {
    name: "AI Chatbot",
    description: "GPT-powered assistant for answering health queries",
    patients: true,
    doctors: false,
    researchers: false
  },
  {
    name: "SHAP & LIME Analysis",
    description: "Advanced explainability tools for model decisions",
    patients: false,
    doctors: true,
    researchers: true
  },
  {
    name: "Research Paper Summaries",
    description: "NLP-based summarization of eye health research",
    patients: false,
    doctors: true,
    researchers: true
  },
  {
    name: "Model Performance Metrics",
    description: "Detailed analytics on AI model accuracy and performance",
    patients: false,
    doctors: false,
    researchers: true
  }
];

// Mock disease trends data for charts
export const diseaseTrendsData = [
  { month: "Jan", diabeticRetinopathy: 45, glaucoma: 60, amd: 35 },
  { month: "Feb", diabeticRetinopathy: 52, glaucoma: 58, amd: 37 },
  { month: "Mar", diabeticRetinopathy: 48, glaucoma: 62, amd: 39 },
  { month: "Apr", diabeticRetinopathy: 51, glaucoma: 65, amd: 41 },
  { month: "May", diabeticRetinopathy: 55, glaucoma: 63, amd: 42 },
  { month: "Jun", diabeticRetinopathy: 59, glaucoma: 64, amd: 40 },
  { month: "Jul", diabeticRetinopathy: 62, glaucoma: 61, amd: 43 },
  { month: "Aug", diabeticRetinopathy: 65, glaucoma: 60, amd: 45 },
  { month: "Sep", diabeticRetinopathy: 68, glaucoma: 63, amd: 47 },
  { month: "Oct", diabeticRetinopathy: 71, glaucoma: 65, amd: 49 },
  { month: "Nov", diabeticRetinopathy: 74, glaucoma: 67, amd: 48 },
  { month: "Dec", diabeticRetinopathy: 77, glaucoma: 69, amd: 50 }
];

// Mock model performance data
export const modelPerformanceData = [
  { model: "ResNet50", accuracy: 0.92, precision: 0.94, recall: 0.89, f1: 0.91 },
  { model: "VGG16", accuracy: 0.88, precision: 0.90, recall: 0.86, f1: 0.88 },
  { model: "DenseNet121", accuracy: 0.91, precision: 0.93, recall: 0.88, f1: 0.90 },
  { model: "ViT-Base", accuracy: 0.94, precision: 0.95, recall: 0.92, f1: 0.93 },
  { model: "EfficientNet", accuracy: 0.90, precision: 0.91, recall: 0.88, f1: 0.89 }
];

// Simulated processing function with delay
export const processImage = (file: File): Promise<{
  results: DiseaseResult[];
  heatmapUrl: string;
}> => {
  return new Promise((resolve) => {
    // Simulating API call delay
    setTimeout(() => {
      // Create a URL for the uploaded image
      const imageUrl = URL.createObjectURL(file);
      
      // Mock heatmap URL (using the same image for demo)
      const heatmapUrl = "https://www.aao.org/Assets/5aa8e572-50b7-419e-adeb-aaa0c4fa0ada/636313430471270000/ai-figure-2-large.jpg";
      
      resolve({
        results: mockDiseaseResults,
        heatmapUrl
      });
    }, 2500); // 2.5 second delay to simulate processing
  });
};
