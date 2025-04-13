import React, { useState } from "react";
import {
  FileBarChart,
  Layers,
  HelpCircle,
  AlertCircle,
  Lightbulb,
  BookOpenCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/Layout";
import { mockDiseaseResults } from "@/data/mockData";

const DoctorsModule = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Doctor's Portal</h1>
          <p className="text-muted-foreground">
            Access advanced AI analysis with detailed explanations for clinical decision support
          </p>
        </div>
        
        <Alert variant="default" className="bg-primary/5 border-primary/20">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Medical AI Research Platform</AlertTitle>
          <AlertDescription>
            This platform is designed for research and educational purposes.
          </AlertDescription>
        </Alert>
        
        {/* Patient case overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpenCheck className="h-5 w-5 text-medical-green" />
              Patient Case Overview
            </CardTitle>
            <CardDescription>Patient ID: PAT-2023-05841 | Last Visit: April 13, 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Patient Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Age:</span>
                    <span>62</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Gender:</span>
                    <span>Female</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Medical History:</span>
                    <span>Type 2 Diabetes (10 years), Hypertension</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Medications:</span>
                    <span>Metformin, Lisinopril</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Last HbA1c:</span>
                    <span>7.8% (2 months ago)</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Reason for Visit</h3>
                <p className="text-sm mb-4">
                  Patient reports blurry vision in both eyes that has progressively worsened 
                  over the last 3 months. Also mentions occasional flashes of light.
                </p>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm">View Patient History</Button>
                  <Button size="sm">Open Full EHR</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* AI Analysis Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileBarChart className="h-5 w-5 text-primary" />
                AI Detection Results
              </CardTitle>
              <CardDescription>
                Based on fundus image uploaded on April 13, 2025
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-square rounded-md border overflow-hidden">
                    <img 
                      src="https://www.aao.org/Assets/7aae38b5-5d1d-4356-b05b-9d90504945ee/637297055973270000/moderate-npdr-microvascular-2-1280x757-large.jpg" 
                      alt="Eye scan" 
                      className="w-full h-full object-cover"
                    />
                    <div className="text-xs text-center p-1 bg-muted">Original Image</div>
                  </div>
                  <div className="aspect-square rounded-md border overflow-hidden">
                    <img 
                      src="https://www.aao.org/Assets/5aa8e572-50b7-419e-adeb-aaa0c4fa0ada/636313430471270000/ai-figure-2-large.jpg" 
                      alt="AI heatmap" 
                      className="w-full h-full object-cover"
                    />
                    <div className="text-xs text-center p-1 bg-muted">Grad-CAM Heatmap</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {mockDiseaseResults.map((result, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{result.name}</span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">{result.description}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <span className="font-semibold">{Math.round(result.probability * 100)}%</span>
                      </div>
                      <Progress value={result.probability * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-secondary" />
                  Detailed AI Explanation
                </CardTitle>
                <CardDescription>
                  Explainable AI insights for clinical context
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="shap">
                    <AccordionTrigger>SHAP Analysis</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <p className="text-sm">
                          SHAP (SHapley Additive exPlanations) values show the contribution of each 
                          feature to the prediction. Red areas significantly increased the likelihood 
                          of diabetic retinopathy.
                        </p>
                        <div className="rounded-md border overflow-hidden">
                          <img 
                            src="https://miro.medium.com/v2/resize:fit:1400/1*khUHdR8aV7hF0l4gUfvMog.png" 
                            alt="SHAP analysis" 
                            className="w-full object-cover"
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Key features: microaneurysms (highest contribution), hemorrhages, 
                          exudates, and vascular abnormalities.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="lime">
                    <AccordionTrigger>LIME Explanation</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <p className="text-sm">
                          LIME (Local Interpretable Model-agnostic Explanations) highlights regions
                          that influenced the model's decision, showing evidence of vascular abnormalities.
                        </p>
                        <div className="rounded-md border overflow-hidden">
                          <img 
                            src="https://storage.googleapis.com/kaggle-media/competitions/diabetic-retinopathy/LIME_visualization.png" 
                            alt="LIME explanation" 
                            className="w-full object-cover"
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="clinical">
                    <AccordionTrigger>Clinical Correlation</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <div className="rounded-md bg-amber-50 border border-amber-200 p-3">
                          <div className="flex items-start gap-2">
                            <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-amber-800">Clinical Decision Support</h4>
                              <p className="text-sm text-amber-700">
                                AI detection aligns with patient's 10-year diabetes history and recent HbA1c of 7.8%. 
                                The model has identified moderate non-proliferative diabetic retinopathy with 82% 
                                confidence.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <h4 className="font-medium">Recommended Actions:</h4>
                        <ul className="text-sm space-y-1 list-disc pl-5">
                          <li>Consider fluorescein angiography to assess vascular leakage</li>
                          <li>OCT to evaluate macular edema</li>
                          <li>Tighter glycemic control (target HbA1c &lt; 7.0%)</li>
                          <li>Follow-up in 3-4 months</li>
                          <li>Consider referral to retina specialist if condition worsens</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Feature Importance</CardTitle>
                <CardDescription>
                  Contributing factors to AI diagnosis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span>Microaneurysms</span>
                      <span className="font-medium">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span>Hemorrhages</span>
                      <span className="font-medium">76%</span>
                    </div>
                    <Progress value={76} className="h-2" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span>Hard Exudates</span>
                      <span className="font-medium">64%</span>
                    </div>
                    <Progress value={64} className="h-2" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span>Cotton Wool Spots</span>
                      <span className="font-medium">42%</span>
                    </div>
                    <Progress value={42} className="h-2" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span>Venous Beading</span>
                      <span className="font-medium">29%</span>
                    </div>
                    <Progress value={29} className="h-2" />
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <div className="text-xs text-muted-foreground">
                    Features were identified using gradient-based class activation mapping 
                    and importance scores calculated from ensemble model weights.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DoctorsModule;
