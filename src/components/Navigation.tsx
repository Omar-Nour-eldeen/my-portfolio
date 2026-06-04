import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Download, ChevronDown } from "lucide-react";
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);

          // Update active section based on scroll position
          const sections = ['home', 'about', 'skills', 'services', 'projects', 'experience', 'education', 'testimonials', 'contact', 'thankyou'];
          const scrollPosition = window.scrollY + 100; // Offset for better detection

          for (let i = sections.length - 1; i >= 0; i--) {
            const section = document.getElementById(sections[i]);
            if (section && section.offsetTop <= scrollPosition) {
              setActiveSection(sections[i]);
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const dropdownItems = [
    { name: 'Work Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };



  const handleResumeDownload = () => {
    // Create a link element to trigger download
    const link = document.createElement('a');
    link.href = '/Omar Nour Eldeen_CV.pdf';
    link.download = 'Omar Nour Eldeen_CV.pdf';
    link.target = '_blank';

    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownItemClick = (href: string) => {
    scrollToSection(href);
    setIsDropdownOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
        ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
        : 'bg-transparent'
      }`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Logo Image */}
          <div
            onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center cursor-pointer hover:opacity-85 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <img src="/logo.png" alt="Logo" className="h-16 sm:h-20 ms-5" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative transition-all duration-300 pb-1 ${isActive
                      ? 'text-primary font-semibold'
                      : 'text-white/70 hover:text-white'
                    }`}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-primary rounded-full transition-all duration-300 ${isActive ? 'w-full' : 'w-0'
                    }`} />
                </button>
              );
            })}

            {/* Dropdown Menu */}
            <div className="relative">
              <button
                onClick={handleDropdownClick}
                className={`relative flex items-center pb-1 transition-all duration-300 ${['education', 'experience', 'testimonials'].includes(activeSection)
                    ? 'text-primary font-semibold'
                    : 'text-white/70 hover:text-white'
                  }`}
              >
                More
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-primary rounded-full transition-all duration-300 ${['education', 'experience', 'testimonials'].includes(activeSection) ? 'w-full' : 'w-0'
                  }`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-slate-950/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] z-50 overflow-hidden">
                  <div className="py-1.5">
                    {dropdownItems.map((item) => {
                      const sectionId = item.href.replace('#', '');
                      const isActive = activeSection === sectionId;
                      return (
                        <button
                          key={item.name}
                          onClick={() => handleDropdownItemClick(item.href)}
                          className={`block w-full text-left px-4 py-2.5 transition-all duration-300 text-sm ${isActive
                              ? 'text-primary bg-primary/10 font-semibold'
                              : 'text-white/70 hover:text-white hover:bg-white/5'
                            }`}
                        >
                          {item.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Resume Download Button */}
            <Button
              onClick={handleResumeDownload}
              size="sm"
              className="h-9 px-4 text-sm font-bold bg-gradient-primary text-white border-0 shadow-[0_0_16px_rgba(99,102,241,0.3)] hover:shadow-[0_0_24px_rgba(99,102,241,0.5)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 rounded-xl"
            >
              <Download className="w-4 h-4 mr-2" />
              Download CV
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="hover:bg-primary/10 hover:scale-110 transition-all duration-300"
            >
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border/50">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`block px-3 py-2 transition-all duration-300 w-full text-left rounded-md ${isActive
                        ? 'text-primary bg-primary/10 font-semibold'
                        : 'text-foreground hover:text-primary hover:bg-primary/10'
                      }`}
                  >
                    {item.name}
                  </button>
                );
              })}

              {/* Mobile Dropdown Items */}
              {dropdownItems.map((item) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`block px-3 py-2 transition-all duration-300 w-full text-left rounded-md ${isActive
                        ? 'text-primary bg-primary/10 font-semibold'
                        : 'text-foreground hover:text-primary hover:bg-primary/10'
                      }`}
                  >
                    {item.name}
                  </button>
                );
              })}

              {/* Mobile Resume Download Button */}
              <button
                onClick={handleResumeDownload}
                className="block px-3 py-2 text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 w-full text-left rounded-md flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </button>
            </div>
          </div>
        )}


      </div>
    </nav>
  );
};

export default Navigation;