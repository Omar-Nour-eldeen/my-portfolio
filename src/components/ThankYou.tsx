import { Button } from "@/components/ui/button";
import { Heart, ArrowUp, Mail, Github, Linkedin } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const WhatsAppIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={`fill-current ${className}`} style={style} viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

const ThankYou = () => {
  const { ref: thankYouRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '-50px'
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cards = [
    {
      href: "https://wa.me/201123311041",
      icon: WhatsAppIcon,
      title: "Contact Me",
      description: "Send me a direct message on WhatsApp anytime.",
      border: "#10b981",
      glow: "rgba(16,185,129,0.35)",
      bg: "rgba(16,185,129,0.1)",
      external: true,
    },
    {
      href: "https://github.com/Omar-Nour-eldeen",
      icon: Github,
      title: "View My Code",
      description: "Check out my open source projects and contributions.",
      border: "#a855f7",
      glow: "rgba(168,85,247,0.35)",
      bg: "rgba(168,85,247,0.1)",
      external: true,
    },
    {
      href: "https://www.linkedin.com/in/omar-nour-eldeen/",
      icon: Linkedin,
      title: "Connect",
      description: "Let's connect and stay updated with my latest work.",
      border: "#38bdf8",
      glow: "rgba(56,189,248,0.35)",
      bg: "rgba(56,189,248,0.1)",
      external: true,
    },
  ];

  return (
    <section ref={thankYouRef} className="py-20 px-6 bg-gradient-secondary relative overflow-hidden">
      {/* Ambient background orbs */}
      <div className="absolute top-10 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">

        {/* Header */}
        <div className={`mb-14 transform-gpu will-change-transform transition-all duration-700 ease-out ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>

          {/* Glowing Heart Icon */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-purple-500 to-accent blur-xl opacity-60 animate-pulse" />
            <div className="relative w-full h-full rounded-full p-[2px] bg-gradient-to-br from-primary via-purple-500 to-accent">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                <Heart className="w-10 h-10 text-transparent bg-gradient-to-br from-primary to-accent bg-clip-text fill-primary" />
              </div>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Thank You!
          </h2>

          <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full mb-8" />

          <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
            Thank you for taking the time to explore my portfolio. I hope you've enjoyed learning about my work and experience.
          </p>

          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I'm always excited to work on new projects and collaborate with amazing people.
            Whether you have a project in mind or just want to connect,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-primary font-semibold">I'd love to hear from you!</span>
          </p>
        </div>

        {/* Cards */}
        <div className={`grid md:grid-cols-3 gap-6 mb-14 transform-gpu will-change-transform transition-all duration-700 ease-out ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {cards.map((card) => {
            const IconComponent = card.icon;
            return (
              <a
                key={card.title}
                href={card.href}
                target={card.external ? "_blank" : undefined}
                rel={card.external ? "noopener noreferrer" : undefined}
                className="relative group block"
              >
                {/* Ambient Glow */}
                <div
                  className="absolute -inset-1 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: card.glow }}
                />
                <div
                  className="relative rounded-2xl bg-slate-900/60 backdrop-blur-xl border-2 p-8 group-hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                  style={{ borderColor: card.border }}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

                  {/* Icon */}
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110"
                    style={{ background: card.bg, border: `1px solid ${card.border}40` }}
                  >
                    <IconComponent className="w-8 h-8" style={{ color: card.border }} />
                  </div>

                  <h3 className="text-lg font-bold mb-2 text-white/90 group-hover:text-white transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground group-hover:text-white/70 transition-colors duration-300 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </a>
            );
          })}
        </div>

        {/* Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center transform-gpu will-change-transform transition-all duration-700 ease-out ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <Button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="h-12 px-8 text-base font-bold bg-gradient-primary text-white border-0 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 rounded-xl"
          >
            Start a Project
          </Button>

          <Button
            onClick={scrollToTop}
            className="h-12 px-8 text-base font-bold bg-slate-900/60 backdrop-blur-md border border-white/10 hover:border-white/30 text-white hover:bg-white/10 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all duration-300 rounded-xl"
          >
            <ArrowUp className="w-4 h-4 mr-2" />
            Back to Top
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ThankYou;
