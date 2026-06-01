import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Building, ChevronRight, Award, ExternalLink, Loader2 } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

interface Certificate {
  title: string;
  image: string;
  pdf: string;
}

interface ExperienceItem {
  position: string;
  company: string;
  period?: string;
  location?: string;
  description: string;
  technologies: string[];
  achievements: string[];
  certificates?: Certificate[];
  logo?: string;
}

const ExperienceCard = ({ item }: { item: ExperienceItem }) => {
  const [logoError, setLogoError] = useState(false);

  return (
    <div className="relative group w-full">
      {/* Premium Ambient Glow */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-primary/20 via-purple-500/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none" />

      {/* Colored Gradient Border Wrapper */}
      <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-primary via-purple-500 to-accent group-hover:-translate-y-2 transition-all duration-500">

        {/* Glassmorphic Card Container */}
        <div className="relative overflow-hidden bg-slate-900/95 md:backdrop-blur-xl backdrop-blur-none rounded-2xl hover:shadow-elegant transition-all duration-500">
          {/* Interactive Glassmorphic Shine Effect */}
          <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

          <div className="p-8">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              {/* Company Logo with Gradient Border */}
              <div className="relative shrink-0 w-20 h-20 rounded-full p-[2px] bg-gradient-to-br from-primary via-purple-500 to-accent shadow-lg group-hover:shadow-primary/40 transition-all duration-500">
                {/* Inner Halo Glow */}
                <div className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-md pointer-events-none bg-gradient-to-br from-primary via-purple-500 to-accent" />
                <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-900 flex items-center justify-center">
                  {item.logo && !logoError ? (
                    <img
                      src={item.logo}
                      alt={`${item.company} logo`}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      onError={() => setLogoError(true)}
                    />
                  ) : (
                    <Building className="w-9 h-9 text-primary" />
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-foreground group-hover:text-accent hover:scale-[1.01] origin-left transition-all duration-300">
                  {item.position}
                </h3>
                <p className="text-lg font-semibold text-primary mb-3">
                  {item.company}
                </p>

                {(item.period || item.location) && (
                  <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                    {item.period && (
                      <div className="flex items-center gap-1.5 hover:text-foreground transition-colors duration-300">
                        <Calendar className="w-4 h-4 text-primary/70" />
                        <span className="text-sm">{item.period}</span>
                      </div>
                    )}
                    {item.location && (
                      <div className="flex items-center gap-1.5 hover:text-foreground transition-colors duration-300">
                        <MapPin className="w-4 h-4 text-primary/70" />
                        <span className="text-sm">{item.location}</span>
                      </div>
                    )}
                  </div>
                )}

                <p className="text-muted-foreground mb-5 leading-relaxed hover:text-foreground transition-colors duration-300">
                  {item.description}
                </p>

                {/* Technologies */}
                <div className="mb-5">
                  <h4 className="font-semibold mb-2 text-foreground/80 text-sm uppercase tracking-wider">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="text-xs border-primary/30 text-primary bg-primary/10 hover:bg-primary/20 hover:scale-105 transition-all duration-300"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="mb-5">
                  <h4 className="font-semibold mb-2 text-foreground/80 text-sm uppercase tracking-wider">Key Achievements</h4>
                  <ul className="space-y-2">
                    {item.achievements.map((achievement, idx) => (
                      <li
                        key={idx}
                        className="text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-start gap-2"
                      >
                        <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Certificates */}
                {item.certificates && item.certificates.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3 text-foreground/80 text-sm uppercase tracking-wider">Certificates</h4>
                    <div className="flex flex-row gap-4 flex-wrap">
                      {item.certificates.map((cert, idx) => (
                        <a
                          key={idx}
                          href={cert.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/cert relative block rounded-xl overflow-hidden hover:scale-[1.03] transition-all duration-500"
                          title={cert.title}
                        >
                          {/* Instantly loaded thumbnail image */}
                          <div className="relative w-44 h-28 md:w-52 md:h-32 overflow-hidden bg-slate-950/80 rounded-xl border border-primary/20 hover:border-primary/50 transition-all duration-300 shadow-lg group-hover/cert:shadow-primary/20 flex items-center justify-center">
                            <img
                              src={cert.image}
                              alt={cert.title}
                              className="w-full h-full object-cover select-none"
                              loading="lazy"
                            />
                          </div>
                          {/* Premium Hover Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-0 group-hover/cert:opacity-100 transition-all duration-300 flex flex-col items-center justify-end p-3 text-center">
                            <span className="text-white text-xs font-semibold mb-1 drop-shadow-md line-clamp-1">{cert.title}</span>
                            <span className="text-primary text-[10px] font-bold flex items-center gap-1">
                              <span>Open PDF</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}</div>
            </div>
          </div>
        </div>{/* End Glassmorphic Card */}
      </div>{/* End Gradient Border Wrapper */}
    </div>
  );
};

const WorkExperience = () => {
  const { ref: experienceRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '-50px'
  });

  const experience: ExperienceItem[] = [
    {
      position: "Freelance Full Stack Developer",
      company: "Freelance",
      period: "2025 – Present",
      location: "Remote",
      description: "Developing custom web applications and websites for clients, focusing on responsive design, backend integration, and scalable solutions.",
      technologies: ["TypeScript", "Tailwind CSS", "Supabase", "Bootstrap", "JavaScript", "CSS3", "HTML5", "Git", "GitHub", "Canva"],
      achievements: [
        "Developed custom websites for clients based on business requirements",
        "Designed and delivered marketing materials and brochures",
        "Communicated directly with clients to gather requirements and implement feedback",
        "Delivered projects within agreed timelines"
      ],
      logo: "/freelance-logo.png"
    },
    {
      position: "Fullstack .NET Web Development Trainee",
      company: "Digital Egypt Pioneers Initiative (DEPI)",
      period: "Jun 2025 – Dec 2025",
      location: "Cairo, Egypt",
      description: "Participating in the development of full-stack web applications using .NET Core, and Bootstrap. Learning and applying software development best practices through real-world projects and team collaboration.",
      technologies: ["ASP.NET Web API", "ASP.NET MVC", "Entity Framework", "C#", "SQL", "SQL Server", "HTML5", "CSS3", "JavaScript", "Bootstrap"],
      achievements: [
        "Contributed to building and improving features in training projects",
        "Worked within an Agile team to deliver functional modules",
        "Optimized database queries to improve application performance"
      ],
      certificates: [
        {
          title: "Fullstack .NET Web Development Certificate",
          image: "/DEPI Certificates/Omar Nour Eldin Awais.png",
          pdf: "/DEPI Certificates/Omar Nour Eldin Awais.pdf"
        },
        {
          title: "Business English Certificate",
          image: "/DEPI Certificates/Certificate Business English DEPI R3 OMAR NOUR ELDIN AWAIS ABDEL TAWAB - 2026-04-06T12_05_14.4862749Z.png",
          pdf: "/DEPI Certificates/Certificate Business English DEPI R3 OMAR NOUR ELDIN AWAIS ABDEL TAWAB - 2026-04-06T12_05_14.4862749Z.pdf"
        }
      ],
      logo: "/depi-logo.png"
    },
    {
      position: "Core Java Programming (OOP)",
      company: "MaharaTech – ITIMooca",
      description: "Completed a Core Java programming course focused on Object-Oriented Programming (OOP) principles and fundamental software development concepts.",
      technologies: ["Java", "OOP Principles", "Classes & Objects", "Inheritance", "Polymorphism", "Encapsulation", "Abstraction", "Exception Handling"],
      achievements: [
        "Built small Java programs applying OOP principles",
        "Improved understanding of clean code structure and modular design"
      ],
      certificates: [
        {
          title: "Core Java Programming Certificate",
          image: "/MaharaTech Certificate/Course_Certificate_En.png",
          pdf: "/MaharaTech Certificate/Course_Certificate_En.pdf"
        }
      ],
      logo: "/maharatech-logo.png"
    }
  ];

  return (
    <section ref={experienceRef} className="py-20 px-6 bg-gradient-secondary relative overflow-hidden">
      {/* Decorative background gradients */}
      <div className="hidden md:block absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden md:block absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-16 transform-gpu will-change-transform transition-all duration-700 ease-out ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 hover:scale-105 transition-transform duration-300">Internships & Work Experience</h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full hover:w-24 transition-all duration-300" />
          <p className="text-xl text-muted-foreground mt-6 max-w-2xl mx-auto hover:text-foreground transition-colors duration-300">
            My professional journey and career milestones
          </p>
        </div>

        <div className={`space-y-8 transform-gpu will-change-transform transition-all duration-700 ease-out ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {experience.map((item, index) => (
            <ExperienceCard key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
