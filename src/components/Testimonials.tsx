import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const Testimonials = () => {
  const { ref: testimonialsRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '-50px'
  });
  
  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "CEO, TechStart",
      content: "Omar delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and technical expertise are outstanding.",
      rating: 5,
      avatar: "/avatar1.jpg"
    },
    {
      name: "Michael Chen",
      position: "Product Manager, InnovateCorp",
      content: "Working with Omar was a pleasure. He transformed our complex requirements into a beautiful, functional application. Highly recommended!",
      rating: 5,
      avatar: "/avatar2.jpg"
    },
    {
      name: "Emily Rodriguez",
      position: "Founder, CreativeStudio",
      content: "Omar's development skills are top-notch. He built our portfolio website quickly and it looks absolutely stunning. Great communication throughout.",
      rating: 5,
      avatar: "/avatar3.jpg"
    },
    {
      name: "David Thompson",
      position: "CTO, DataFlow",
      content: "Exceptional developer with deep knowledge of modern technologies. Omar helped us scale our application and improve performance significantly.",
      rating: 5,
      avatar: "/avatar4.jpg"
    }
  ];

  return (
    <section ref={testimonialsRef} className="py-20 px-6 bg-gradient-secondary">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ease-out ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 hover:scale-105 transition-transform duration-300">Client Testimonials</h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full hover:w-24 transition-all duration-300" />
          <p className="text-xl text-muted-foreground mt-6 max-w-2xl mx-auto hover:text-foreground transition-colors duration-300">
            What my clients say about working with me
          </p>
        </div>
        
        <div className={`grid md:grid-cols-2 gap-8 transform-gpu will-change-transform transition-all duration-700 ease-out ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="group overflow-hidden bg-card/50 md:backdrop-blur-sm backdrop-blur-none border-border/50 hover:shadow-elegant transition-all duration-300 hover:-translate-y-2"
            >
              <CardContent className="p-8">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center hover:bg-primary/30 transition-colors duration-300">
                    <Quote className="w-6 h-6 text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    
                    <p className="text-muted-foreground mb-6 italic hover:text-foreground transition-colors duration-300">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold hover:scale-105 transition-transform duration-300">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
                          {testimonial.position}
                        </p>
                      </div>
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

export default Testimonials;
