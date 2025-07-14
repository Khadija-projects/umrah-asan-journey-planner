import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  buttonText: string;
  buttonVariant?: "default" | "holy" | "gold" | "outline";
  onClick?: () => void;
}

const ServiceCard = ({
  title,
  description,
  icon: Icon,
  features,
  buttonText,
  buttonVariant = "default",
  onClick,
}: ServiceCardProps) => {
  return (
    <Card className="h-full hover:shadow-holy transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-primary">
      <CardHeader className="text-center">
        <div className="w-12 h-12 bg-gradient-holy rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon className="w-6 h-6 text-primary-foreground" />
        </div>
        <CardTitle className="text-xl text-primary">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-2 text-sm">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Button 
          variant={buttonVariant} 
          className="w-full" 
          size="lg"
          onClick={onClick}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;