import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Smartphone, Database, Cloud, Palette, Zap, Laptop, Layout, Monitor, Network, Server } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
const Services = () => {
  const { ref: servicesRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '-50px'
  });
  
  const services = [
    {
      title: "Web Development",
      description: "Full-stack web applications using modern technologies like .NET Core, and Bootstrap.",
      icon: Laptop,
      features: ["Responsive Design", "API Development", "Performance Optimization"]
    },
    {
      title: "Web APIs",
      description: "Designing and implementing scalable APIs using .NET Core for seamless data communication between client and server.",
      icon: Network,
      features: [
        "Secure Authentication & Authorization",
        "Database Integration"
      ]
    },
    {
      title: "Frontend Development",
      description: "Creating responsive, interactive, and user-friendly web interfaces using modern technologies like Bootstrap.",
      icon: Layout,
      features: [
        "Responsive Design",
        "UI/UX Implementation",
        "API Integration"
      ]
    },
    {
      title: "Database Design",
      description: "Database architecture, optimization, and management for scalable applications.",
      icon: Database,
      features: ["SQL & SQL Server", "Performance Tuning", "Data Migration"]
    },
  ];

  return (
    <section ref={servicesRef} className="py-20 px-6 bg-gradient-secondary">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transform-gpu will-change-transform transition-all duration-700 ease-out ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 hover:scale-105 transition-transform duration-300">Services I Offer</h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full hover:w-24 transition-all duration-300" />
          <p className="text-xl text-muted-foreground mt-6 max-w-2xl mx-auto hover:text-foreground transition-colors duration-300">
            Comprehensive solutions to bring your digital ideas to life
          </p>
        </div>
        
        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transform-gpu will-change-transform transition-all duration-700 ease-out ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {services.map((service, index) => (
            <Card 
              key={index}
              className="group overflow-hidden bg-gray-800 border-border/50 hover:shadow-elegant transition-all duration-300 hover:-translate-y-2"
            >
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4 hover:bg-primary/30 transition-colors duration-300">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary hover:scale-105 transition-all duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 hover:text-foreground transition-colors duration-300">
                    {service.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 hover:scale-105 transition-transform duration-300">Features:</h4>
                    <div className="space-y-1">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-2">
                          <span className="w-2 h-2 bg-primary rounded-full"></span>
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
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

export default Services;
