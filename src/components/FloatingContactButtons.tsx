
import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingContactButtons = () => {
  const phoneNumber = "+923455141224";
  
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      <Button
        size="lg"
        className="bg-primary hover:bg-primary/90 text-white p-4 rounded-full w-14 h-14 shadow-lg animate-holy-glow"
        onClick={() => window.open(`tel:${phoneNumber}`, '_self')}
        aria-label="Call us"
      >
        <Phone className="w-5 h-5" />
      </Button>
      <Button
        size="lg"
        className="bg-golden hover:bg-golden/90 text-white p-4 rounded-full w-14 h-14 shadow-lg animate-holy-glow"
        onClick={() => window.open(`https://wa.me/${phoneNumber.replace('+', '')}`, '_blank')}
        aria-label="WhatsApp us"
      >
        <MessageCircle className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default FloatingContactButtons;
