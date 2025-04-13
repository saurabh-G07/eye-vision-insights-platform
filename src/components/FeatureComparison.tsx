
import React from "react";
import { CheckCircle, XCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Feature {
  name: string;
  description: string;
  patients: boolean;
  doctors: boolean;
  researchers: boolean;
}

interface FeatureComparisonProps {
  features: Feature[];
  className?: string;
}

const FeatureComparison: React.FC<FeatureComparisonProps> = ({
  features,
  className,
}) => {
  return (
    <div className={className}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40%]">Feature</TableHead>
            <TableHead>Patients</TableHead>
            <TableHead>Doctors</TableHead>
            <TableHead>Researchers</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {features.map((feature, index) => (
            <TableRow key={index}>
              <TableCell>
                <div>
                  <div className="font-medium">{feature.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {feature.description}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {feature.patients ? (
                  <CheckCircle className="h-5 w-5 text-medical-green" />
                ) : (
                  <XCircle className="h-5 w-5 text-muted-foreground/50" />
                )}
              </TableCell>
              <TableCell>
                {feature.doctors ? (
                  <CheckCircle className="h-5 w-5 text-medical-green" />
                ) : (
                  <XCircle className="h-5 w-5 text-muted-foreground/50" />
                )}
              </TableCell>
              <TableCell>
                {feature.researchers ? (
                  <CheckCircle className="h-5 w-5 text-medical-green" />
                ) : (
                  <XCircle className="h-5 w-5 text-muted-foreground/50" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FeatureComparison;
