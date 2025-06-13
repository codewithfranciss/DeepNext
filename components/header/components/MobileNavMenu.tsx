import Link from "next/link";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MobileNavMenu({ isOpen, onClose }: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden border-t border-border bg-background">
      <nav className="container mx-auto px-4 py-4 space-y-4">
        <Link
          href="#resources"
          className="block text-muted-foreground hover:text-foreground transition-colors"
          onClick={onClose}
        >
          Resources
        </Link>
        <Link
          href="/submit"
          className="block text-muted-foreground hover:text-foreground transition-colors"
          onClick={onClose}
        >
          Submit
        </Link>
        <Button variant="outline" size="sm" className="w-full justify-start">
          <Github className="w-4 h-4 mr-2" />
          GitHub
        </Button>
      </nav>
    </div>
  );
}
