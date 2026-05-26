import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Server, Code, Database, Brain } from "lucide-react";

const Skills = () => {
  const { ref: sectionRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.15,
    rootMargin: "-50px"
  });

  const categories = [
    {
      title: "Backend Development",
      icon: Server,
      color: "from-purple-500/10 via-purple-500/5 to-transparent border-purple-500/20 hover:border-purple-500/40",
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-400",
      glowColor: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
      skills: ["C#", "ASP.NET", "Entity Framework", "Web API"],
      description: "Building robust, scalable, and secure REST APIs and enterprise-grade server-side business logic."
    },
    {
      title: "Frontend Development",
      icon: Code,
      color: "from-cyan-500/10 via-cyan-500/5 to-transparent border-cyan-500/20 hover:border-cyan-500/40",
      iconBg: "bg-cyan-500/10",
      iconColor: "text-cyan-400",
      glowColor: "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]",
      skills: ["JavaScript", "HTML5", "CSS3", "Bootstrap"],
      description: "Crafting modern, pixel-perfect, highly responsive, and interactive user interfaces."
    },
    {
      title: "Database Management",
      icon: Database,
      color: "from-blue-500/10 via-blue-500/5 to-transparent border-blue-500/20 hover:border-blue-500/40",
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
      glowColor: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
      skills: ["SQL", "SQL Server"],
      description: "Designing optimized relational database schemas, writing complex queries, and ensuring data integrity."
    },
    {
      title: "Professional Strengths",
      icon: Brain,
      color: "from-pink-500/10 via-pink-500/5 to-transparent border-pink-500/20 hover:border-pink-500/40",
      iconBg: "bg-pink-500/10",
      iconColor: "text-pink-400",
      glowColor: "group-hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]",
      skills: ["Problem Solving", "Clean Code", "OOP Principles"],
      description: "Applying strong logical thinking and industry-standard architecture designs to solve complex bugs."
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 px-6 bg-gradient-secondary relative overflow-hidden">
      {/* Visual Ambient Glows */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-primary/5 rounded-full blur-3xl glow-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-accent/5 rounded-full blur-3xl glow-pulse glow-pulse-slow pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ease-out ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 hover:scale-105 transition-transform duration-300">
            Skills & Expertise
          </h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full hover:w-24 transition-all duration-300" />
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto hover:text-foreground transition-colors duration-300">
            A comprehensive overview of my technical abilities, development frameworks, database engines, and professional strengths.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, idx) => {
            const IconComponent = cat.icon;
            return (
              <Card
                key={cat.title}
                className={`p-8 bg-gray-900/50 backdrop-blur-md border bg-gradient-to-br ${cat.color} ${cat.glowColor} group hover:scale-[1.02] hover:-translate-y-1 transition-all duration-500 ease-out`}
                style={{
                  transitionDelay: `${idx * 150}ms`,
                  transform: isIntersecting ? 'none' : 'translateY(30px)',
                  opacity: isIntersecting ? 1 : 0
                }}
              >
                <div className="flex items-start gap-5">
                  {/* Category Icon */}
                  <div className={`p-4 rounded-2xl ${cat.iconBg} ${cat.iconColor} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex items-center justify-center`}>
                    <IconComponent className="w-7 h-7" />
                  </div>

                  {/* Category Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                      {cat.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                      {cat.description}
                    </p>

                    {/* Skill Badges */}
                    <div className="flex flex-wrap gap-2.5">
                      {cat.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="px-3.5 py-1 text-sm bg-gray-950/80 border border-border/40 hover:bg-primary/20 hover:text-foreground hover:scale-105 hover:border-primary/50 transition-all duration-300 cursor-default"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
