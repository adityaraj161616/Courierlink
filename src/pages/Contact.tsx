
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import SplitTextReveal from '@/components/animations/SplitTextReveal';
import VideoMaskReveal from '@/components/animations/VideoMaskReveal';
import MagneticText from '@/components/animations/MagneticText';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Form animation
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 70%',
          }
        }
      );
    }

    // Contact info animation
    if (contactInfoRef.current) {
      gsap.fromTo(
        contactInfoRef.current.children,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contactInfoRef.current,
            start: 'top 70%',
          }
        }
      );
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const contactData = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    try {
      // Call the contact form edge function
      const { error } = await supabase.functions.invoke('contact-form', {
        body: contactData
      });

      if (error) throw error;

      toast({
        title: "Form Submitted Successfully! ✅",
        description: "Thank you for contacting us. We'll get back to you within 24 hours via email.",
        duration: 6000,
      });

      // Reset form
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your form. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-16 overflow-hidden">
      {/* Hero Section with Video Mask */}
      <VideoMaskReveal imageSrc="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=2000&q=80">
        <section className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-primary-800/80 to-primary-700/70"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <MagneticText>
              <SplitTextReveal
                text="Get in Touch"
                className="text-5xl md:text-7xl font-bold text-white mb-8"
                delay={0.5}
              />
            </MagneticText>
            <div className="max-w-4xl mx-auto">
              <SplitTextReveal
                text="Have questions? We're here to help. Contact us today and let's discuss your delivery needs across India."
                className="text-xl md:text-2xl text-white/90 leading-relaxed"
                delay={1}
              />
            </div>
          </div>
        </section>
      </VideoMaskReveal>
      
      {/* Contact Form and Info */}
      <section className="py-32 relative bg-gradient-to-br from-gray-50 to-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=2000&q=80')] opacity-5 bg-fixed bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div ref={formRef}>
              <Card className="shadow-2xl bg-white/80 backdrop-blur-sm border-0">
                <CardContent className="p-10">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Send us a message</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"></div>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="relative group">
                        <Input 
                          name="firstName"
                          placeholder="First Name" 
                          className="h-14 text-lg border-2 border-gray-200 focus:border-primary-500 transition-colors duration-300 group-hover:border-gray-300" 
                          required
                        />
                      </div>
                      <div className="relative group">
                        <Input 
                          name="lastName"
                          placeholder="Last Name" 
                          className="h-14 text-lg border-2 border-gray-200 focus:border-primary-500 transition-colors duration-300 group-hover:border-gray-300" 
                          required
                        />
                      </div>
                    </div>
                    
                    <Input 
                      name="email"
                      placeholder="Email Address" 
                      type="email" 
                      className="h-14 text-lg border-2 border-gray-200 focus:border-primary-500 transition-colors duration-300 hover:border-gray-300" 
                      required
                    />
                    <Input 
                      name="phone"
                      placeholder="Phone Number (+91)" 
                      type="tel" 
                      className="h-14 text-lg border-2 border-gray-200 focus:border-primary-500 transition-colors duration-300 hover:border-gray-300" 
                      required
                    />
                    <Input 
                      name="subject"
                      placeholder="Subject" 
                      className="h-14 text-lg border-2 border-gray-200 focus:border-primary-500 transition-colors duration-300 hover:border-gray-300" 
                      required
                    />
                    <Textarea 
                      name="message"
                      placeholder="Your Message" 
                      rows={6} 
                      className="text-lg border-2 border-gray-200 focus:border-primary-500 transition-colors duration-300 hover:border-gray-300 resize-none" 
                      required
                    />
                    
                    <AnimatedButton 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary-600 hover:bg-primary-700 text-lg py-4 shadow-lg"
                      glowEffect={true}
                    >
                      <Send className="mr-3 h-5 w-5" />
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </AnimatedButton>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-10">
              <div>
                <MagneticText>
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>
                </MagneticText>
                <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full mb-10"></div>
              </div>
              
              <div ref={contactInfoRef} className="space-y-8">
                <Card className="hover:shadow-xl transition-all duration-300 group bg-white/60 backdrop-blur-sm border-0">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                        <MapPin className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-xl mb-2">Address</h3>
                        <p className="text-gray-600 text-lg leading-relaxed">
                          123 Business Hub Road<br />
                          Connaught Place, New Delhi 110001<br />
                          India
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-xl transition-all duration-300 group bg-white/60 backdrop-blur-sm border-0">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                        <Phone className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-xl mb-2">Phone</h3>
                        <p className="text-gray-600 text-lg">+91 9876543210</p>
                        <p className="text-gray-600 text-lg">+91 1123456789</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-xl transition-all duration-300 group bg-white/60 backdrop-blur-sm border-0">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                        <Mail className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-xl mb-2">Email</h3>
                        <p className="text-gray-600 text-lg">info@courierlink.in</p>
                        <p className="text-gray-600 text-lg">support@courierlink.in</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-xl transition-all duration-300 group bg-white/60 backdrop-blur-sm border-0">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                        <Clock className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-xl mb-2">Business Hours</h3>
                        <p className="text-gray-600 text-lg leading-relaxed">
                          Mon - Fri: 9:00 AM - 7:00 PM<br />
                          Sat: 10:00 AM - 5:00 PM<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=2000&q=80')] opacity-10 bg-fixed bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <MagneticText>
            <SplitTextReveal
              text="Find Us"
              className="text-4xl md:text-6xl font-bold mb-12"
            />
          </MagneticText>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-96 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                <div className="text-center z-10">
                  <div className="bg-primary-600 p-6 rounded-full mb-6 mx-auto w-fit">
                    <MapPin className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Interactive Map</h3>
                  <p className="text-gray-600 mb-2">Our location in the heart of New Delhi</p>
                  <div className="inline-flex items-center bg-primary-100 text-primary-700 px-4 py-2 rounded-full font-medium">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mr-2 animate-pulse"></div>
                    We're Here!
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Contact;
