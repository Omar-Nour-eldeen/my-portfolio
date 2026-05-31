import { Card } from "@/components/ui/card";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useState } from "react";
import { Network, Layers, Database } from "lucide-react";

// ===== Official SVG Brand Icons with Premium Hover Shadows and Gradients =====

interface IconProps {
  isHovered?: boolean;
}

const CSharpIcon = ({ isHovered }: IconProps) => (
  <img
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg"
    alt="C#"
    className={`w-14 h-14 object-contain transition-all duration-500 ${
      isHovered ? "drop-shadow-[0_8px_16px_rgba(155,79,150,0.65)] scale-105" : ""
    }`}
  />
);

const DotNetIcon = ({ isHovered }: IconProps) => (
  <img
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg"
    alt="ASP.NET Core"
    className={`w-14 h-14 object-contain transition-all duration-500 brightness-200 ${
      isHovered ? "drop-shadow-[0_8px_16px_rgba(81,43,212,0.65)] scale-105" : ""
    }`}
  />
);

const EFIcon = ({ isHovered }: IconProps) => (
  <div className="relative w-14 h-14 flex items-center justify-center">
    <svg width="0" height="0" className="absolute">
      <defs>
        <linearGradient id="efGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c084fc" /> {/* purple-400 */}
          <stop offset="100%" stopColor="#818cf8" /> {/* indigo-400 */}
        </linearGradient>
      </defs>
    </svg>
    <Layers
      className={`w-14 h-14 stroke-[1.5] transition-all duration-500 ${
        isHovered
          ? "stroke-[1.8] drop-shadow-[0_8px_16px_rgba(112,71,235,0.75)] [stroke:url(#efGradient)] scale-105 rotate-6"
          : "text-purple-400/80"
      }`}
    />
  </div>
);

const JavaScriptIcon = ({ isHovered }: IconProps) => (
  <img
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"
    alt="JavaScript"
    className={`w-14 h-14 object-contain rounded transition-all duration-500 ${
      isHovered ? "drop-shadow-[0_8px_16px_rgba(247,223,30,0.45)] scale-105" : ""
    }`}
  />
);

const HTML5Icon = ({ isHovered }: IconProps) => (
  <img
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg"
    alt="HTML5"
    className={`w-14 h-14 object-contain transition-all duration-500 ${
      isHovered ? "drop-shadow-[0_8px_16px_rgba(227,79,38,0.65)] scale-105" : ""
    }`}
  />
);

const CSS3Icon = ({ isHovered }: IconProps) => (
  <img
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg"
    alt="CSS3"
    className={`w-14 h-14 object-contain transition-all duration-500 ${
      isHovered ? "drop-shadow-[0_8px_16px_rgba(21,114,182,0.65)] scale-105" : ""
    }`}
  />
);

const BootstrapIcon = ({ isHovered }: IconProps) => (
  <img
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg"
    alt="Bootstrap"
    className={`w-14 h-14 object-contain transition-all duration-500 ${
      isHovered ? "drop-shadow-[0_8px_16px_rgba(121,82,179,0.65)] scale-105" : ""
    }`}
  />
);

const SQLIcon = ({ isHovered }: IconProps) => (
  <div className="relative w-14 h-14 flex items-center justify-center">
    <svg width="0" height="0" className="absolute">
      <defs>
        <linearGradient id="sqlGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" /> {/* sky-400 */}
          <stop offset="100%" stopColor="#0284c7" /> {/* sky-600 */}
        </linearGradient>
      </defs>
    </svg>
    <Database
      className={`w-14 h-14 stroke-[1.5] transition-all duration-500 ${
        isHovered
          ? "stroke-[1.8] drop-shadow-[0_8px_16px_rgba(56,189,248,0.75)] [stroke:url(#sqlGradient)] scale-105"
          : "text-sky-400/80"
      }`}
    />
  </div>
);

const SpringBootIcon = ({ isHovered }: IconProps) => (
  <img
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg"
    alt="Spring Boot"
    className={`w-14 h-14 object-contain transition-all duration-500 ${
      isHovered ? "drop-shadow-[0_8px_16px_rgba(109,179,63,0.65)] scale-105" : ""
    }`}
  />
);

const DockerIcon = ({ isHovered }: IconProps) => (
  <img
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"
    alt="Docker"
    className={`w-14 h-14 object-contain transition-all duration-500 ${
      isHovered ? "drop-shadow-[0_8px_16px_rgba(36,150,237,0.65)] scale-105" : ""
    }`}
  />
);

const AWSIcon = ({ isHovered }: IconProps) => (
  <img
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
    alt="AWS"
    className={`w-14 h-14 object-contain invert hue-rotate-180 transition-all duration-500 ${
      isHovered ? "drop-shadow-[0_8px_16px_rgba(255,153,0,0.65)] scale-105" : ""
    }`}
  />
);

const GitIcon = ({ isHovered }: IconProps) => (
  <img
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg"
    alt="Git"
    className={`w-14 h-14 object-contain transition-all duration-500 ${
      isHovered ? "drop-shadow-[0_8px_16px_rgba(240,80,50,0.65)] scale-105" : ""
    }`}
  />
);

const GitHubIcon = ({ isHovered }: IconProps) => (
  <img
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
    alt="GitHub"
    className={`w-14 h-14 object-contain invert transition-all duration-500 ${
      isHovered
        ? "drop-shadow-[0_8px_16px_rgba(255,255,255,0.35)] scale-105"
        : ""
    }`}
  />
);

