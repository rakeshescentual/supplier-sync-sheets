
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-8 border-t border-border mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-6 h-6 rounded-full bg-primary/90 flex items-center justify-center">
              <span className="text-white font-semibold text-xs">E</span>
            </div>
            <span className="text-sm text-muted-foreground">
              © {currentYear} Escentual. All rights reserved.
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            <Link 
              to="/help" 
              className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Help Center
            </Link>
            <Link 
              to="/privacy" 
              className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Terms of Service
            </Link>
            <Link 
              to="/contact" 
              className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Contact
            </Link>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0">
            <span className="text-xs text-muted-foreground flex items-center">
              Made with <Heart size={12} className="mx-1 text-primary" /> for Escentual
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
