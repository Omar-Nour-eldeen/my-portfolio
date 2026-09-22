import { useState } from "react";
import { Star, CheckCircle2, ExternalLink, Maximize2, X } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const Testimonials = () => {
  const { ref: testimonialsRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.15,
    rootMargin: '-50px'
  });

  const [selectedImage, setSelectedImage] = useState<{ src: string } | null>(null);

  const realTestimonials = [
    {
      image: "/Client Testimonials/Screenshot 2026-09-17 at 18-54-01 Omar Nour Eldin - التقييمات مستقل.png"
    },
    {
      image: "/Client Testimonials/Screenshot 2026-09-17 at 18-55-28 تصميم موقع إلكتروني لفندق مستقل.png"
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
        {/* Testimonial Cards Grid */}
        <div className={`grid md:grid-cols-2 gap-8 transition-all duration-700 ease-out ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {realTestimonials.map((item, index) => (
            <div key={index} className="relative group w-full">
              {/* Premium Ambient Glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-primary/20 via-purple-500/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none" />

              {/* Colored Gradient Border Wrapper */}
              <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-primary via-purple-500 to-accent group-hover:-translate-y-2 transition-all duration-500">

                {/* Glassmorphic Card Container */}
                <div className="relative overflow-hidden bg-slate-900/95 md:backdrop-blur-xl backdrop-blur-none rounded-2xl hover:shadow-elegant transition-all duration-500 flex flex-col justify-between">
                  {/* Interactive Glassmorphic Shine Effect */}
                  <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

                  {/* Image Preview Container */}
                  <div 
                    className="relative cursor-pointer overflow-hidden bg-slate-950 aspect-[16/10] border-b border-white/10 group/img"
                    onClick={() => setSelectedImage({ src: item.image })}
                  >
                    <img 
                      src={item.image} 
                      alt="Testimonial"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/img:scale-105"
                    />
                    <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white font-medium">
                      <div className="px-4 py-2 rounded-xl bg-slate-900/90 border border-white/20 backdrop-blur-md flex items-center gap-2 shadow-2xl">
                        <Maximize2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm">Click to Zoom</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 md:p-6 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-xs font-bold text-yellow-400 ms-2">5.0 / 5.0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] bg-slate-900 border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 bg-slate-950 border-b border-white/10">
              <button
                onClick={() => setSelectedImage(null)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-auto flex-1 flex items-center justify-center bg-slate-950/60">
              <img
                src={selectedImage.src}
                className="max-w-full max-h-[75vh] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;

