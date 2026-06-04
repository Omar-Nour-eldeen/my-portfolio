import { Card, CardContent } from "@/components/ui/card";
import { Laptop, Network, Layout, Database } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useState } from "react";

const Services = () => {
  const { ref: servicesRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.15,
    rootMargin: '-50px'
  });

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const services = [
    {
      title: "Web Development",
      description: "Full-stack web applications using modern technologies like .NET Core, and Bootstrap.",
      icon: Laptop,
      features: ["Responsive Design", "API Development", "Performance Optimization"],
      accentColor: "#a78bfa",  // purple-400
      glow: "rgba(167,139,250,0.4)",
      gradientFrom: "#a78bfa",
      gradientTo: "#818cf8",
    },
    {
      title: "Web APIs",
      description: "Designing and implementing scalable APIs using .NET Core for seamless data communication between client and server.",
      icon: Network,
      features: ["Secure Auth & Authorization", "Database Integration"],
      accentColor: "#34d399",  // emerald-400
      glow: "rgba(52,211,153,0.4)",
      gradientFrom: "#34d399",
      gradientTo: "#06b6d4",
    },
    {
      title: "Frontend Development",
      description: "Creating responsive, interactive, and user-friendly web interfaces using modern technologies like Bootstrap.",
      icon: Layout,
      features: ["Responsive Design", "UI/UX Implementation", "API Integration"],
      accentColor: "#38bdf8",  // sky-400
      glow: "rgba(56,189,248,0.4)",
      gradientFrom: "#38bdf8",
      gradientTo: "#818cf8",
    },
    {
      title: "Database Design",
      description: "Database architecture, optimization, and management for scalable applications.",
      icon: Database,
      features: ["SQL & SQL Server", "Performance Tuning", "Data Migration"],
      accentColor: "#fb923c",  // orange-400
      glow: "rgba(251,146,60,0.4)",
      gradientFrom: "#fb923c",
      gradientTo: "#f472b6",
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6 hover:scale-105 transition-transform duration-300">Services I Offer</h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full hover:w-24 transition-all duration-300" />
          <p className="text-xl text-muted-foreground mt-6 max-w-2xl mx-auto hover:text-foreground transition-colors duration-300">
            Comprehensive solutions to bring your digital ideas to life
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
                className="group overflow-hidden md:backdrop-blur-xl backdrop-blur-none relative cursor-default transition-all duration-500 ease-out"
                style={{
                  border: `1.5px solid ${service.accentColor}80`,
                  background: `linear-gradient(135deg, ${service.gradientFrom}10, ${service.gradientTo}08, rgba(15,23,42,0.9))`,
                  boxShadow: isHovered
                    ? `0 20px 40px -15px rgba(0,0,0,0.7), 0 0 30px ${service.glow}`
                    : 'none',
                  transitionDelay: `${index * 25}ms`,
                  transform: isIntersecting ? (isHovered ? 'scale(1.03) translateY(-8px)' : 'none') : 'translateY(30px)',
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

                <CardContent className="p-8 md:p-10 relative z-10">
                  <div className="flex flex-col sm:flex-row items-start gap-6">
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
                        className="relative w-16 h-16 rounded-2xl flex items-center justify-center border transition-all duration-500"
                        style={{
                          background: `linear-gradient(135deg, ${service.gradientFrom}20, ${service.gradientTo}15)`,
                          borderColor: `${service.accentColor}40`,
                          boxShadow: `0 0 15px ${service.glow.replace('0.4', '0.15')}`,
                        }}
                      >
                        <IconComponent 
                          className="w-8 h-8 transition-all duration-500"
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
                        className="text-xl font-bold mb-3 transition-colors duration-400"
                        style={{
                          color: service.accentColor,
                          textShadow: `0 0 10px ${service.glow.replace('0.4', '0.1')}`,
                        }}
                      >
                        {service.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-5 leading-relaxed text-[15px] group-hover:text-slate-200 transition-colors duration-300">
                        {service.description}
                      </p>
                      
                      {/* Feature tags */}
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature, idx) => (
                          <span 
                            key={idx} 
                            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-300"
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
