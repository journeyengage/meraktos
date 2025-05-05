
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-meraktos-darkBlue shadow-lg py-2" 
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-white font-bold text-2xl">
            Meraktos
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              onClick={() => scrollToSection("about")} 
              className="text-white opacity-80 hover:opacity-100 cursor-pointer"
            >
              Sobre
            </a>
            <a 
              onClick={() => scrollToSection("benefits")} 
              className="text-white opacity-80 hover:opacity-100 cursor-pointer"
            >
              Benefícios
            </a>
            <a 
              onClick={() => scrollToSection("how-it-works")} 
              className="text-white opacity-80 hover:opacity-100 cursor-pointer"
            >
              Como funciona
            </a>
            <a 
              onClick={() => scrollToSection("services")} 
              className="text-white opacity-80 hover:opacity-100 cursor-pointer"
            >
              Serviços
            </a>
            <a 
              onClick={() => scrollToSection("testimonials")} 
              className="text-white opacity-80 hover:opacity-100 cursor-pointer"
            >
              Depoimentos
            </a>
            <Button 
              onClick={() => scrollToSection("contact")} 
              className="bg-meraktos-goldLight text-meraktos-darkBlue hover:bg-meraktos-goldDark"
            >
              Contato
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col space-y-4">
            <a 
              onClick={() => scrollToSection("about")} 
              className="text-white opacity-80 hover:opacity-100 cursor-pointer"
            >
              Sobre
            </a>
            <a 
              onClick={() => scrollToSection("benefits")} 
              className="text-white opacity-80 hover:opacity-100 cursor-pointer"
            >
              Benefícios
            </a>
            <a 
              onClick={() => scrollToSection("how-it-works")} 
              className="text-white opacity-80 hover:opacity-100 cursor-pointer"
            >
              Como funciona
            </a>
            <a 
              onClick={() => scrollToSection("services")} 
              className="text-white opacity-80 hover:opacity-100 cursor-pointer"
            >
              Serviços
            </a>
            <a 
              onClick={() => scrollToSection("testimonials")} 
              className="text-white opacity-80 hover:opacity-100 cursor-pointer"
            >
              Depoimentos
            </a>
            <Button 
              onClick={() => scrollToSection("contact")} 
              className="bg-meraktos-goldLight text-meraktos-darkBlue hover:bg-meraktos-goldDark w-full"
            >
              Contato
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
