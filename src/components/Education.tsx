import { GraduationCap, Calendar, MapPin } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const Education = () => {
  const { ref: educationRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '-50px'
  });
  
  const education = [
    {
      degree: "Bachelor’s Degree in Computer Science",
      institution: "Helwan University",
      period: "2023 – Expected 2027",
      location: "Egypt, Cairo",
      description: "Specialized in Computer science with focus on web development and database systems.",
      gpa: "3.17/4.0",
      logo: "../public/helwan-university.png"
    },
    {
      degree: "Fullstack .NET Web Development Certification (In Progress)",
      institution: "Digital Egypt Pioneers Initiative - DEPI",
      period: "2025",
      location: "Egypt, Cairo",
      description: "Complete Web Development training covering modern technologies and best practices.",
      gpa: "Not yet",
      logo: "../public/depi-logo.png"
    }
  ];

  return (
    <section ref={educationRef} className="py-20 px-6 bg-gradient-secondary">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ease-out ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 hover:scale-105 transition-transform duration-300">Education</h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full hover:w-24 transition-all duration-300" />
          <p className="text-xl text-muted-foreground mt-6 max-w-2xl mx-auto hover:text-foreground transition-colors duration-300">
            My academic journey and continuous learning path
          </p>
        </div>

        <div className={`grid md:grid-cols-2 gap-8 transition-all duration-700 ease-out delay-200 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {education.map((item, index) => (
            <div
              key={index}
              className="group overflow-hidden bg-gray-800 rounded-lg hover:shadow-elegant transition-all duration-300 hover:-translate-y-2"
            >
              <div className="p-8">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary/30 transition-colors duration-300 overflow-hidden">
                    {item.logo ? (
                      <img
                        src={item.logo}
                        alt={`${item.institution} logo`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          // Fallback to icon if logo fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <GraduationCap className="w-6 h-6 text-primary hidden" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-accent hover:scale-105 transition-all duration-300">
                      {item.degree}
                    </h3>
                    <p className="text-lg font-medium text-primary mb-3">
                      {item.institution}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{item.period}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{item.location}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4 hover:text-foreground transition-colors duration-300">
                      {item.description}
                    </p>

                    <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      GPA: {item.gpa}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
