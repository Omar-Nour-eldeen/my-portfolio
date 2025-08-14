import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  return (
    <section className="py-20 px-6 bg-gradient-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 hover:scale-105 transition-transform duration-300">Contact Me</h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full hover:w-24 transition-all duration-300" />
          <p className="text-xl text-muted-foreground mt-6 max-w-2xl mx-auto hover:text-foreground transition-colors duration-300">
            <span className="bg-gradient-primary bg-clip-text text-transparent"><b>"Have a project in mind? Let's bring it to life — contact me today."</b></span>
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-8 hover:scale-105 transition-transform duration-300">Let's Work Together</h3>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center hover:bg-primary/30 transition-colors duration-300">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                                  <div>
                    <h4 className="font-semibold hover:scale-105 transition-transform duration-300">Email</h4>
                    <p className="text-muted-foreground hover:text-foreground transition-colors duration-300">mr4110140@gmail.com</p>
                  </div>
              </div>
              
              <div className="flex items-center gap-4 hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center hover:bg-accent/30 transition-colors duration-300">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                                  <div>
                    <h4 className="font-semibold hover:scale-105 transition-transform duration-300">Phone</h4>
                    <p className="text-muted-foreground hover:text-foreground transition-colors duration-300">01123311041</p>
                  </div>
              </div>
              
              <div className="flex items-center gap-4 hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center hover:bg-primary/30 transition-colors duration-300">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                                  <div>
                    <h4 className="font-semibold hover:scale-105 transition-transform duration-300">Location</h4>
                    <p className="text-muted-foreground hover:text-foreground transition-colors duration-300">Egypt,Cairo</p>
                  </div>
              </div>
            </div>
          </div>
          
          <Card className="bg-gray-800 border-border/50">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">First Name</label>
                    <Input placeholder="John" className="bg-gray-900" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Last Name</label>
                    <Input placeholder="Doe" className="bg-gray-900" />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input type="email" placeholder="john@example.com" className="bg-gray-900" />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Subject</label>
                  <Input placeholder="Project Collaboration" className="bg-gray-900" />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Message</label>
                  <Textarea 
                    placeholder="Tell me about your project..." 
                    className="min-h-[120px] bg-gray-900"
                  />
                </div>
                
                <Button className="w-full bg-gradient-primary hover:shadow-glow hover:scale-105 transition-all duration-300">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;