import Link from "next/link";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import {ThemeToggle} from "@/components/theme-toggle";

export default function DesktopNav() {
  return (
    <nav className="hidden md:flex items-center space-x-6">
      <Link href="#resources" className="text-muted-foreground hover:text-foreground transition-colors">
        Resources
      </Link>
      <Link href="/submit" className="text-muted-foreground hover:text-foreground transition-colors">
        Submit
      </Link>
      <Button variant="outline" size="sm" className="mr-2">
        <Github className="w-4 h-4 mr-2" />
        GitHub
      </Button>
      <ThemeToggle />
    </nav>
  );
}
