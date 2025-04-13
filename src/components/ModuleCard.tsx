
import React from "react";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  features: string[];
  className?: string;
  variant?: "primary" | "secondary" | "accent" | "default";
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  description,
  icon: Icon,
  to,
  features,
  className,
  variant = "default"
}) => {
  const variantClasses = {
    primary: "bg-primary/10 border-primary/20",
    secondary: "bg-secondary/10 border-secondary/20",
    accent: "bg-accent/10 border-accent/20",
    default: ""
  };

  return (
    <div className={cn("module-card", variantClasses[variant], className)}>
      <div className="flex flex-col items-center text-center md:text-left md:items-start">
        <Icon className="module-icon" />
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        
        <div className="w-full mb-4">
          <ul className="space-y-1 text-sm">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                <span className="text-left">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <Button asChild className="mt-auto">
          <Link to={to}>Access {title} Module</Link>
        </Button>
      </div>
    </div>
  );
};

export default ModuleCard;
