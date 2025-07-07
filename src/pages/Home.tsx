
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import VideoMaskReveal from '@/components/animations/VideoMaskReveal';
import SplitTextReveal from '@/components/animations/SplitTextReveal';
import MagneticText from '@/components/animations/MagneticText';
import TypewriterGlitch from '@/components/animations/TypewriterGlitch';
import { Package, Clock, MapPin, Users, Star, Truck, Zap, Globe, Shield } from 'lucide-react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smooth scroll-triggered animations
    const sections = document.querySelectorAll('.animate-on-scroll');
    sections.forEach((section) => {
      gsap.fromTo(section, 
        { 
          opacity: 0, 
          y: 60,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Services section 3D cards
    if (servicesRef.current) {
      const serviceCards = servicesRef.current.querySelectorAll('.service-card');
      
      serviceCards.forEach((card, index) => {
        gsap.fromTo(card, 
          { 
            y: 80,
            rotationY: 15,
            opacity: 0
          },
          {
            y: 0,
            rotationY: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            delay: index * 0.2,
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }

    // Features morphing animation
    if (featuresRef.current) {
      const featureItems = featuresRef.current.querySelectorAll('.feature-item');
      
      featureItems.forEach((item, index) => {
        gsap.fromTo(item,
          {
            rotationX: -30,
            opacity: 0,
            scale: 0.9
          },
          {
            rotationX: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.2)',
            delay: index * 0.1,
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }

    // Testimonials staggered reveal
    if (testimonialsRef.current) {
      const testimonialCards = testimonialsRef.current.querySelectorAll('.testimonial-card');
      
      testimonialCards.forEach((card, index) => {
        gsap.fromTo(card,
          {
            y: 60,
            opacity: 0,
            scale: 0.95
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            delay: index * 0.15,
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }

    // Stats counter animation
    if (statsRef.current) {
      const statNumbers = statsRef.current.querySelectorAll('.stat-number');
      statNumbers.forEach((stat) => {
        const target = stat.getAttribute('data-target');
        if (target) {
          gsap.fromTo(stat, 
            { textContent: '0' },
            {
              textContent: target,
              duration: 2,
              ease: 'power2.out',
              snap: { textContent: 1 },
              scrollTrigger: {
                trigger: stat,
                start: 'top 80%'
              }
            }
          );
        }
      });
    }

    // Floating elements
    gsap.to('.floating-element', {
      y: -15,
      duration: 3,
      ease: 'power2.inOut',
      repeat: -1,
      yoyo: true,
      stagger: 0.5
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const services = [
    {
      icon: Package,
      title: 'Local Courier',
      description: 'Fast same-day delivery within Indian cities',
      color: 'bg-primary-500',
      bgImage: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81'
    },
    {
      icon: Truck,
      title: 'Domestic Shipping',
      description: 'Reliable delivery across India',
      color: 'bg-courier-orange',
      bgImage: 'https://images.unsplash.com/photo-1487887235947-a955ef187fcc'
    },
    {
      icon: Globe,
      title: 'International',
      description: 'Worldwide shipping solutions from India',
      color: 'bg-purple-500',
      bgImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5'
    }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Same-Day Delivery',
      description: 'Express delivery within hours across major Indian cities'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock customer service in Hindi & English'
    },
    {
      icon: Shield,
      title: 'Secure & Insured',
      description: 'Your packages are fully protected and insured'
    },
    {
      icon: MapPin,
      title: 'Real-Time Tracking',
      description: 'Track your packages across India in real-time'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Business Owner',
      content: 'CourierLink has transformed our e-commerce delivery operations. Reliable service across India!',
      rating: 5,
      bgImage: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21'
    },
    {
      name: 'Rajesh Kumar',
      role: 'E-commerce Manager',
      content: 'Excellent service and competitive pricing. Best courier service in India!',
      rating: 5,
      bgImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05'
    },
    {
      name: 'Anita Patel',
      role: 'Operations Director',
      content: 'Professional team and always on time. Great experience with CourierLink!',
      rating: 5,
      bgImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'
    }
  ];

  return (
    <div className="pt-16 overflow-hidden">
      {/* Hero Section */}
      <VideoMaskReveal imageSrc="https://images.unsplash.com/photo-1487887235947-a955ef187fcc">
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center">
          <div 
            className="absolute inset-0 z-0"
            style={{
              background: `linear-gradient(rgba(20, 184, 166, 0.85), rgba(15, 118, 110, 0.9)), url('https://images.unsplash.com/photo-1487887235947-a955ef187fcc')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed'
            }}
          />
          
          {/* Floating elements */}
          <div className="floating-element absolute top-20 left-10 w-4 h-4 bg-white/30 rounded-full"></div>
          <div className="floating-element absolute top-40 right-20 w-6 h-6 bg-white/20 rounded-full"></div>
          <div className="floating-element absolute bottom-40 left-20 w-3 h-3 bg-white/25 rounded-full"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <MagneticText className="mb-6">
                  <TypewriterGlitch 
                    text="Fast & Reliable"
                    className="text-4xl md:text-6xl font-bold text-white block leading-tight"
                  />
                </MagneticText>
                
                <SplitTextReveal
                  text="Courier Services"
                  className="text-4xl md:text-6xl font-bold text-primary-100 mb-6 leading-tight"
                  delay={2}
                />
                
                <div className="animate-on-scroll">
                  <p className="text-xl text-white/90 mb-8 leading-relaxed">
                    Professional delivery solutions across India for all your shipping needs. 
                    From local courier to international logistics, we've got you covered.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Link to="/book-pickup">
                      <AnimatedButton size="lg" className="bg-white text-primary-600 hover:bg-white/90 text-lg px-8 py-4">
                        Book Pickup Now
                      </AnimatedButton>
                    </Link>
                    <Link to="/track">
                      <AnimatedButton variant="outline" size="lg" className="text-lg px-8 py-4 border-white text-black hover:bg-white hover:text-primary-600">
                        Track Package
                      </AnimatedButton>
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="animate-on-scroll">
                <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-white/20">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-semibold mb-6 text-center text-gray-900">Track Your Package</h3>
                    <div className="space-y-4">
                      <Input 
                        placeholder="Enter tracking number..." 
                        className="text-center text-lg py-4 border-gray-200 focus:border-primary-500"
                      />
                      <AnimatedButton className="w-full bg-primary-600 hover:bg-primary-700 text-lg py-4">
                        Track Now
                      </AnimatedButton>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </VideoMaskReveal>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-700 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '50000', label: 'Packages Delivered', suffix: '+' },
              { number: '1000', label: 'Happy Customers', suffix: '+' },
              { number: '24', label: 'Support Available', suffix: '/7' },
              { number: '99', label: 'On-Time Delivery', suffix: '%' }
            ].map((stat, index) => (
              <div key={index} className="animate-on-scroll">
                <div className="text-4xl md:text-5xl font-bold mb-3 text-white">
                  <span className="stat-number" data-target={stat.number}>0</span>
                  {stat.suffix}
                </div>
                <div className="text-primary-100 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-24 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="mb-4">
              <span className="text-primary-600 text-sm font-semibold tracking-widest uppercase">Our Services</span>
            </div>
            <SplitTextReveal
              text="Professional Delivery Solutions"
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive courier services across India with cutting-edge technology and unmatched reliability
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="service-card group">
                <Card className="relative bg-white hover:shadow-2xl transition-all duration-500 group-hover:scale-105 h-full overflow-hidden">
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{
                      background: `url('${service.bgImage}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                  <CardContent className="p-8 text-center relative z-10">
                    <MagneticText>
                      <div className={`${service.color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <service.icon className="h-10 w-10 text-white" />
                      </div>
                    </MagneticText>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="mb-4">
              <span className="text-primary-600 text-sm font-semibold tracking-widest uppercase">Why Choose Us</span>
            </div>
            <SplitTextReveal
              text="Why Choose CourierLink™?"
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            />
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Experience the future of logistics in India with our innovative features designed to exceed your expectations
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="feature-item group">
                <MagneticText className="h-full">
                  <Card className="bg-white hover:shadow-xl transition-all duration-500 h-full group-hover:bg-primary-50/50 border-2 border-transparent hover:border-primary-200">
                    <CardContent className="p-8 text-center">
                      <div className="bg-gradient-to-br from-primary-500 to-primary-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-700 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </MagneticText>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-24 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="mb-4">
              <span className="text-primary-600 text-sm font-semibold tracking-widest uppercase">Testimonials</span>
            </div>
            <SplitTextReveal
              text="What Our Customers Say"
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover why thousands of customers across India trust us with their most important deliveries
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card group">
                <Card className="relative bg-white hover:shadow-xl transition-all duration-500 group-hover:scale-105 overflow-hidden h-full">
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                    style={{
                      background: `url('${testimonial.bgImage}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                  <CardContent className="p-8 relative z-10">
                    <div className="flex mb-6 justify-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <p className="text-gray-700 mb-8 italic text-lg leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg shadow-lg">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="font-bold text-gray-900 text-lg">
                        {testimonial.name}
                      </div>
                      <div className="text-gray-600">
                        {testimonial.role}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-700 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-on-scroll relative z-10">
          <SplitTextReveal
            text="Ready to Ship with CourierLink™?"
            className="text-3xl md:text-4xl font-bold mb-6 text-white"
          />
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers across India who trust us with their delivery needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book-pickup">
              <AnimatedButton size="lg" className="bg-white text-primary-600 hover:bg-white/90 text-lg px-8 py-4">
                Book Your Pickup
              </AnimatedButton>
            </Link>
            <Link to="/contact">
              <AnimatedButton size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-black hover:bg-white hover:text-primary-600">
                Get Quote
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
