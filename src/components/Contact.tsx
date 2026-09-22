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
              <a href="https://wa.me/201123311041" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 p-4 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-emerald-500/50 hover:bg-slate-900/60 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300 group">
                <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:scale-110 transition-all duration-300">
                  <svg className="w-6 h-6 fill-emerald-500" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-white/90 group-hover:text-emerald-500 transition-colors duration-300">WhatsApp</h4>
                  <p className="text-muted-foreground group-hover:text-white transition-colors duration-300">+20 112 331 1041</p>
                </div>
              </a>

              <a href="mailto:mr4110140@gmail.com" className="flex items-center gap-5 p-4 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-primary/50 hover:bg-slate-900/60 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all duration-300 group">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-white/90 group-hover:text-primary transition-colors duration-300">Email</h4>
                  <p className="text-muted-foreground group-hover:text-white transition-colors duration-300">mr4110140@gmail.com</p>
                </div>
              </a>

              <div className="flex items-center gap-5 p-4 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-sky-500/50 hover:bg-slate-900/60 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] transition-all duration-300 group cursor-default">
                <div className="w-14 h-14 rounded-xl bg-sky-500/10 flex items-center justify-center group-hover:bg-sky-500/20 group-hover:scale-110 transition-all duration-300">
                  <MapPin className="w-6 h-6 text-sky-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-white/90 group-hover:text-sky-500 transition-colors duration-300">Location</h4>
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