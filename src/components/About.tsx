import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { MapPin, Sparkles } from "lucide-react";

const About = () => {
  const { ref: aboutRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '-50px'
  });

  return (
    <section ref={aboutRef} className="py-20 px-6 bg-gradient-secondary">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ease-out ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 hover:scale-105 transition-transform duration-300">About Me</h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full hover:w-24 transition-all duration-300" />
        </div>
        
        <div className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-700 ease-out delay-200 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-semibold mb-6 text-primary hover:scale-105 transition-transform duration-300">
              Passionate about web development
            </h3>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed hover:text-foreground transition-colors duration-300">
              I’m a Fullstack .NET Web Developer who enjoys turning complex ideas into simple, functional, and scalable web solutions. I thrive on solving problems, writing clean and maintainable code, and continuously improving my skills to stay ahead in the ever-evolving tech landscape.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed hover:text-foreground transition-colors duration-300">
              Over time, I’ve learned to combine strong backend architecture with seamless frontend experiences, ensuring that every project I work on is fast, reliable, and user-friendly. I understand the needs of businesses—whether it’s a startup looking to launch quickly, or an established company seeking to optimize performance.
            </p>
            <p className="text-xl font-semibold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              <b>"I build efficient, scalable web apps with modern tech and clean code."</b>
            </p>
          </div>
          
          <div className="relative group max-w-md mx-auto md:max-w-none w-full flex justify-center mt-8 md:mt-0 order-1 md:order-2">
            {/* Ambient Background Glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-primary via-purple-500 to-accent rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-300" />
            
            {/* Image Frame */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-secondary border border-border/50 shadow-glow hover:shadow-glow-lg transition-all duration-500">
              <img
                src="/my-photo.jpg"
                alt="Omar Nour Eldeen Profile"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              {/* Fallback avatar */}
              <div className="hidden w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-primary-foreground text-7xl font-bold">ON</span>
              </div>
              
              {/* Glass Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>

            {/* Decorative Floating Status Tags */}
            <div className="absolute -bottom-4 -right-4 bg-secondary/90 backdrop-blur border border-border/50 px-4 py-2.5 rounded-xl shadow-elegant flex items-center gap-2 hover:scale-105 transition-transform duration-300">
              <span className="flex h-3.5 w-3.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-accent"></span>
              </span>
              <span className="text-sm font-medium text-foreground">Available for Hire</span>
            </div>
            
            <div className="absolute -top-4 -left-4 bg-secondary/90 backdrop-blur border border-border/50 px-4 py-2.5 rounded-xl shadow-elegant flex items-center gap-2 hover:scale-105 transition-transform duration-300">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Cairo, Egypt</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;