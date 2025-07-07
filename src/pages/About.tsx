
import { Card, CardContent } from '@/components/ui/card';
import { Users, MapPin, Clock, Award, Truck, Globe, Shield, Zap, Package } from 'lucide-react';
import SplitTextReveal from '@/components/animations/SplitTextReveal';
import VideoMaskReveal from '@/components/animations/VideoMaskReveal';
import MagneticText from '@/components/animations/MagneticText';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Stats animation
    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current.children,
        { y: 50, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
          }
        }
      );
    }

    // Values animation
    if (valuesRef.current) {
      gsap.fromTo(
        valuesRef.current.children,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: valuesRef.current,
            start: 'top 70%',
          }
        }
      );
    }

    // Team animation
    if (teamRef.current) {
      gsap.fromTo(
        teamRef.current.children,
        { y: 30, opacity: 0, rotateY: 15 },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: teamRef.current,
            start: 'top 75%',
          }
        }
      );
    }
  }, []);

  const stats = [
    { icon: Package, number: '50,000+', label: 'Packages Delivered', color: 'text-blue-600' },
    { icon: Users, number: '1,000+', label: 'Happy Customers', color: 'text-green-600' },
    { icon: MapPin, number: '50+', label: 'Cities Covered', color: 'text-purple-600' },
    { icon: Clock, number: '5', label: 'Years Experience', color: 'text-orange-600' }
  ];

  const values = [
    {
      icon: Zap,
      title: 'Speed & Efficiency',
      description: 'We understand time is money. Our streamlined processes ensure your packages reach their destination as quickly as possible.'
    },
    {
      icon: Shield,
      title: 'Security & Trust',
      description: 'Every package is handled with care and tracked throughout the journey. Your trust is our most valuable asset.'
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Our customers are at the heart of everything we do. We go above and beyond to exceed expectations.'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'From local deliveries to international shipping, we connect businesses and people across the globe.'
    }
  ];

  const team = [
    {
      name: 'John Anderson',
      role: 'CEO & Founder',
      description: '15+ years in logistics industry'
    },
    {
      name: 'Sarah Mitchell',
      role: 'Operations Director',
      description: 'Expert in supply chain management'
    },
    {
      name: 'David Park',
      role: 'Technology Lead',
      description: 'Innovation in tracking systems'
    }
  ];

  return (
    <div className="pt-16 overflow-hidden">
      {/* Hero Section with Video Mask */}
      <VideoMaskReveal imageSrc="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=2000&q=80">
        <section className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-primary-800/80 to-primary-700/70"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <MagneticText>
                <SplitTextReveal
                  text="About CourierLink™"
                  className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
                  delay={0.5}
                />
              </MagneticText>
              <div className="max-w-4xl mx-auto">
                <SplitTextReveal
                  text="Founded with a mission to revolutionize the courier industry, we've grown from a local startup to a trusted nationwide logistics partner, delivering excellence in every package."
                  className="text-xl md:text-2xl text-white/90 leading-relaxed"
                  delay={1}
                />
              </div>
            </div>
          </div>
        </section>
      </VideoMaskReveal>

      {/* Floating Stats Section */}
      <section className="py-20 relative bg-gradient-to-br from-gray-50 to-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=2000&q=80')] opacity-5 bg-fixed bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-2xl transition-all duration-500 group bg-white/80 backdrop-blur-sm border-0 hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="bg-gradient-to-br from-primary-100 to-primary-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className={`h-10 w-10 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section with Split Layout */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-primary-50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <MagneticText>
                <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
                  Our Story
                </h2>
              </MagneticText>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p className="text-xl">
                  CourierLink™ was born from a simple observation: businesses and individuals needed 
                  a courier service they could truly rely on. In 2019, our founders recognized the gap 
                  between promise and delivery in the logistics industry.
                </p>
                <p>
                  Starting with just three delivery vehicles and a commitment to excellence, we focused 
                  on building relationships rather than just moving packages. Our dedication to reliability, 
                  transparency, and customer service quickly set us apart.
                </p>
                <p>
                  Today, we've expanded our network across 50+ cities, but our core values remain unchanged. 
                  Every package tells a story, and we're honored to be part of that journey.
                </p>
              </div>
            </div>
            <div className="lg:order-first">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-br from-primary-100 to-primary-200 rounded-3xl p-12 h-[500px] flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-20"></div>
                  <Truck className="h-40 w-40 text-primary-600 relative z-10 group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section with Staggered Animation */}
      <section className="py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=2000&q=80')] opacity-10 bg-fixed bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <MagneticText>
              <SplitTextReveal
                text="Our Values"
                className="text-4xl md:text-6xl font-bold mb-6"
              />
            </MagneticText>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div ref={valuesRef} className="grid md:grid-cols-2 gap-10">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-2xl transition-all duration-500 group bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20">
                <CardContent className="p-10">
                  <div className="flex items-start space-x-8">
                    <div className="bg-gradient-to-br from-primary-400 to-primary-600 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      <value.icon className="h-10 w-10 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary-300 transition-colors duration-300">{value.title}</h3>
                      <p className="text-gray-300 leading-relaxed text-lg">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section with 3D Effects */}
      <section className="py-32 bg-gradient-to-br from-primary-50 via-white to-primary-100 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80')] opacity-5 bg-fixed bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <MagneticText>
              <SplitTextReveal
                text="Meet Our Team"
                className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
              />
            </MagneticText>
            <p className="text-xl text-gray-600">
              The people behind our success
            </p>
          </div>
          
          <div ref={teamRef} className="grid md:grid-cols-3 gap-10">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-2xl transition-all duration-500 group bg-white/80 backdrop-blur-sm border-0 hover:-translate-y-4">
                <CardContent className="p-10">
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 w-32 h-32 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 mx-auto"></div>
                    <div className="relative bg-gradient-to-br from-primary-100 to-primary-200 w-32 h-32 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                      <Users className="h-16 w-16 text-primary-600" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">{member.name}</h3>
                  <p className="text-primary-600 font-semibold mb-4 text-lg">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section with Parallax */}
      <section className="py-32 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=2000&q=80')] opacity-20 bg-fixed bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/90 to-primary-800/90"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            <MagneticText>
              <SplitTextReveal
                text="Our Mission"
                className="text-4xl md:text-6xl font-bold mb-12"
              />
            </MagneticText>
            <p className="text-xl md:text-2xl text-primary-100 leading-relaxed mb-16 max-w-4xl mx-auto">
              To connect people and businesses through reliable, efficient, and innovative courier services 
              that exceed expectations and build lasting relationships. We believe every delivery matters, 
              and we're committed to making each one count.
            </p>
            <div className="grid md:grid-cols-3 gap-12 mt-16">
              <div className="group">
                <div className="bg-white/10 backdrop-blur-sm w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-12 w-12 text-primary-200" />
                </div>
                <h3 className="text-xl font-bold mb-3">Excellence</h3>
                <p className="text-primary-100">Striving for perfection in every delivery</p>
              </div>
              <div className="group">
                <div className="bg-white/10 backdrop-blur-sm w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-12 w-12 text-primary-200" />
                </div>
                <h3 className="text-xl font-bold mb-3">Reliability</h3>
                <p className="text-primary-100">Consistent service you can count on</p>
              </div>
              <div className="group">
                <div className="bg-white/10 backdrop-blur-sm w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="h-12 w-12 text-primary-200" />
                </div>
                <h3 className="text-xl font-bold mb-3">Innovation</h3>
                <p className="text-primary-100">Leading with technology and creativity</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
