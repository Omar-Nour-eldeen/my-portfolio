import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Calendar, MapPin, Building } from "lucide-react";

const WorkExperience = () => {
  const experience = [
    {
      position: "Fullstack .NET Web Development Trainee",
      company: "Digital Egypt Pioneers Initiative (DEPI)",
      period: "June 2025 – Present",
      location: "Cairo, Egypt",
      description: "Participating in the development of full-stack web applications using .NET Core, and Bootstrap. Learning and applying software development best practices through real-world projects and team collaboration.",
      technologies: ["C#", ".NET Core", "SQL", "SQL Server", "HTML5", "CSS3", "JavaScript", "Bootstrap"],
      achievements: [
        "Contributed to building and improving features in training projects",
        "Worked within an Agile team to deliver functional modules",
        "Optimized database queries to improve application performance"
      ],
      logo: "/logos/depi-logo.png"
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 hover:scale-105 transition-transform duration-300">Work Experience</h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full hover:w-24 transition-all duration-300" />
          <p className="text-xl text-muted-foreground mt-6 max-w-2xl mx-auto hover:text-foreground transition-colors duration-300">
            My professional journey and career milestones
          </p>
        </div>
        
        <div className="space-y-8">
          {experience.map((item, index) => (
            <Card 
              key={index}
              className="group overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 bg-gray-800"
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-accent/20 rounded-lg flex items-center justify-center hover:bg-accent/30 transition-colors duration-300">
                    <GraduationCap className="w-6 h-6 text-accent" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold group-hover:text-accent hover:scale-105 transition-all duration-300">
                        {item.position}
                      </h3>
                      <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary/30 transition-colors duration-300 overflow-hidden">
                        {item.logo ? (
                          <img 
                            src={item.logo} 
                            alt={`${item.company} logo`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback to icon if logo fails to load
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              target.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                        ) : null}
                        <Building className="w-6 h-6 text-primary hidden" />
                      </div>
                    </div>
                    
                    <p className="text-lg font-medium text-primary mb-3">
                      {item.company}
                    </p>
                    
                    <div className="flex items-center gap-4 text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{item.period}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{item.location}</span>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 hover:text-foreground transition-colors duration-300">
                      {item.description}
                    </p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 hover:scale-105 transition-transform duration-300">Technologies Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.technologies.map((tech) => (
                          <Badge 
                            key={tech} 
                            variant="outline" 
                            className="text-xs hover:scale-105 hover:bg-primary/20 transition-all duration-300 bg-gray-900"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2 hover:scale-105 transition-transform duration-300">Key Achievements:</h4>
                      <ul className="space-y-1">
                        {item.achievements.map((achievement, idx) => (
                          <li key={idx} className="text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-2">
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
