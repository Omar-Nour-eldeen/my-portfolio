import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import WorkExperience from "@/components/WorkExperience";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import ThankYou from "@/components/ThankYou";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="about" className="scroll-mt-20 md:scroll-mt-24">
          <About />
        </section>
        <section id="skills" className="scroll-mt-20 md:scroll-mt-24">
          <Skills />
        </section>
        <section id="education" className="scroll-mt-20 md:scroll-mt-24">
          <Education />
        </section>
        <section id="experience" className="scroll-mt-20 md:scroll-mt-24">
          <WorkExperience />
        </section>
        <section id="services" className="scroll-mt-20 md:scroll-mt-24">
          <Services />
        </section>
        <section id="projects" className="scroll-mt-20 md:scroll-mt-24">
          <Projects />
        </section>
        <section id="achievements" className="scroll-mt-20 md:scroll-mt-24">
          <Achievements />
        </section>
        <section id="testimonials" className="scroll-mt-20 md:scroll-mt-24">
          <Testimonials />
        </section>
        <section id="contact" className="scroll-mt-20 md:scroll-mt-24">
          <Contact />
        </section>
        <section id="thankyou" className="scroll-mt-20 md:scroll-mt-24">
          <ThankYou />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;