import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/80" />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Creative Developer
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Crafting beautiful digital experiences with modern technologies and creative vision
          </p>
          
          {/* Social Links */}
          <div className="flex gap-4 justify-center mb-8">
            <Button variant="outline" size="icon" className="hover:shadow-glow transition-all duration-300">
              <Github className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="hover:shadow-glow transition-all duration-300">
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="hover:shadow-glow transition-all duration-300">
              <Mail className="h-5 w-5" />
            </Button>
          </div>
          
          <Button onClick={scrollToProjects} className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
            View My Work
            <ArrowDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
    </section>
  );
};

export default Hero;