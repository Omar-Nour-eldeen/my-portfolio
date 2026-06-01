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
              text="Fullstack .NET Web Developer"
              speed={120}
              showCursor={false}
              repeat={false}
            />
          </h1>

          <p className={`text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto hover:text-foreground transition-all duration-700 ease-out delay-450 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            I'm a Fullstack .NET Web Developer, passionate about building high-quality, scalable, and user-focused web applications
          </p>

          {/* Social Links */}
          <div className={`flex gap-4 justify-center mb-8 transition-all duration-700 ease-out delay-600 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <Button variant="outline" size="icon" className="hover:shadow-glow hover:scale-110 transition-all duration-300" asChild>
              <a href="https://github.com/Omar-Nour-eldeen" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="outline" size="icon" className="hover:shadow-glow hover:scale-110 transition-all duration-300" asChild>
              <a href="https://www.linkedin.com/in/omar-nour-eldeen/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="outline" size="icon" className="hover:shadow-glow hover:scale-110 transition-all duration-300" asChild>
              <a href="https://mostaql.com/u/Omar_Nour_elden" target="_blank" rel="noopener noreferrer" aria-label="Mostaql">
                <img src="/mostaql.png" alt="Mostaql" className="h-5 w-5 object-contain rounded-[5px]" />
              </a>
            </Button>
            <Button variant="outline" size="icon" className="hover:shadow-glow hover:scale-110 transition-all duration-300" asChild>
              <a href="mailto:mr4110140@gmail.com" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </Button>
          </div>

          {/* Action Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 ease-out delay-750 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <Button onClick={scrollToProjects} className="w-full sm:flex-1 sm:max-w-40 h-14 bg-transparent border-2 border-primary/30 hover:border-primary hover:bg-primary/20 hover:shadow-glow hover:scale-105 transition-all duration-300 text-primary hover:text-white">
              View Projects
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
            <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:flex-1 sm:max-w-40 h-14 bg-transparent border-2 border-accent/30 hover:border-accent hover:bg-accent/20 hover:shadow-glow hover:scale-105 transition-all duration-300 text-accent hover:text-white">
              Contact Me
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;