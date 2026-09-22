import { useState } from "react";
import { GraduationCap, Calendar, MapPin } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  description: string;
  gpa: string;
  logo?: string;
}

const EducationCard = ({ item }: { item: EducationItem }) => {
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
              {/* Institution Logo with Colored Gradient Border */}
              <div className="relative shrink-0 w-20 h-20 rounded-full p-[2px] bg-gradient-to-br from-primary via-purple-500 to-accent shadow-lg group-hover:shadow-primary/40 transition-all duration-500">
                {/* Inner Halo Background Glow */}
                <div className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-md pointer-events-none bg-gradient-to-br from-primary via-purple-500 to-accent" />
                <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-900">
                  {item.logo && !logoError ? (
                    <img
                      src={item.logo}
                      alt={`${item.institution} logo`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={() => setLogoError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <GraduationCap className="w-10 h-10 text-primary" />
                    </div>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-foreground group-hover:text-accent hover:scale-[1.01] origin-left transition-all duration-300">
                  {item.degree}
                </h3>
                <p className="text-lg font-semibold text-primary mb-3">
                  {item.institution}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                  <div className="flex items-center gap-1.5 hover:text-foreground transition-colors duration-300">
                    <Calendar className="w-4 h-4 text-primary/70" />
                    <span className="text-sm">{item.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5 hover:text-foreground transition-colors duration-300">
                    <MapPin className="w-4 h-4 text-primary/70" />
                    <span className="text-sm">{item.location}</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-5 leading-relaxed hover:text-foreground transition-colors duration-300">
                  {item.description}
                </p>

                <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold border border-primary/20 hover:bg-primary/20 transition-all duration-300 shadow-sm">
                  <GraduationCap className="w-4 h-4" />
                  GPA: {item.gpa}
                </span>
              </div>
            </div>
          </div>
        </div>{/* End Glassmorphic Card */}
      </div>{/* End Gradient Border Wrapper */}
    </div>
  );
};

const Education = () => {
  const { ref: educationRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '-50px'
  });

  const education: EducationItem[] = [
    {
      degree: "Bachelor’s Degree in Computer Science",
      institution: "Capital University",
      period: "2023 – Expected 2027",
      location: "Egypt, Cairo",
      description: "Specialized in Computer Science with a focus on web development and database systems.",
      gpa: "3.03/4.0 (Very Good)",
      logo: "/capital-university.jpg"
    }
  ];

  return (
    <section ref={educationRef} className="py-20 px-6 bg-gradient-secondary relative overflow-hidden">
      {/* Decorative background gradients for rich premium depth */}
      <div className="hidden md:block absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden md:block absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-16 transform-gpu will-change-transform transition-all duration-700 ease-out ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 hover:scale-105 transition-transform duration-300">Education</h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full hover:w-24 transition-all duration-300" />
          <p className="text-xl text-muted-foreground mt-6 max-w-2xl mx-auto hover:text-foreground transition-colors duration-300">
            My academic journey and continuous learning path
          </p>
        </div>

        <div className={`${education.length === 1
            ? 'max-w-3xl mx-auto'
            : 'grid md:grid-cols-2 gap-8'
          } transform-gpu will-change-transform transition-all duration-700 ease-out ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {education.map((item, index) => (
            <EducationCard key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;