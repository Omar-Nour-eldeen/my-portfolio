import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useToast } from "@/components/ui/use-toast";
import { FormEvent, useState } from "react";
import { Toaster } from "@/components/ui/toaster";

const Contact = () => {
  const { ref: contactRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '-50px'
  });


  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xgvlgwqo", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (res.ok) {
        toast({
          title: "Sent Successfully ✅",
          description: "Thanks for reaching out, I will reply to you.",
          className: "fixed top-5 right-5 max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-sm bg-green-600 text-white border-none shadow-lg rounded-lg text-center justify-center"
        });
        form.reset();
      } else {
        toast({
          title: "Failed to send ❌",
          description: "Please check the data you entered and try again.",
          className: "fixed top-5 right-5 max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-sm bg-red-600 text-white border-none shadow-lg rounded-lg text-center justify-center"
        });
      }
    } catch (error) {
      toast({
        title: "Error ⚠️",
        description: "An unexpected error occurred! please try again.",
        className: "fixed top-5 right-5 max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-sm bg-yellow-500 text-black border-none shadow-lg rounded-lg text-center justify-center"
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <section ref={contactRef} className="py-20 px-6 bg-gradient-secondary">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transform-gpu will-change-transform transition-all duration-700 ease-out ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 hover:scale-105 transition-transform duration-300">Contact Me</h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full hover:w-24 transition-all duration-300" />
          <p className="text-xl text-muted-foreground mt-6 max-w-2xl mx-auto hover:text-foreground transition-colors duration-300">
            <span className="bg-gradient-primary bg-clip-text text-transparent"><b>"Have a project in mind? Let's bring it to life — contact me today."</b></span>
          </p>
        </div>

        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center transform-gpu will-change-transform transition-all duration-700 ease-out ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div>

            <div className="space-y-4">
              <a href="mailto:mr4110140@gmail.com" className="flex items-center gap-5 p-4 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-primary/50 hover:bg-slate-900/60 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all duration-300 group">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-white/90 group-hover:text-primary transition-colors duration-300">Email</h4>
                  <p className="text-muted-foreground group-hover:text-white transition-colors duration-300">mr4110140@gmail.com</p>
                </div>
              </a>

              <a href="tel:01123311041" className="flex items-center gap-5 p-4 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-accent/50 hover:bg-slate-900/60 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)] transition-all duration-300 group">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-white/90 group-hover:text-accent transition-colors duration-300">Phone</h4>
                  <p className="text-muted-foreground group-hover:text-white transition-colors duration-300">01123311041</p>
                </div>
              </a>

              <div className="flex items-center gap-5 p-4 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-emerald-500/50 hover:bg-slate-900/60 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300 group cursor-default">
                <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:scale-110 transition-all duration-300">
                  <MapPin className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-white/90 group-hover:text-emerald-500 transition-colors duration-300">Location</h4>
                  <p className="text-muted-foreground group-hover:text-white transition-colors duration-300">Egypt, Cairo</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group perspective-1000">
            {/* Ambient Glow behind the form */}
            <div className="absolute -inset-2 rounded-[2rem] bg-gradient-primary blur-2xl opacity-25 group-hover:opacity-50 transition duration-700 pointer-events-none" />

            {/* Gradient colored border wrapper */}
            <div className="relative rounded-3xl p-[2px] bg-gradient-to-br from-primary via-purple-500 to-accent">
              <Card className="relative bg-slate-900/90 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
                <CardContent className="p-6 md:p-8">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-white/90">First Name</label>
                        <Input 
                          name="firstName" 
                          placeholder="John" 
                          className="h-10 bg-slate-950/50 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-all duration-300 rounded-xl" 
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-white/90">Last Name</label>
                        <Input 
                          name="lastName" 
                          placeholder="Doe" 
                          className="h-10 bg-slate-950/50 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-all duration-300 rounded-xl" 
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-white/90">Email</label>
                      <Input 
                        name="email" 
                        type="email" 
                        placeholder="john@example.com" 
                        className="h-10 bg-slate-950/50 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-all duration-300 rounded-xl" 
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-white/90">Subject</label>
                      <Input 
                        name="subject" 
                        placeholder="Project Collaboration" 
                        className="h-10 bg-slate-950/50 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-all duration-300 rounded-xl" 
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-white/90">Message</label>
                      <Textarea
                        name="message"
                        placeholder="Tell me about your project..."
                        className="min-h-[100px] p-3 bg-slate-950/50 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-all duration-300 resize-none rounded-xl"
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={loading} 
                      className="w-full h-11 text-base font-bold bg-gradient-primary text-white border-0 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 rounded-xl mt-2"
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;