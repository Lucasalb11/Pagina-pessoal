import { Link } from "react-router-dom";
import { Code2, Lock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 border-t border-border relative">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Code2 className="w-4 h-4 text-primary" />
            <p className="text-muted-foreground">
              Built with React, TypeScript, and Tailwind CSS
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Lucas de Almeida. All rights reserved.
          </p>
          <div className="pt-2">
            <Link 
              to="/admin" 
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors opacity-50 hover:opacity-100"
            >
              <Lock className="w-3 h-3" />
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
