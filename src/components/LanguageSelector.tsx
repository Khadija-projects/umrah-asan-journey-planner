import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useLanguage, languages } from '@/contexts/LanguageContext';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center space-x-2 px-3 py-2 border-2 border-muted-foreground/20 rounded-lg hover:bg-accent min-w-[80px] h-9"
        >
          <span className="text-base">{currentLanguage?.flag}</span>
          <span className="text-xs font-medium uppercase">{currentLanguage?.code}</span>
          <ChevronDown className="w-3 h-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-background border shadow-lg z-50">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => {
              setLanguage(lang.code as any);
              setIsOpen(false);
            }}
            className={`cursor-pointer flex items-center space-x-3 px-3 py-2 hover:bg-accent ${
              language === lang.code ? 'bg-accent text-accent-foreground' : ''
            }`}
          >
            <span className="text-base">{lang.flag}</span>
            <span className="text-sm">{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;