import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import TypingText from "./TypingText";
import { useEffect, useRef } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

// ===== Neural Network Background Component =====
const NeuralBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    let W: number, H: number;
    let mx: number | null = null;
    let my: number | null = null;
    let dots: Dot[] = [];
    let animFrame: number;

    const isMobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;

    function resize() {
      W = cv.width = window.innerWidth;
      H = cv.height = window.innerHeight;
      init();
    }

    // window.addEventListener('mousemove', (e) => {
    //   mx = e.clientX;
    //   my = e.clientY;
    // });

    // window.addEventListener('mouseleave', () => {
    //   mx = null;
    //   my = null;
    // });

    window.addEventListener('resize', resize);

    class Dot {
      x: number;
      y: number;
      vx: number;
      vy: number;
      ph: number;
      isTeal: boolean;
      isEdge: boolean;
      baseA: number;
      r: number;

      constructor(edgeBias: boolean) {
        if (edgeBias) {
          const side = Math.random() < 0.5 ? 0 : 1;
          this.x = side === 0
            ? Math.random() * W * 0.32
            : W - Math.random() * W * 0.32;
        } else {
          this.x = Math.random() * W;
        }
        this.y = Math.random() * H;
        const speedMult = isMobile ? 0.34 : 0.8;
        this.vx = (Math.random() - 0.5) * speedMult;
        this.vy = (Math.random() - 0.5) * speedMult;
        this.ph = Math.random() * Math.PI * 2;

        const edgeDist = Math.min(this.x, W - this.x) / (W * 0.5);
        this.isTeal = Math.random() < 0.5;
        this.isEdge = edgeDist < 0.35;
        this.baseA = this.isEdge
          ? Math.random() * 0.15 + 0.85
          : Math.random() * 0.2 + 0.65;

        const sizeMult = isMobile ? 1.4 : 1.2;
        this.r = this.isEdge
          ? (Math.random() * 2.8 + 1.8) * sizeMult
          : (Math.random() * 2.2 + 1.4) * sizeMult;
      }

      tick() {
        this.ph += isMobile ? 0.018 : 0.04;
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < -5) this.x = W + 5;
        if (this.x > W + 5) this.x = -5;
        if (this.y < -5) this.y = H + 5;
        if (this.y > H + 5) this.y = -5;

        if (mx !== null) {
          const dx = mx - this.x;
          const dy = my - this.y;
          const d = Math.hypot(dx, dy);
          if (d < 180) {
            const f = (180 - d) / 180;
            this.x += dx * f * 0.009;
            this.y += dy * f * 0.009;
          }
        }
      }

      draw() {
        const a = Math.min(1, this.baseA + Math.sin(this.ph) * 0.08);
        const h = this.isTeal ? 185 : 265;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${h}, 100%, 72%, ${a})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r * 0.55, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${h}, 100%, 96%, ${Math.min(1, a * 1.4)})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${h}, 100%, 100%, ${Math.min(1, a * 1.5)})`;
        ctx.fill();
      }
    }

    function connect() {
      const md = isMobile ? 120 : 160;
      const mds = md * md;

      for (let i = 0; i < dots.length; i++) {
        let c = 0;
        for (let j = i + 1; j < dots.length; j++) {
          if (c > (isMobile ? 4 : 8)) break;
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const ds = dx * dx + dy * dy;
          if (ds < mds) {
            const dist = Math.sqrt(ds);
            const base = 1 - dist / md;
            const isEdge = dots[i].isEdge || dots[j].isEdge;
            const a = base * (isEdge ? 0.5 : 0.28);
            const isTeal = dots[i].isTeal && dots[j].isTeal;
            const isPurple = !dots[i].isTeal && !dots[j].isTeal;
            const color = isTeal
              ? `rgba(6,182,212,${a})`
              : isPurple
                ? `rgba(139,92,246,${a})`
                : `rgba(100,130,240,${a})`;
            ctx.strokeStyle = color;
            ctx.lineWidth = isMobile ? 0.5 : 0.55;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
            c++;
          }
        }
      }

      if (mx === null || my === null) return;
      const mouseRange = isMobile ? 150 : 220;
      for (const d of dots) {
        const dx = mx - d.x;
        const dy = my - d.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouseRange) {
          const a = (1 - dist / mouseRange) * 0.7;
          const h = d.isTeal ? 185 : 265;
          ctx.strokeStyle = `hsla(${h}, 100%, 72%, ${a})`;
          ctx.lineWidth = isMobile ? 0.6 : 0.8;
          ctx.beginPath();
          ctx.moveTo(mx, my);
          ctx.lineTo(d.x, d.y);
          ctx.stroke();
        }
      }
    }

    function drawVignette() {
      const g = ctx.createRadialGradient(W / 2, H / 2, H * 0.08, W / 2, H / 2, H * 0.72);
      g.addColorStop(0, 'rgba(8,13,26,0)');
      g.addColorStop(1, 'rgba(4,7,16,0.55)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    }

    function init() {
      dots = [];
      const total = isMobile ? 80 : 250;
      const edgeCount = Math.floor(total * 0.6);
      for (let i = 0; i < edgeCount; i++) dots.push(new Dot(true));
      for (let i = edgeCount; i < total; i++) dots.push(new Dot(false));
    }

    function loop() {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        // Only draw if the canvas is within the viewport or slightly above/below it
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          ctx.fillStyle = 'rgba(8,13,26,0.18)';
          ctx.fillRect(0, 0, W, H);
          connect();
          for (const d of dots) { d.tick(); d.draw(); }
          drawVignette();
        }
      }
      animFrame = requestAnimationFrame(loop);
    }

    resize();
    loop();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
};

// ===== Hero Component =====
const Hero = () => {
  const { ref: heroRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: '-50px'
  });

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-[#080d1a] pt-24 pb-24 sm:pt-8 sm:pb-0 sm:px-0"
    >
      {/* Neural Network Background - REPLACES VIDEO */}
      <NeuralBackground />

      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-background/50 z-10" /> */}

      {/* Content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-6">
        <div className={`transition-all duration-700 ease-out ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {/* Profile Photo */}
          <div className={`mb-6 flex justify-center transition-all duration-800 ease-out delay-150 ${isIntersecting ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full p-1 bg-gradient-to-r from-primary to-accent shadow-glow">
              <div className="w-full h-full rounded-full overflow-hidden bg-background">
                <img
                  src="/my-photo.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-primary-foreground text-5xl font-bold">ON</span>
                </div>
              </div>
            </div>
          </div>

          {/* Typing Title */}
          <h1 className={`text-2xl md:text-4xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent min-h-[2.5rem] md:min-h-[3rem] hover:scale-105 transition-all duration-700 ease-out delay-400 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <TypingText
              text="Omar Nour Eldeen"
              speed={120}
              showCursor={false}
              repeat={false}
            />
          </h1>

          <p className={`text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto hover:text-foreground transition-all duration-700 ease-out delay-450 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            I'm a Fullstack .NET Web Developer, passionate about building high-quality, scalable, and user-focused web applications
          </p>

          {/* Social Links */}
          <div className={`flex gap-4 justify-center mb-10 transition-all duration-700 ease-out delay-600 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <a href="https://github.com/Omar-Nour-eldeen" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
               className="w-12 h-12 rounded-full bg-white/5 border-2 border-purple-500 hover:bg-purple-500/20 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center text-white/90 hover:text-white">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://www.linkedin.com/in/omar-nour-eldeen/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
               className="w-12 h-12 rounded-full bg-white/5 border-2 border-emerald-500 hover:bg-emerald-500/20 hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center text-white/90 hover:text-white">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="https://mostaql.com/u/Omar_Nour_elden" target="_blank" rel="noopener noreferrer" aria-label="Mostaql"
               className="w-12 h-12 rounded-full bg-white/5 border-2 border-blue-500 hover:bg-blue-500/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center text-white/90 hover:text-white">
              <img src="/mostaql.png" alt="Mostaql" className="h-5 w-5 object-contain rounded-[5px]" />
            </a>
            <a href="mailto:mr4110140@gmail.com" aria-label="Email"
               className="w-12 h-12 rounded-full bg-white/5 border-2 border-orange-500 hover:bg-orange-500/20 hover:shadow-[0_0_20px_rgba(249,115,22,0.5)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center text-white/90 hover:text-white">
              <Mail className="h-5 w-5" />
            </a>
            <a href="https://wa.me/201123311041" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
               className="w-12 h-12 rounded-full bg-emerald-500/10 border-2 border-emerald-500 hover:bg-emerald-500/20 hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center text-emerald-400 hover:text-emerald-300">
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
            </a>
          </div>

          {/* Action Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 ease-out delay-750 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <Button 
              onClick={scrollToProjects} 
              className="w-full sm:flex-1 sm:max-w-[180px] h-14 text-base font-bold bg-gradient-primary text-white border-0 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:-translate-y-1 active:scale-95 transition-all duration-300 rounded-xl"
            >
              View Projects
              <ArrowDown className="ml-2 h-4 w-4 animate-bounce" />
            </Button>
            <Button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} 
              className="w-full sm:flex-1 sm:max-w-[180px] h-14 text-base font-bold bg-slate-900/60 backdrop-blur-md border border-white/10 hover:border-white/30 text-white hover:bg-white/10 hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-300 rounded-xl"
            >
              Contact Me
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;