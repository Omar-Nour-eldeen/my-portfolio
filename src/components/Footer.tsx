import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Phone, Twitter, MapPin } from "lucide-react";
import LogoSimple from "./LogoSimple";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const MostaqlIcon = ({ className }: { className?: string }) => (
  <img src="/mostaql.png" alt="Mostaql" className={`rounded-[4px] object-contain ${className}`} />
);

const Footer = () => {
  const { ref: footerRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '-50px'
  });
  
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/Omar-Nour-eldeen", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/omar-nour-eldeen/", label: "LinkedIn" },
    { icon: MostaqlIcon, href: "https://mostaql.com/u/Omar_Nour_elden", label: "Mostaql" },
    { icon: Mail, href: "mailto:mr4110140@gmail.com", label: "Email" },
  ];

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="bg-gradient-secondary border-t border-border/50">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-8 transition-all duration-700 ease-out ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <LogoSimple size="md" />
            <p className="mt-4 text-muted-foreground max-w-md hover:text-foreground transition-colors duration-300">
              I’m Fullstack .NET Web Developer Passionate about web design, I build efficient, scalable web apps with modern tech and clean code. Let's create something together.
            </p>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              <a href="https://github.com/Omar-Nour-eldeen" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                 className="w-10 h-10 rounded-full bg-white/5 border-2 border-purple-500 hover:bg-purple-500/20 hover:shadow-[0_0_16px_rgba(168,85,247,0.5)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center text-white/90 hover:text-white">
                <Github className="h-4 w-4" />
              </a>
              <a href="https://www.linkedin.com/in/omar-nour-eldeen/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                 className="w-10 h-10 rounded-full bg-white/5 border-2 border-emerald-500 hover:bg-emerald-500/20 hover:shadow-[0_0_16px_rgba(16,185,129,0.5)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center text-white/90 hover:text-white">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="https://mostaql.com/u/Omar_Nour_elden" target="_blank" rel="noopener noreferrer" aria-label="Mostaql"
                 className="w-10 h-10 rounded-full bg-white/5 border-2 border-blue-500 hover:bg-blue-500/20 hover:shadow-[0_0_16px_rgba(59,130,246,0.5)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center text-white/90 hover:text-white">
                <MostaqlIcon className="h-4 w-4" />
              </a>
              <a href="mailto:mr4110140@gmail.com" aria-label="Email"
                 className="w-10 h-10 rounded-full bg-white/5 border-2 border-orange-500 hover:bg-orange-500/20 hover:shadow-[0_0_16px_rgba(249,115,22,0.5)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center text-white/90 hover:text-white">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Get In Touch</h3>
            <div className="space-y-2 flex">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center hover:bg-primary/30 transition-colors duration-300 me-2">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground hover:text-foreground transition-colors duration-300">mr4110140@gmail.com</p>
              </div>
            </div>
            <div className="space-y-2 flex mt-3">
              <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center hover:bg-accent/30 transition-colors duration-300 me-2">
                <Phone className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-muted-foreground hover:text-foreground transition-colors duration-300">01123311041</p>
              </div>
            </div>
            <div className="space-y-2 flex mt-3">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center hover:bg-primary/30 transition-colors duration-300 me-2">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground hover:text-foreground transition-colors duration-300">Egypt,Cairo</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
      </div>
    </footer>
  );
};

export default Footer;