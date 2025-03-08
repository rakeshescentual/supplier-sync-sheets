
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { UserCircle, BellRing, Menu, X } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'py-2 glass shadow-soft' : 'py-4 bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/"
            className="flex items-center space-x-3 transition-transform duration-300 hover:scale-[1.02]"
          >
            <div className="w-8 h-8 rounded-full bg-primary/90 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">E</span>
            </div>
            <span className="font-medium text-lg tracking-tight">Escentual</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-6">
              <Link 
                to="/dashboard" 
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive('/dashboard') 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Dashboard
              </Link>
              <Link 
                to="/newline-form" 
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive('/newline-form') 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                New Line Form
              </Link>
              <Link 
                to="/validation" 
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive('/validation') 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Validation
              </Link>
              <Link 
                to="/audit-log" 
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive('/audit-log') 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Audit Log
              </Link>
            </nav>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
              >
                <BellRing size={18} />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[0.6rem]">
                  3
                </Badge>
              </Button>
              <Button variant="ghost" size="icon">
                <UserCircle size={20} />
              </Button>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass shadow-soft-lg animate-fade-in">
          <div className="container mx-auto px-6 py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)} 
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                  isActive('/dashboard') 
                    ? 'bg-primary/10 text-primary' 
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                Dashboard
              </Link>
              <Link 
                to="/newline-form"
                onClick={() => setMobileMenuOpen(false)} 
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                  isActive('/newline-form') 
                    ? 'bg-primary/10 text-primary' 
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                New Line Form
              </Link>
              <Link 
                to="/validation"
                onClick={() => setMobileMenuOpen(false)} 
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                  isActive('/validation') 
                    ? 'bg-primary/10 text-primary' 
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                Validation
              </Link>
              <Link 
                to="/audit-log"
                onClick={() => setMobileMenuOpen(false)} 
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                  isActive('/audit-log') 
                    ? 'bg-primary/10 text-primary' 
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                Audit Log
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
