import React, { useState } from "react";
import { AlertCircle, ArrowRight, FileText, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ImageUploader from "@/components/ImageUploader";
import AnalysisResult, { DiseaseResult } from "@/components/AnalysisResult";
import ChatInterface from "@/components/ChatInterface";
import Layout from "@/components/Layout";
import { processImage } from "@/data/mockData";

const PatientsModule = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<DiseaseResult[] | null>(null);
  const [heatmapUrl, setHeatmapUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("upload");
  
  const handleImageSelected = (image: File) => {
    setSelectedImage(image);
    setImageUrl(URL.createObjectURL(image));
    // Reset analysis when new image is uploaded
    setResults(null);
    setHeatmapUrl(null);
  };
  
  const handleAnalyzeImage = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    try {
      const { results, heatmapUrl } = await processImage(selectedImage);
      setResults(results);
      setHeatmapUrl(heatmapUrl);
    } catch (error) {
      console.error("Error analyzing image:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleViewDetails = () => {
    // In a real app, this would navigate to a detailed report view
    console.log("View detailed report");
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Patient Portal</h1>
          <p className="text-muted-foreground">
            Upload eye images for AI analysis or ask questions about eye health
          </p>
        </div>
        
        <Alert variant="default" className="bg-primary/5 border-primary/20">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Medical AI Research Platform</AlertTitle>
          <AlertDescription>
            This platform is designed for research and educational purposes.
          </AlertDescription>
        </Alert>
        
        <Tabs defaultValue="upload" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <FileText size={16} />
              <span>Image Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare size={16} />
              <span>AI Assistant</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-6 pt-4">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Upload Eye Image</h2>
              <ImageUploader 
                onImageSelected={handleImageSelected}
                imageTypes={["image/jpeg", "image/png"]}
                label="Upload Fundus or OCT Image"
              />
              
              <div className="flex justify-end">
                <Button
                  onClick={handleAnalyzeImage}
                  disabled={!selectedImage || isAnalyzing}
                  className="flex items-center gap-2"
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Image"}
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>
            
            {(results && imageUrl) ? (
              <div className="pt-4">
                <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
                <AnalysisResult
                  results={results}
                  image={imageUrl}
                  heatmapImage={heatmapUrl || undefined}
                  isLoading={isAnalyzing}
                  onViewDetails={handleViewDetails}
                />
              </div>
            ) : isAnalyzing ? (
              <div className="pt-4">
                <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
                <AnalysisResult
                  results={[]}
                  image=""
                  isLoading={true}
                />
              </div>
            ) : null}
          </TabsContent>
          
          <TabsContent value="chat" className="pt-4">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">AI Health Assistant</h2>
              <p className="text-muted-foreground">
                Ask questions about eye conditions, symptoms, treatments, or preventive care
              </p>
              
              <ChatInterface />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default PatientsModule;
