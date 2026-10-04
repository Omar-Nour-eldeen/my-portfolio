import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Layers, Briefcase, Users, User, ArrowRight, FileCode2 } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useProjects } from "@/hooks/use-projects";

type ProjectCategory = "all" | "freelance" | "team" | "personal";

const Projects = () => {
  const { projects } = useProjects();
  const { ref: projectsRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.05,
    rootMargin: '-50px'
  });

  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");

  const categories = [
    { id: "all", label: "All Projects", icon: Layers },
    { id: "team", label: "Team Projects", icon: Users },
    { id: "personal", label: "Personal Projects", icon: User },
    { id: "freelance", label: "Freelance", icon: Briefcase }
  ] as const;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "freelance":
        return "bg-gradient-to-r from-amber-500 to-orange-500 shadow-orange-500/30";
      case "team":
        return "bg-gradient-to-r from-purple-600 to-purple-400 shadow-purple-500/30";
      case "personal":
        return "bg-gradient-to-r from-emerald-500 to-teal-400 shadow-emerald-500/30";
      default:
        return "bg-gradient-to-r from-primary to-accent shadow-primary/30";
    }
  };

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case "freelance":
        return {
          accentColor: "#f59e0b",
          gradientFrom: "#f59e0b",
          gradientTo: "#f97316",
          glow: "rgba(245, 158, 11, 0.4)"
        };
      case "team":
        return {
          accentColor: "#a855f7",
          gradientFrom: "#9333ea",
          gradientTo: "#c084fc",
          glow: "rgba(168, 85, 247, 0.4)"
        };
      case "personal":
        return {
          accentColor: "#10b981",
          gradientFrom: "#10b981",
          gradientTo: "#2dd4bf",
          glow: "rgba(16, 185, 129, 0.4)"
        };
      default:
        return {
          accentColor: "#6366f1",
          gradientFrom: "#6366f1",
          gradientTo: "#a855f7",
          glow: "rgba(99, 102, 241, 0.4)"
        };
    }
  };

  const filteredProjects = projects.filter(
    (project) => activeFilter === "all" || project.category === activeFilter
  );

  return (
    <section ref={projectsRef} id="projects" className="py-20 px-6 bg-gradient-secondary relative overflow-hidden">
      {/* Decorative background gradients */}
      <div className="hidden md:block absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden md:block absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transform-gpu will-change-transform transition-all duration-700 ease-out ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 hover:scale-105 transition-transform duration-300">My Projects</h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full hover:w-24 transition-all duration-300 mb-4" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Click on any project to explore system architecture, API documentation, Docker configurations, and relational database schemas.
          </p>
        </div>

        {/* Filters */}
        <div className={`flex flex-wrap justify-center gap-3 mb-16 transform-gpu transition-all duration-700 delay-150 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeFilter === cat.id;
            const styles = getCategoryStyles(cat.id);

            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border-[1.5px] group ${isActive
                    ? `border-transparent text-white shadow-lg scale-105 ${getCategoryColor(cat.id)}`
                    : 'text-muted-foreground hover:text-white bg-slate-900/60 backdrop-blur-md hover:scale-102'
                  }`}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.boxShadow = `0 0 15px ${styles.glow.replace('0.4', '0.3')}`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
                style={isActive ? {} : { borderColor: styles.accentColor }}
              >
                <Icon
                  className="w-4 h-4 transition-colors duration-300"
                  style={{ color: isActive ? 'white' : styles.accentColor }}
                />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project, index) => {
            const styles = getCategoryStyles(project.category);
            return (
              <div
                key={project.id}
                className={`relative group w-full h-full transform-gpu transition-all duration-700 ease-out flex flex-col ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {/* Premium Ambient Glow */}
                <div
                  className="absolute -inset-1.5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none"
                  style={{ background: `linear-gradient(to right, ${styles.gradientFrom}40, ${styles.gradientTo}40)` }}
                />

                {/* Colored Card Wrapper */}
                <div
                  className="relative flex-1 rounded-2xl group-hover:-translate-y-2 transition-all duration-500"
                  style={{
                    border: `1.5px solid ${styles.accentColor}`,
                    boxShadow: `0 10px 30px -10px ${styles.glow.replace('0.4', '0.2')}`
                  }}
                >
                  <div
                    className="relative h-full overflow-hidden rounded-2xl md:backdrop-blur-xl backdrop-blur-none transition-all duration-500 flex flex-col justify-between"
                    style={{
                      background: `linear-gradient(135deg, ${styles.gradientFrom}15, ${styles.gradientTo}08, rgba(15,23,42,0.95))`
                    }}
                  >
                    {/* Image Top Panel */}
                    <Link to={`/project/${project.id}`} className="block relative overflow-hidden aspect-video w-full border-b border-primary/20">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                      {/* Category Label on Image */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className={`inline-block rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg ${getCategoryColor(project.category)}`}>
                          {project.categoryLabel}
                        </span>
                      </div>

                      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                        <span className="px-4 py-2 rounded-xl bg-slate-900/90 text-white font-bold text-xs flex items-center gap-2 border border-white/20 shadow-xl">
                          <FileCode2 className="w-4 h-4 text-primary" /> View Specs & Architecture
                        </span>
                      </div>
                    </Link>

                    {/* Card Content Details */}
                    <div className="p-4 md:p-5 flex-1 flex flex-col justify-between gap-3">
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <Link to={`/project/${project.id}`}>
                            <h3
                              className="text-lg font-bold transition-colors duration-300 line-clamp-1 hover:underline"
                              style={{ color: styles.accentColor }}
                            >
                              {project.title}
                            </h3>
                          </Link>
                        </div>

                        <p className="text-muted-foreground mb-3 leading-snug transition-colors duration-300 text-sm">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium transition-all duration-300"
                              style={{
                                background: `${styles.accentColor}15`,
                                borderColor: `${styles.accentColor}40`,
                                color: styles.accentColor,
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                        {/* Live & GitHub Action Buttons */}
                        {(() => {
                          const hasLive = Boolean(project.links?.live && project.links.live !== "#" && project.links.live.trim());
                          const hasGithub = Boolean(project.links?.github && project.links.github !== "#" && project.links.github.trim());

                          if (!hasLive && !hasGithub) return null;

                          return (
                            <div className={`grid ${hasLive && hasGithub ? "grid-cols-2" : "grid-cols-1"} gap-2`}>
                              {hasLive && (
                                <a
                                  href={project.links.live}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white bg-slate-900/90 border border-emerald-500/40 hover:border-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 transition-all duration-300 shadow-sm group/btn"
                                >
                                  <ExternalLink className="w-3.5 h-3.5 text-emerald-400 group-hover/btn:scale-110 transition-transform" />
                                  <span>Live Demo</span>
                                </a>
                              )}

                              {hasGithub && (
                                <a
                                  href={project.links.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white bg-slate-900/90 border border-purple-500/40 hover:border-purple-400 hover:bg-purple-500/20 hover:text-purple-300 transition-all duration-300 shadow-sm group/btn"
                                >
                                  <Github className="w-3.5 h-3.5 text-purple-400 group-hover/btn:scale-110 transition-transform" />
                                  <span>GitHub</span>
                                </a>
                              )}
                            </div>
                          );
                        })()}

                        {/* View Architecture Button */}
                        <Button
                          asChild
                          size="sm"
                          className="w-full rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 font-bold text-xs text-white shadow-md border-0"
                          style={{ background: `linear-gradient(to right, ${styles.gradientFrom}, ${styles.gradientTo})` }}
                        >
                          <Link to={`/project/${project.id}`} className="flex items-center justify-center gap-2 py-2">
                            <Layers className="w-3.5 h-3.5" /> View Architecture <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </Button>
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

export default Projects;