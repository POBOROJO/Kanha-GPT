
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="py-4 px-6 md:px-12 flex items-center justify-between relative z-50">
      <a href="/" className="text-3xl font-serif text-krishna-darkBlue font-medium">
        Kanha GPT
      </a>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        <a href="/" className="text-krishna-darkBlue hover:text-accent transition-colors">
          Home
        </a>
        <a href="/about" className="text-krishna-darkBlue hover:text-accent transition-colors">
          About
        </a>
        <a href="/contact" className="text-krishna-darkBlue hover:text-accent transition-colors">
          Contact
        </a>
      </div>

      {/* Mobile Navigation Trigger */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="md:hidden" 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full right-0 left-0 bg-white p-4 shadow-lg md:hidden"
        >
          <div className="flex flex-col space-y-3">
            <a href="/" className="text-krishna-darkBlue hover:text-accent py-2 px-4">
              Home
            </a>
            <a href="/about" className="text-krishna-darkBlue hover:text-accent py-2 px-4">
              About
            </a>
            <a href="/contact" className="text-krishna-darkBlue hover:text-accent py-2 px-4">
              Contact
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
