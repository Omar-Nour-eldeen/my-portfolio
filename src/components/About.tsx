import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { buttonVariants } from '@/components/ui/button';
import Index from '../pages/Index';
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const About = () => {
  const { ref: aboutRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '-50px'
  });
  
  const skills = [
    "C#", "ASP.NET", "Entity Framework", "JavaScript", "HTML5", 
    "CSS3", "Bootstrap", "SQL", "SQL Server", "Problem Solving"
  ];

  return (
    <section ref={aboutRef} className="py-20 px-6 bg-gradient-secondary">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ease-out ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 hover:scale-105 transition-transform duration-300">About Me</h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full hover:w-24 transition-all duration-300" />
        </div>
        
        <div className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-700 ease-out delay-200 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-primary hover:scale-105 transition-transform duration-300">
              Passionate about web design
            </h3>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed hover:text-foreground transition-colors duration-300">
              I’m Fullstack .NET Web Developer who enjoys turning complex ideas into simple, functional, and scalable web solutions. I thrive on solving problems, writing clean and maintainable code, and continuously improving my skills to stay ahead in the ever-evolving tech landscape.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed hover:text-foreground transition-colors duration-300">
              Over time, I’ve learned to combine strong backend architecture with seamless frontend experiences, ensuring that every project I work on is fast, reliable, and user-friendly. I understand the needs of businesses—whether it’s a startup looking to launch quickly, or an established company seeking to optimize performance.
            </p>
            <p className="text-xl font-semibold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              <b>"I build efficient, scalable web apps with modern tech and clean code."</b>
            </p>
            {/* <div className="grid grid-cols-2 gap-6">
              <div className="hover:scale-105 transition-transform duration-300">
                <h4 className="font-semibold text-accent mb-2 hover:scale-105 transition-transform duration-300">Experience</h4>
                <p className="text-muted-foreground hover:text-foreground transition-colors duration-300">5+ Years</p>
              </div>
              <div className="hover:scale-105 transition-transform duration-300">
                <h4 className="font-semibold text-accent mb-2 hover:scale-105 transition-transform duration-300">Projects</h4>
                <p className="text-muted-foreground hover:text-foreground transition-colors duration-300">50+ Completed</p>
              </div>
            </div> */}
          </div>
          
          <Card className="p-8 bg-gray-800 border-border/50">
            <h4 className="text-xl font-semibold mb-6 bg-gradient-primary bg-clip-text text-transparent">Skills & Technologies</h4>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <Badge 
                  key={skill} 
                  variant="secondary" 
                  className="px-3 py-1 text-sm hover:bg-primary/20 hover:scale-105 transition-all duration-300 bg-gray-900"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;