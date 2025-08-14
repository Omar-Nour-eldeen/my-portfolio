import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import TypingText from "./TypingText";
import { useEffect, useRef } from "react";
// import heroVideo from '@/assets/hero-bg.mp4';
const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (videoRef.current) {
      // Try to play the video
      videoRef.current.play().catch(error => {
        console.error('Failed to play video:', error);
      });
    }
  }, []);
  
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-secondary"
      style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
    {/* Background Video */}
    <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover z-0"
      style={{ 
        zIndex: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }}
      playsInline
      autoPlay
      loop
      muted
      preload="auto"

      onError={(e) => {
        console.error('Video failed to load:', e);
        console.error('Video error details:', videoRef.current?.error);
        // Fallback to background image if video fails
        const videoElement = e.target as HTMLVideoElement;
        videoElement.style.display = 'none';
        const fallbackImage = document.createElement('div');
        fallbackImage.className = 'absolute inset-0 w-full h-full bg-cover bg-center';
        fallbackImage.style.backgroundImage = `url(${heroBg})`;
        videoElement.parentNode?.appendChild(fallbackImage);
      }}
    >
     <source src="/hero-bg.mp4" type="video/mp4" />
     <source src="/hero-bg.webm" type="video/webm" />
     Your browser does not support the video tag.
    </video>
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/60 z-10" />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="animate-fade-in">
          {/* Profile Photo */}
          <div className="mb-6 flex justify-center">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full p-1 bg-gradient-to-r from-primary to-accent shadow-glow">
              <div className="w-full h-full rounded-full overflow-hidden bg-background">
                <img 
                  src="/my-photo.jpg" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback إذا لم توجد الصورة
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-primary-foreground text-5xl font-bold">ON</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Typing Title */}
          <h1 className="text-2xl md:text-4xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent min-h-[2.5rem] md:min-h-[3rem] hover:scale-105 transition-transform duration-300">
            <TypingText 
              text="Fullstack .NET Web Developer" 
              speed={120}
              showCursor={false}
              repeat={false}
            />
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto hover:text-foreground transition-colors duration-300">
            I'm a Fullstack .NET Web Developer, passionate about building high-quality, scalable, and user-focused web applications
          </p>
          
          {/* Social Links */}
          <div className="flex gap-4 justify-center mb-8">
          <Button variant="outline" size="icon" className="hover:shadow-glow hover:scale-110 transition-all duration-300" asChild>
              <a href="https://github.com/Omar-Nour-eldeen" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="outline" size="icon" className="hover:shadow-glow hover:scale-110 transition-all duration-300" asChild>
              <a href="https://www.linkedin.com/in/omar-nour-eldeen/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="outline" size="icon" className="hover:shadow-glow hover:scale-110 transition-all duration-300" asChild>
              <a href="mailto:mr4110140@gmail.com" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </Button>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
          <Button onClick={scrollToProjects} className="flex-1 max-w-40 h-14 bg-transparent border-2 border-primary/30 hover:border-primary hover:bg-primary/20 hover:shadow-glow hover:scale-105 transition-all duration-300 text-primary hover:text-white">
              View Projects
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
            <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="flex-1 max-w-40 h-14 bg-transparent border-2 border-accent/30 hover:border-accent hover:bg-accent/20 hover:shadow-glow hover:scale-105 transition-all duration-300 text-accent hover:text-white">
              Contact Me
            </Button>
          </div>
          

        </div>
      </div>
      
      {/* Floating Elements */}
      <div
        className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl glow-pulse hover:bg-primary/30 hover:scale-110 transition-all duration-300"
      />
      <div
        className="absolute bottom-20 right-10 w-32 h-32 bg-accent/20 rounded-full blur-xl glow-pulse glow-pulse-slow hover:bg-accent/30 hover:scale-110 transition-all duration-300"
      />
    </section>
  );
};

export default Hero;