const MicroservicesIcon = ({ isHovered }: IconProps) => (
  <div className="relative w-14 h-14 flex items-center justify-center">
    <svg width="0" height="0" className="absolute">
      <defs>
        <linearGradient id="microGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34d399" /> {/* emerald-400 */}
          <stop offset="100%" stopColor="#059669" /> {/* emerald-600 */}
        </linearGradient>
      </defs>
    </svg>
    <Network
      className={`w-14 h-14 stroke-[1.5] transition-all duration-500 ${
        isHovered
          ? "stroke-[1.8] drop-shadow-[0_8px_16px_rgba(52,211,153,0.75)] [stroke:url(#microGradient)] scale-105 -rotate-6"
          : "text-emerald-400/80"
      }`}
    />
  </div>
);

const Skills = () => {
  const { ref: sectionRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "-50px"
  });

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const skillsList = [
    { name: "ASP.NET Core", icon: DotNetIcon, glow: "rgba(81,43,212,0.45)", brandColor: "#8560ff" },
    { name: "Entity Framework", icon: EFIcon, glow: "rgba(112,71,235,0.45)", brandColor: "#936eff" },
    { name: "C#", icon: CSharpIcon, glow: "rgba(155,79,150,0.45)", brandColor: "#c26ebc" },
    { name: "SQL", icon: SQLIcon, glow: "rgba(56,189,248,0.45)", brandColor: "#38bdf8" },
    { name: "Spring Boot", icon: SpringBootIcon, glow: "rgba(109,179,63,0.45)", brandColor: "#82cf4f" },
    { name: "Microservices", icon: MicroservicesIcon, glow: "rgba(14,159,110,0.45)", brandColor: "#22c55e" },
    { name: "Docker", icon: DockerIcon, glow: "rgba(36,150,237,0.45)", brandColor: "#3ba2ff" },
    { name: "AWS", icon: AWSIcon, glow: "rgba(255,153,0,0.45)", brandColor: "#ffaa2b" },
    { name: "Bootstrap", icon: BootstrapIcon, glow: "rgba(121,82,179,0.45)", brandColor: "#9b72e3" },
    { name: "JavaScript", icon: JavaScriptIcon, glow: "rgba(247,223,30,0.35)", brandColor: "#fde047" },
    { name: "CSS3", icon: CSS3Icon, glow: "rgba(21,114,182,0.45)", brandColor: "#2e9be6" },
    { name: "HTML5", icon: HTML5Icon, glow: "rgba(227,79,38,0.45)", brandColor: "#ff6b4a" },
    { name: "Git", icon: GitIcon, glow: "rgba(240,80,50,0.45)", brandColor: "#ff765c" },
    { name: "GitHub", icon: GitHubIcon, glow: "rgba(255,255,255,0.2)", brandColor: "#ffffff" }
  ];

  return (
    <section ref={sectionRef} className="py-20 px-6 bg-gradient-secondary relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ease-out ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 hover:scale-105 transition-transform duration-300">Skills & Expertise</h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full hover:w-24 transition-all duration-300" />
          <p className="text-xl text-muted-foreground mt-6 max-w-2xl mx-auto hover:text-foreground transition-colors duration-300">
            A visual overview of the tools, languages, and technologies I specialize in to build high-performance web applications.
          </p>
        </div>

        {/* Unified Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skillsList.map((skill, idx) => {
            const IconComponent = skill.icon;
            const isHovered = hoveredIdx === idx;
            return (
              <Card
                key={skill.name}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="p-6 bg-slate-900/30 backdrop-blur-xl border flex flex-col items-center justify-center text-center gap-4 group hover:scale-[1.03] hover:-translate-y-2 transition-all duration-500 ease-out cursor-default overflow-hidden relative"
                style={{
                  borderColor: isHovered 
                    ? `${skill.brandColor}80` 
                    : `${skill.brandColor}80`,
                  boxShadow: isHovered 
                    ? `0 20px 40px -15px rgba(0,0,0,0.7), 0 0 30px ${skill.glow}` 
                    : 'none',
                  transitionDelay: `${idx * 25}ms`,
                  transform: isIntersecting ? (isHovered ? 'scale(1.03) translateY(-8px)' : 'none') : 'translateY(30px)',
                  opacity: isIntersecting ? 1 : 0
                }}
              >
                {/* Interactive Glassmorphic Shine Effect */}
                <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

                {/* Skill Logo Container with Premium Halo Background */}
                <div className="relative flex-shrink-0 w-20 h-20 flex items-center justify-center rounded-2xl bg-white/5 border border-white/5 group-hover:bg-white/10 group-hover:border-white/10 transition-all duration-300 shadow-inner">
                  {/* Halo Background Glow */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none scale-75"
                    style={{
                      background: `radial-gradient(circle, ${skill.glow} 0%, transparent 75%)`
                    }}
                  />
                  
                  {/* Icon Wrapper */}
                  <div className="relative z-10 flex items-center justify-center">
                    <IconComponent isHovered={isHovered} />
                  </div>
                </div>

                {/* Skill Name */}
                <div className="mt-2 relative z-10">
                  <h3 
                    className="text-base sm:text-lg font-bold text-foreground transition-colors duration-300 select-none"
                    style={{
                      color: isHovered ? skill.brandColor : undefined
                    }}
                  >
                    {skill.name}
                  </h3>
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
