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

  const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
  );

  const socialLinks = [
    { icon: Github, href: "https://github.com/Omar-Nour-eldeen", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/omar-nour-eldeen/", label: "LinkedIn" },
    { icon: MostaqlIcon, href: "https://mostaql.com/u/Omar_Nour_elden", label: "Mostaql" },
    { icon: Mail, href: "mailto:mr4110140@gmail.com", label: "Email" },
    { icon: WhatsAppIcon, href: "https://wa.me/201123311041", label: "WhatsApp" },
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
              <a href="https://wa.me/201123311041" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                 className="w-10 h-10 rounded-full bg-emerald-500/10 border-2 border-emerald-500 hover:bg-emerald-500/20 hover:shadow-[0_0_16px_rgba(16,185,129,0.5)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center text-emerald-400 hover:text-emerald-300">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
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
              <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center hover:bg-emerald-500/30 transition-colors duration-300 me-2">
                <svg className="w-5 h-5 fill-emerald-500" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </div>
              <div>
                <a href="https://wa.me/201123311041" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors duration-300">+20 112 331 1041</a>
              </div>
            </div>
            <div className="space-y-2 flex mt-3">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center hover:bg-primary/30 transition-colors duration-300 me-2">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <a href="mailto:mr4110140@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors duration-300">mr4110140@gmail.com</a>
              </div>
            </div>
            <div className="space-y-2 flex mt-3">
              <div className="w-10 h-10 bg-sky-500/20 rounded-lg flex items-center justify-center hover:bg-sky-500/30 transition-colors duration-300 me-2">
                <MapPin className="w-5 h-5 text-sky-500" />
              </div>
              <div>
                <p className="text-muted-foreground hover:text-foreground transition-colors duration-300">Egypt, Cairo</p>
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