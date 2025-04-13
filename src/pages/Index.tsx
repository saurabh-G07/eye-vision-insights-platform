
import React from "react";
import { Link } from "react-router-dom";
import { 
  Users, 
  UserCog, 
  Microscope, 
  Zap, 
  LineChart, 
  BrainCircuit, 
  Cpu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ModuleCard from "@/components/ModuleCard";
import FeatureCard from "@/components/FeatureCard";
import FeatureComparison from "@/components/FeatureComparison";
import Layout from "@/components/Layout";
import { platformFeatures } from "@/data/mockData";

const Index = () => {
  return (
    <Layout>
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold animate-fade-in">
            Eye Vision <span className="gradient-text">Insights Platform</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AI-powered analysis and insights for patients, doctors, and researchers in ophthalmology
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Button asChild size="lg">
              <Link to="/patients">Patient Portal</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </section>
        
        {/* Module Cards */}
        <section>
          <h2 className="section-title text-center mb-8">Specialized Modules</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ModuleCard
              title="Patients"
              description="Upload eye images and receive easy-to-understand AI analysis"
              icon={Users}
              to="/patients"
              variant="primary"
              features={[
                "Upload eye images (Fundus/OCT)",
                "Get simple AI-generated reports",
                "View visual heatmaps",
                "Chat with AI assistant about eye health"
              ]}
            />
            
            <ModuleCard
              title="Doctors"
              description="Access detailed analysis and explanations behind AI predictions"
              icon={UserCog}
              to="/doctors"
              variant="secondary"
              features={[
                "Detailed SHAP & LIME explanations",
                "View feature importance scores",
                "NLP-powered notes summarization",
                "Compare patient history with AI recommendations"
              ]}
            />
            
            <ModuleCard
              title="Researchers"
              description="Explore model performance metrics and compliance reports"
              icon={Microscope}
              to="/researchers"
              variant="accent"
              features={[
                "Access model performance metrics",
                "View compliance reports",
                "Explore AI model weights",
                "Interactive disease trend visualizations"
              ]}
            />
          </div>
        </section>
        
        {/* Key Features */}
        <section>
          <h2 className="section-title text-center mb-8">Key Platform Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FeatureCard
              title="AI-Powered Analysis"
              description="Advanced neural networks trained on extensive ophthalmological datasets"
              icon={BrainCircuit}
            />
            <FeatureCard
              title="Explainable AI"
              description="Transparent decision-making with SHAP, LIME, and Grad-CAM visualization"
              icon={Zap}
            />
            <FeatureCard
              title="Data Visualization"
              description="Interactive charts and graphs for better understanding of eye health trends"
              icon={LineChart}
            />
            <FeatureCard
              title="Multi-Model Architecture"
              description="Ensemble of ResNet, VGG16, DenseNet and Vision Transformers"
              icon={Cpu}
            />
          </div>
        </section>
        
        {/* Feature Comparison */}
        <section>
          <h2 className="section-title text-center mb-8">Features By User Type</h2>
          <FeatureComparison features={platformFeatures} />
        </section>
      </div>
    </Layout>
  );
};

export default Index;
