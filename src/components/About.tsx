import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const About = () => {
  const skills = [
    "React", "TypeScript", "Next.js", "Node.js", "PostgreSQL", 
    "Tailwind CSS", "Python", "AWS", "Docker", "Git"
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">About Me</h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full" />
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-primary">
              Passionate About Creating
            </h3>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              I'm a full-stack developer with a passion for creating beautiful, 
              functional, and user-centered digital experiences. With expertise 
              in modern web technologies, I bridge the gap between design and 
              development to bring ideas to life.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, 
              contributing to open source projects, or capturing moments through 
              photography.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-accent mb-2">Experience</h4>
                <p className="text-muted-foreground">5+ Years</p>
              </div>
              <div>
                <h4 className="font-semibold text-accent mb-2">Projects</h4>
                <p className="text-muted-foreground">50+ Completed</p>
              </div>
            </div>
          </div>
          
          <Card className="p-8 bg-gradient-secondary border-border/50">
            <h4 className="text-xl font-semibold mb-6">Skills & Technologies</h4>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <Badge 
                  key={skill} 
                  variant="secondary" 
                  className="px-3 py-1 text-sm hover:bg-primary/20 transition-colors"
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