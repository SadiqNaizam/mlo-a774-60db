import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed } from 'lucide-react';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/40 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-start">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <UtensilsCrossed className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">FoodieFlow</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Your favorite food, delivered fast.
            </p>
            <p className="text-muted-foreground text-sm mt-4">
              &copy; {currentYear} FoodieFlow Inc. All rights reserved.
            </p>
          </div>
          
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Company</h3>
              <nav className="flex flex-col gap-2 text-sm">
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
                <Link to="/careers" className="text-muted-foreground hover:text-primary transition-colors">Careers</Link>
              </nav>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Help</h3>
              <nav className="flex flex-col gap-2 text-sm">
                <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link>
                <Link to="/support" className="text-muted-foreground hover:text-primary transition-colors">Support</Link>
              </nav>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Legal</h3>
              <nav className="flex flex-col gap-2 text-sm">
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;