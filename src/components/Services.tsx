import { Card, CardContent } from "@/components/ui/card";
import { Laptop, Network, Layout, Database, Layers } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useState } from "react";

// Skill Item interface
interface SkillItem {
  name: string;
  iconUrl?: string;
  isSvg?: boolean;
  type?: 'microservices' | 'ef' | 'sql';
  isInvert?: boolean;
}

const SkillBadge = ({ skill }: { skill: SkillItem }) => {
  return (
    <div 
      className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-white/10 hover:border-primary/60 hover:bg-slate-800/90 hover:scale-105 transition-all duration-300 shadow-sm group/skill cursor-pointer"
      title={skill.name}
    >
      <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
        {skill.iconUrl ? (
          <img 
            src={skill.iconUrl} 
            alt={skill.name} 
            className={`w-5 h-5 object-contain ${skill.isInvert ? 'invert' : ''}`}
            onError={(e) => {
              // Fallback for image loading error
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        ) : skill.type === 'microservices' ? (
          <Network className="w-4 h-4 text-emerald-400" />
        ) : skill.type === 'ef' ? (
          <Layers className="w-4 h-4 text-purple-400" />
        ) : (
          <Database className="w-4 h-4 text-sky-400" />
        )}
      </div>
      <span className="text-xs font-semibold text-slate-200 group-hover/skill:text-white transition-colors">
        {skill.name}
      </span>
    </div>
  );
};

const Services = () => {
  const { ref: servicesRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '-50px'
  });

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const services: {
    title: string;
    description: string;
    icon: any;
    features: string[];
    accentColor: string;
    glow: string;
    gradientFrom: string;
    gradientTo: string;
    skills: SkillItem[];
  }[] = [
    {
      title: "Web Development",
      description: "Building scalable, distributed enterprise applications using modern architecture patterns, cloud deployment, and containerization.",
      icon: Laptop,
      features: ["Microservices Architecture", "Cloud Integration", "DevOps & CI/CD"],
      accentColor: "#a78bfa",  // purple-400
      glow: "rgba(167,139,250,0.4)",
      gradientFrom: "#a78bfa",
      gradientTo: "#818cf8",
      skills: [
        { name: "Microservices", type: "microservices" },
        { name: "Docker", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
        { name: "AWS", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", isInvert: true },
        { name: "Git", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
        { name: "GitHub", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", isInvert: true },
      ]
    },
    {
      title: "Web APIs & Backend",
      description: "Designing high-performance RESTful Web APIs, robust backend logic, secure authentication, and seamless server side integrations.",
      icon: Network,
      features: ["RESTful APIs", "JWT Security", "Clean Architecture"],
      accentColor: "#34d399",  // emerald-400
      glow: "rgba(52,211,153,0.4)",
      gradientFrom: "#34d399",
      gradientTo: "#06b6d4",
      skills: [
        { name: "ASP.NET", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg" },
        { name: "Entity Framework", type: "ef" },
        { name: "C#", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg" },
        { name: "Spring Boot", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg" },
      ]
    },
    {
      title: "Frontend Development",
      description: "Crafting modern, highly responsive, interactive web interfaces with focus on UI/UX excellence, speed, and seamless API integration.",
      icon: Layout,
      features: ["Responsive Layouts", "Interactive UI", "Cross-Browser Compatibility"],
      accentColor: "#38bdf8",  // sky-400
      glow: "rgba(56,189,248,0.4)",
      gradientFrom: "#38bdf8",
      gradientTo: "#818cf8",
      skills: [
        { name: "HTML", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
        { name: "CSS", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
        { name: "JavaScript", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
        { name: "Bootstrap", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" },
        { name: "Tailwind", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
      ]
    },
    {
      title: "Database & Storage",
      description: "Architecting efficient database schemas, query optimization, data modeling, indexing, and high-availability database management.",
      icon: Database,
      features: ["Schema Design", "Query Optimization", "Data Integrity"],
      accentColor: "#fb923c",  // orange-400
      glow: "rgba(251,146,60,0.4)",
      gradientFrom: "#fb923c",
      gradientTo: "#f472b6",
      skills: [
        { name: "SQL", type: "sql" },
        { name: "SQL Server", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original.svg" },
        { name: "MySQL", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
      ]
    },
  ];

  return (
    <section ref={servicesRef} className="py-20 px-6 bg-gradient-secondary relative overflow-hidden">
      {/* Ambient background orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transform-gpu will-change-transform transition-all duration-700 ease-out ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 hover:scale-105 transition-transform duration-300">Services & Skills</h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full hover:w-24 transition-all duration-300" />
          <p className="text-xl text-muted-foreground mt-6 max-w-2xl mx-auto hover:text-foreground transition-colors duration-300">
            Comprehensive software engineering services backed by powerful technologies & tools.
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const isHovered = hoveredIdx === index;
            const IconComponent = service.icon;

            return (
              <Card 
                key={index}
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="group overflow-hidden md:backdrop-blur-xl backdrop-blur-none relative cursor-default transition-all duration-500 ease-out flex flex-col justify-between"
                style={{
                  border: `1.5px solid ${service.accentColor}80`,
                  background: `linear-gradient(135deg, ${service.gradientFrom}10, ${service.gradientTo}08, rgba(15,23,42,0.9))`,
                  boxShadow: isHovered
                    ? `0 20px 40px -15px rgba(0,0,0,0.7), 0 0 30px ${service.glow}`
                    : 'none',
                  transitionDelay: `${index * 25}ms`,
                  transform: isIntersecting ? (isHovered ? 'scale(1.02) translateY(-6px)' : 'none') : 'translateY(30px)',
                  opacity: isIntersecting ? 1 : 0
                }}
              >
                <div
                  className="absolute inset-y-0 left-0 w-1.5 rounded-r-full opacity-90"
                  style={{
                    background: `linear-gradient(180deg, ${service.gradientFrom} 0%, ${service.gradientTo} 100%)`
                  }}
                />
                {/* Interactive Glassmorphic Shine Effect */}
                <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                
                {/* Inner colored glow on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 30% 50%, ${service.glow.replace('0.4', '0.12')} 0%, transparent 70%)`
                  }}
                />

                <CardContent className="p-7 md:p-8 relative z-10 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex flex-col sm:flex-row items-start gap-5">
                      {/* Icon container with gradient background */}
                      <div className="relative flex-shrink-0">
                        {/* Halo glow behind icon */}
                        <div 
                          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none scale-150"
                          style={{
                            background: `radial-gradient(circle, ${service.glow} 0%, transparent 70%)`
                          }}
                        />
                        <div 
                          className="relative w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-500"
                          style={{
                            background: `linear-gradient(135deg, ${service.gradientFrom}20, ${service.gradientTo}15)`,
                            borderColor: `${service.accentColor}40`,
                            boxShadow: `0 0 15px ${service.glow.replace('0.4', '0.15')}`,
                          }}
                        >
                          <IconComponent 
                            className="w-7 h-7 transition-all duration-500"
                            style={{
                              color: service.accentColor,
                              filter: `drop-shadow(0 2px 8px ${service.glow})`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Text content */}
                      <div className="flex-1 min-w-0">
                        <h3 
                          className="text-xl font-bold mb-2 transition-colors duration-400"
                          style={{
                            color: service.accentColor,
                            textShadow: `0 0 10px ${service.glow.replace('0.4', '0.1')}`,
                          }}
                        >
                          {service.title}
                        </h3>
                        
                        <p className="text-muted-foreground mb-4 leading-relaxed text-[14px] group-hover:text-slate-200 transition-colors duration-300">
                          {service.description}
                        </p>
                        
                        {/* Feature tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {service.features.map((feature, idx) => (
                            <span 
                              key={idx} 
                              className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border transition-all duration-300"
                              style={{
                                background: `${service.accentColor}15`,
                                borderColor: `${service.accentColor}30`,
                                color: service.accentColor,
                                boxShadow: isHovered ? `0 0 10px ${service.glow.replace('0.4', '0.2')}` : 'none',
                              }}
                            >
                              <span 
                                className="w-1.5 h-1.5 rounded-full"
                                style={{
                                  background: service.accentColor,
                                  boxShadow: `0 0 6px ${service.accentColor}`,
                                }}
                              />
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Skills Section at Bottom of Box */}
                  <div className="pt-4 border-t border-white/10 mt-2">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                      Technologies & Tools
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {service.skills.map((skill) => (
                        <SkillBadge key={skill.name} skill={skill} />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;

