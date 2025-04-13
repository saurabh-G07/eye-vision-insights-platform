
import React from "react";
import {
  AlertCircle,
  CheckCircle,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export interface DiseaseResult {
  name: string;
  probability: number;
  severity: "low" | "medium" | "high" | "none";
  description: string;
}

interface AnalysisResultProps {
  results: DiseaseResult[];
  image: string;
  heatmapImage?: string;
  isLoading?: boolean;
  onViewDetails?: () => void;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({
  results,
  image,
  heatmapImage,
  isLoading = false,
  onViewDetails
}) => {
  const highestRisk = React.useMemo(() => {
    return results.reduce((prev, current) => 
      prev.probability > current.probability ? prev : current
    );
  }, [results]);
  
  const severityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-destructive";
      case "medium": return "text-medical-yellow";
      case "low": return "text-medical-green";
      default: return "text-muted-foreground";
    }
  };

  const probabilityColor = (prob: number) => {
    if (prob >= 0.7) return "text-destructive";
    if (prob >= 0.4) return "text-medical-yellow";
    return "text-medical-green";
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>
              AI-powered assessment of eye conditions
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {isLoading ? (
              <div className="space-y-2 animate-pulse">
                <div className="h-4 w-3/4 bg-muted rounded"></div>
                <div className="h-10 bg-muted rounded"></div>
                <div className="h-4 w-1/2 bg-muted rounded"></div>
                <div className="h-10 bg-muted rounded"></div>
              </div>
            ) : (
              <>
                <div className="mb-4 flex items-center gap-2">
                  {highestRisk.severity === "high" ? (
                    <AlertCircle className="h-5 w-5 text-destructive" />
                  ) : highestRisk.severity === "medium" ? (
                    <Info className="h-5 w-5 text-medical-yellow" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-medical-green" />
                  )}
                  <span className="font-medium">
                    Primary finding: {highestRisk.name}
                  </span>
                </div>
                
                <div className="space-y-4">
                  {results.map((result, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="font-medium">{result.name}</span>
                        <span className={probabilityColor(result.probability)}>
                          {Math.round(result.probability * 100)}%
                        </span>
                      </div>
                      <Progress value={result.probability * 100} className="h-2" />
                      <p className="text-sm text-muted-foreground">
                        {result.description}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
          
          <CardFooter>
            <Button
              onClick={onViewDetails}
              disabled={isLoading}
              className="w-full"
            >
              View Detailed Report
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Visual Analysis</CardTitle>
            <CardDescription>
              Original image and AI heatmap visualization
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {isLoading ? (
              <div className="aspect-square bg-muted rounded animate-pulse"></div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Original Image</h4>
                  <div className="rounded-md border overflow-hidden">
                    <img 
                      src={image} 
                      alt="Eye scan" 
                      className="w-full object-cover"
                    />
                  </div>
                </div>
                
                {heatmapImage && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">
                      Grad-CAM Heatmap
                    </h4>
                    <div className="rounded-md border overflow-hidden">
                      <img 
                        src={heatmapImage} 
                        alt="AI heatmap" 
                        className="w-full object-cover"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Highlighted areas show regions of interest for AI diagnosis
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalysisResult;
