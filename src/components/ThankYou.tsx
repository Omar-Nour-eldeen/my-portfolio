import { Button } from "@/components/ui/button";
import { Heart, ArrowUp, Mail, Github, Linkedin } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

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
      href: "mailto:mr4110140@gmail.com",
      icon: Mail,
      title: "Contact Me",
      description: "Ready to start your next project? Let's discuss your ideas!",
      border: "#fb923c",
      glow: "rgba(251,146,60,0.35)",
      bg: "rgba(251,146,60,0.1)",
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
