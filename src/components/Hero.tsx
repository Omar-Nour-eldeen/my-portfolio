import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import TypingText from "./TypingText";
import { useEffect, useRef } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref: heroRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: '-50px'
  });

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
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-secondary"
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
          videoElement.parentNode?.appendChild(fallbackImage);
        }}
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/50 z-10" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className={`transition-all duration-700 ease-out ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {/* Profile Photo */}
          <div className={`mb-6 flex justify-center transition-all duration-800 ease-out delay-150 ${isIntersecting ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
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
          <h1 className={`text-2xl md:text-4xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent min-h-[2.5rem] md:min-h-[3rem] hover:scale-105 transition-all duration-700 ease-out delay-400 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <TypingText
              text="Fullstack .NET Web Developer"
              speed={120}
              showCursor={false}
              repeat={false}
            />
          </h1>

          <p className={`text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto hover:text-foreground transition-all duration-700 ease-out delay-450 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            I'm a Fullstack .NET Web Developer, passionate about building high-quality, scalable, and user-focused web applications
          </p>

          {/* Social Links */}
          <div className={`flex gap-4 justify-center mb-8 transition-all duration-700 ease-out delay-600 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
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
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 ease-out delay-750 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <Button onClick={scrollToProjects} className="w-full sm:flex-1 sm:max-w-40 h-14 bg-transparent border-2 border-primary/30 hover:border-primary hover:bg-primary/20 hover:shadow-glow hover:scale-105 transition-all duration-300 text-primary hover:text-white">
              View Projects
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
            <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:flex-1 sm:max-w-40 h-14 bg-transparent border-2 border-accent/30 hover:border-accent hover:bg-accent/20 hover:shadow-glow hover:scale-105 transition-all duration-300 text-accent hover:text-white">
              Contact Me
            </Button>
          </div>


        </div>
      </div>
    </section>
  );
};

export default Hero;