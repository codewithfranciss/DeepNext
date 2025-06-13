import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {ThemeToggle} from "@/components/theme-toggle";

export default function MobileNavToggle({ mobileMenuOpen, setMobileMenuOpen }: {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}) {
  return (
    <div className="md:hidden flex items-center space-x-2">
      <ThemeToggle />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="w-9 h-9 p-0"
      >
        {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>
    </div>

  );

  
}
