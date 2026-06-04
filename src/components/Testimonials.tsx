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
        
        <div className={`grid md:grid-cols-2 gap-6 transform-gpu will-change-transform transition-all duration-700 ease-out ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {testimonials.map((testimonial, index) => {
            const accentColors = [
              { border: "#a855f7", glow: "rgba(168,85,247,0.3)", bg: "rgba(168,85,247,0.08)" },
              { border: "#34d399", glow: "rgba(52,211,153,0.3)", bg: "rgba(52,211,153,0.08)" },
              { border: "#38bdf8", glow: "rgba(56,189,248,0.3)", bg: "rgba(56,189,248,0.08)" },
              { border: "#fb923c", glow: "rgba(251,146,60,0.3)",  bg: "rgba(251,146,60,0.08)"  },
            ];
            const color = accentColors[index % accentColors.length];
            return (
              <div key={index} className="relative group">
                {/* Ambient Glow */}
                <div
                  className="absolute -inset-1 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: color.glow }}
                />
                <div
                  className="relative overflow-hidden rounded-2xl bg-slate-900/60 md:backdrop-blur-xl backdrop-blur-none border-2 group-hover:-translate-y-2 transition-all duration-500"
                  style={{ borderColor: color.border }}
                >
                  {/* Shine sweep */}
                  <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

                  <div className="p-8">
                    {/* Quote icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                      style={{ background: color.bg, border: `1px solid ${color.border}40` }}
                    >
                      <Quote className="w-6 h-6" style={{ color: color.border }} />
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    <p className="text-muted-foreground mb-6 italic leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                      "{testimonial.content}"
                    </p>

                    {/* Divider */}
                    <div className="h-px mb-5" style={{ background: `linear-gradient(to right, ${color.border}40, transparent)` }} />

                    <div className="flex items-center gap-3">
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center border-2 font-bold text-white text-sm transition-all duration-300 group-hover:scale-110"
                        style={{ background: color.bg, borderColor: color.border, color: color.border }}
                      >
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-bold text-white/90">{testimonial.name}</h4>
                        <p className="text-sm" style={{ color: color.border }}>{testimonial.position}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
