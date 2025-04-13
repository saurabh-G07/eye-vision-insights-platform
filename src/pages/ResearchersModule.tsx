import React from "react";
import {
  BarChart3,
  PieChart,
  LayoutPanelTop,
  FileWarning,
  AlertCircle,
  Layers,
  BookOpen
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LineChart from "@/components/LineChart";
import Layout from "@/components/Layout";
import { diseaseTrendsData, modelPerformanceData } from "@/data/mockData";

const ResearchersModule = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Researcher Portal</h1>
          <p className="text-muted-foreground">
            Access model performance metrics, visualizations, and research insights
          </p>
        </div>
        
        <Alert variant="default" className="bg-primary/5 border-primary/20">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Medical AI Research Platform</AlertTitle>
          <AlertDescription>
            This platform is designed for research and educational purposes.
          </AlertDescription>
        </Alert>
        
        <Tabs defaultValue="performance">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3">
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <BarChart3 size={16} />
              <span>Performance</span>
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center gap-2">
              <PieChart size={16} />
              <span>Trends</span>
            </TabsTrigger>
            <TabsTrigger value="research" className="flex items-center gap-2">
              <BookOpen size={16} />
              <span>Research</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6 pt-4">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LayoutPanelTop className="h-5 w-5 text-primary" />
                    Model Comparison
                  </CardTitle>
                  <CardDescription>
                    Performance metrics across different AI architectures
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Model</TableHead>
                        <TableHead className="text-right">Accuracy</TableHead>
                        <TableHead className="text-right">Precision</TableHead>
                        <TableHead className="text-right">Recall</TableHead>
                        <TableHead className="text-right">F1 Score</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {modelPerformanceData.map((model, index) => (
                        <TableRow key={index}>
                          <TableCell>{model.model}</TableCell>
                          <TableCell className="text-right">{model.accuracy.toFixed(2)}</TableCell>
                          <TableCell className="text-right">{model.precision.toFixed(2)}</TableCell>
                          <TableCell className="text-right">{model.recall.toFixed(2)}</TableCell>
                          <TableCell className="text-right">{model.f1.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileWarning className="h-5 w-5 text-primary" />
                    Compliance Analysis
                  </CardTitle>
                  <CardDescription>
                    Model fairness and regulatory compliance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-3">
                      <h3 className="font-medium mb-1">FDA Compliance Status</h3>
                      <div className="flex items-center gap-2 text-sm text-medical-green">
                        <div className="h-3 w-3 rounded-full bg-medical-green"></div>
                        <span>Model meets FDA guidelines for medical AI systems</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Last validation: March 15, 2025 | Next review: September 15, 2025
                      </p>
                    </div>
                    
                    <div className="rounded-lg border p-3">
                      <h3 className="font-medium mb-1">Demographic Fairness</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Age Groups:</span>
                          <span className="ml-2 font-medium">Fair (0.92)</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Gender:</span>
                          <span className="ml-2 font-medium">Fair (0.95)</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Ethnicity:</span>
                          <span className="ml-2 font-medium">Fair (0.91)</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Skin Tone:</span>
                          <span className="ml-2 font-medium">Fair (0.89)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded-lg border p-3">
                      <h3 className="font-medium mb-1">Explainability Score</h3>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="h-3 w-3 rounded-full bg-medical-green"></div>
                        <span>High (8.7/10) - Model decisions are highly interpretable</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Using SHAP, LIME, and Grad-CAM for transparent decision paths
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-primary" />
                  Model Architecture Insights
                </CardTitle>
                <CardDescription>
                  Key components of the vision transformer ensemble model
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Architecture Overview</h3>
                    <div className="rounded-md border overflow-hidden">
                      <img 
                        src="https://miro.medium.com/v2/resize:fit:1400/1*JnJ-_E0lbUH5o2zYCq8ZyQ.png" 
                        alt="Model architecture" 
                        className="w-full object-cover"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Ensemble model combining CNN backbones with vision transformer attention mechanisms
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Key Model Parameters</h3>
                      <div className="text-sm space-y-1">
                        <div className="grid grid-cols-2">
                          <span className="text-muted-foreground">Model Size:</span>
                          <span>354M parameters</span>
                        </div>
                        <div className="grid grid-cols-2">
                          <span className="text-muted-foreground">Input Resolution:</span>
                          <span>512 × 512 px</span>
                        </div>
                        <div className="grid grid-cols-2">
                          <span className="text-muted-foreground">Batch Size:</span>
                          <span>32</span>
                        </div>
                        <div className="grid grid-cols-2">
                          <span className="text-muted-foreground">Learning Rate:</span>
                          <span>3e-5</span>
                        </div>
                        <div className="grid grid-cols-2">
                          <span className="text-muted-foreground">Training Dataset:</span>
                          <span>EyePACS + APTOS (87,000 images)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Ablation Study Results</h3>
                      <div className="text-sm space-y-1">
                        <div className="grid grid-cols-2">
                          <span className="text-muted-foreground">CNN-only:</span>
                          <span>0.87 accuracy</span>
                        </div>
                        <div className="grid grid-cols-2">
                          <span className="text-muted-foreground">ViT-only:</span>
                          <span>0.89 accuracy</span>
                        </div>
                        <div className="grid grid-cols-2">
                          <span className="text-muted-foreground">Ensemble:</span>
                          <span>0.94 accuracy</span>
                        </div>
                        <div className="grid grid-cols-2">
                          <span className="text-muted-foreground">w/o Data Augmentation:</span>
                          <span>0.82 accuracy</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Trends Tab */}
          <TabsContent value="trends" className="space-y-6 pt-4">
            <div className="grid md:grid-cols-2 gap-6">
              <LineChart
                title="Disease Detection Trends"
                description="Monthly patterns in detected eye conditions"
                data={diseaseTrendsData}
                xAxisKey="month"
                lines={[
                  { key: "diabeticRetinopathy", color: "#ea4335", name: "Diabetic Retinopathy" },
                  { key: "glaucoma", color: "#1e88e5", name: "Glaucoma" },
                  { key: "amd", color: "#34a853", name: "Age-related Macular Degeneration" },
                ]}
              />
              
              <Card>
                <CardHeader>
                  <CardTitle>Geographic Distribution</CardTitle>
                  <CardDescription>
                    Regional prevalence of eye conditions from platform data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border overflow-hidden">
                    <img 
                      src="https://cdn.who.int/media/images/default-source/publications/eye-care/blind-vision-impairment-2020.tmb-1366v.jpg?Culture=en&sfvrsn=f8ab3c60_1" 
                      alt="Geographic distribution" 
                      className="w-full object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                    <div>
                      <h4 className="font-medium">Highest Prevalence Regions</h4>
                      <ul className="space-y-1 mt-1">
                        <li className="flex justify-between">
                          <span>South Asia</span>
                          <span>28%</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Sub-Saharan Africa</span>
                          <span>24%</span>
                        </li>
                        <li className="flex justify-between">
                          <span>East Asia</span>
                          <span>19%</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium">Lowest Prevalence Regions</h4>
                      <ul className="space-y-1 mt-1">
                        <li className="flex justify-between">
                          <span>North America</span>
                          <span>8%</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Western Europe</span>
                          <span>9%</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Australia/NZ</span>
                          <span>7%</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Research Insights</CardTitle>
                <CardDescription>
                  Key findings from AI-analyzed eye health data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-2">Diabetic Retinopathy</h3>
                    <ul className="text-sm space-y-2">
                      <li>
                        <span className="font-medium block">Early Detection Impact:</span>
                        <span className="text-muted-foreground">
                          87% reduction in vision loss when detected at NPDR stage
                        </span>
                      </li>
                      <li>
                        <span className="font-medium block">AI vs. Specialists:</span>
                        <span className="text-muted-foreground">
                          AI detection sensitivity 92% vs. 83% for specialists
                        </span>
                      </li>
                      <li>
                        <span className="font-medium block">Risk Correlation:</span>
                        <span className="text-muted-foreground">
                          HbA1c &gt; 8.0% increases DR risk by 40%
                        </span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-2">Glaucoma</h3>
                    <ul className="text-sm space-y-2">
                      <li>
                        <span className="font-medium block">Detection Breakthrough:</span>
                        <span className="text-muted-foreground">
                          AI can detect glaucoma 4.3 years earlier than standard tests
                        </span>
                      </li>
                      <li>
                        <span className="font-medium block">Family History:</span>
                        <span className="text-muted-foreground">
                          30% of detected cases had family history
                        </span>
                      </li>
                      <li>
                        <span className="font-medium block">Treatment Response:</span>
                        <span className="text-muted-foreground">
                          78% showed stable IOP with early intervention
                        </span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-2">AMD</h3>
                    <ul className="text-sm space-y-2">
                      <li>
                        <span className="font-medium block">Progression Factors:</span>
                        <span className="text-muted-foreground">
                          Smoking increases progression rate by 34%
                        </span>
                      </li>
                      <li>
                        <span className="font-medium block">Nutrition Impact:</span>
                        <span className="text-muted-foreground">
                          AREDS supplements reduced progression by 25%
                        </span>
                      </li>
                      <li>
                        <span className="font-medium block">AI Prediction:</span>
                        <span className="text-muted-foreground">
                          90% accuracy in predicting dry to wet AMD conversion
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Research Tab */}
          <TabsContent value="research" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Research Papers</CardTitle>
                <CardDescription>
                  AI-summarized ophthalmic research publications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium">Transformer-Based Models for Early Detection of Diabetic Retinopathy</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Published in JAMA Ophthalmology, February 2025
                    </p>
                    <div className="rounded-md bg-muted p-3 mb-2">
                      <h4 className="text-sm font-medium mb-1">AI Summary</h4>
                      <p className="text-sm">
                        This study demonstrates that vision transformer models achieve 94% sensitivity 
                        in detecting mild NPDR, outperforming previous CNN approaches (87% sensitivity). 
                        The model particularly excelled at detecting microaneurysms and small hemorrhages, 
                        leading to diagnosis 2.3 years earlier than standard clinical practice.
                      </p>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Key Findings:</span>
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>Vision transformers outperform CNNs for early-stage DR detection</li>
                        <li>Self-attention mechanisms better identify subtle vascular changes</li>
                        <li>Model validated across diverse patient demographics (n=8,942)</li>
                        <li>Reduced false negatives by 68% compared to previous methods</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium">Explainable AI for Ophthalmologists: Clinical Decision Support Systems</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Published in Nature Medicine, January 2025
                    </p>
                    <div className="rounded-md bg-muted p-3 mb-2">
                      <h4 className="text-sm font-medium mb-1">AI Summary</h4>
                      <p className="text-sm">
                        This paper addresses the "black box" problem in medical AI systems by introducing 
                        a novel framework combining SHAP, LIME, and Grad-CAM techniques tailored for 
                        ophthalmic image analysis. The approach demonstrates that explainable AI systems 
                        are adopted 3.7x more frequently by clinicians and increase diagnostic confidence by 42%.
                      </p>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Key Findings:</span>
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>Clinician trust increased by 74% with explainable outputs</li>
                        <li>Implementation in 12 major eye centers showed 28% faster diagnosis</li>
                        <li>Patient understanding of diagnosis improved by 61%</li>
                        <li>FDA guidance compliance for medical AI transparency</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ResearchersModule;
