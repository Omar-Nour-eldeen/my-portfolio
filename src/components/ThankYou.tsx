import { Button } from "@/components/ui/button";
import { Heart, ArrowUp, Mail, Github, Linkedin } from "lucide-react";

const ThankYou = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-20 px-6 bg-gradient-secondary">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 hover:bg-primary/30 transition-colors duration-300">
            <Heart className="w-10 h-10 text-primary" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 hover:scale-105 transition-transform duration-300">
            Thank You!
          </h2>
          
          <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full hover:w-24 transition-all duration-300 mb-8" />
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto hover:text-foreground transition-colors duration-300">
            Thank you for taking the time to explore my portfolio. I hope you've enjoyed learning about my work and experience.
          </p>
          
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto hover:text-foreground transition-colors duration-300">
            I'm always excited to work on new projects and collaborate with amazing people. Whether you have a project in mind or just want to connect, I'd love to hear from you!
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <a 
              href="mailto:mr4110140@gmail.com"
              className="block w-16 h-16 bg-accent/20 rounded-xl flex items-center justify-center mx-auto mb-4 hover:bg-accent/30 transition-colors duration-300 cursor-pointer"
            >
              <Mail className="w-8 h-8 text-accent" />
            </a>
            <h3 className="text-lg font-semibold mb-2 hover:scale-105 transition-transform duration-300">Contact Me</h3>
            <p className="text-muted-foreground hover:text-foreground transition-colors duration-300">
              Ready to start your next project? Let's discuss your ideas!
            </p>
          </div>
          
          <div className="text-center">
            <a 
              href="https://github.com/Omar-Nour-eldeen"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4 hover:bg-primary/30 transition-colors duration-300 cursor-pointer"
            >
              <Github className="w-8 h-8 text-primary" />
            </a>
            <h3 className="text-lg font-semibold mb-2 hover:scale-105 transition-transform duration-300">View My Code</h3>
            <p className="text-muted-foreground hover:text-foreground transition-colors duration-300">
              Check out my open source projects and contributions.
            </p>
          </div>
          
          <div className="text-center">
            <a 
              href="https://www.linkedin.com/in/omar-nour-eldeen/"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-16 h-16 bg-accent/20 rounded-xl flex items-center justify-center mx-auto mb-4 hover:bg-accent/30 transition-colors duration-300 cursor-pointer"
            >
              <Linkedin className="w-8 h-8 text-accent" />
            </a>
            <h3 className="text-lg font-semibold mb-2 hover:scale-105 transition-transform duration-300">Connect</h3>
            <p className="text-muted-foreground hover:text-foreground transition-colors duration-300">
              Let's connect and stay updated with my latest work.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-primary hover:shadow-glow hover:scale-105 transition-all duration-300"
          >
            Start a Project
          </Button>
          
          <Button 
            onClick={scrollToTop}
            variant="outline"
            className="hover:shadow-glow hover:scale-105 transition-all duration-300"
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
