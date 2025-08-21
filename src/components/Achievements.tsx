import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Award, Star, Target, TrendingUp, Users, FolderCode, Cpu } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const Achievements = () => {
  const { ref: achievementsRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '-50px'
  });
  
  const achievements = [
    {
      title: "5+ Projects Completed",
      description: "Successfully delivered over 5 web applications",
      icon: FolderCode,
      value: "5+",
      category: "Projects"
    },
    {
      title: "5+ Team Collaborations",
      description: "Worked effectively within Agile teams to deliver project milestones",
      icon: Users,
      value: "5+",
      category: "Team Collaborations"
    },
    {
      title: "4+ Core Technologies Learned",
      description: "Applied knowledge in C#, .NET Core, JavaScript, and SQL in project development",
      icon: Cpu,
      value: "4+",
      category: "Technologies"
    }
  ];

  return (
    <section ref={achievementsRef} className="py-20 px-6 bg-gradient-secondary">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ease-out ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 hover:scale-105 transition-transform duration-300">Achievements</h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full hover:w-24 transition-all duration-300" />
          <p className="text-xl text-muted-foreground mt-6 max-w-2xl mx-auto hover:text-foreground transition-colors duration-300">
            Milestones and accomplishments that define my journey
          </p>
        </div>
        
        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ease-out delay-200 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {achievements.map((achievement, index) => (
            <Card 
              key={index}
              className="group overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 bg-gray-800"
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-6 hover:bg-primary/30 transition-colors duration-300">
                  <achievement.icon className="w-8 h-8 text-primary" />
                </div>
                
                <div className="mb-4">
                  <div className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                    {achievement.value}
                  </div>
                  <div className="text-sm text-accent font-medium mb-2">
                    {achievement.category}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-3 group-hover:text-primary hover:scale-105 transition-all duration-300">
                  {achievement.title}
                </h3>
                
                <p className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                  {achievement.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
