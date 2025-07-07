
import { Card, CardContent } from '@/components/ui/card';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Package, Truck, Globe, Zap, Clock, Shield, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import SplitTextReveal from '@/components/animations/SplitTextReveal';
import VideoMaskReveal from '@/components/animations/VideoMaskReveal';
import MagneticText from '@/components/animations/MagneticText';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const servicesRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const additionalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Main services animation
    if (servicesRef.current) {
      gsap.fromTo(
        servicesRef.current.children,
        { y: 80, opacity: 0, rotateX: 15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: servicesRef.current,
            start: 'top 70%',
          }
        }
      );
    }

    // Features animation
    if (featuresRef.current) {
      gsap.fromTo(
        featuresRef.current.children,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 75%',
          }
        }
      );
    }

    // Additional services animation
    if (additionalRef.current) {
      gsap.fromTo(
        additionalRef.current.children,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: additionalRef.current,
            start: 'top 80%',
          }
        }
      );
    }
  }, []);

  const mainServices = [
    {
      icon: Package,
      title: 'Local Courier',
      description: 'Fast same-day delivery within the city limits',
      features: ['Same-day delivery', 'Real-time tracking', 'Secure handling', 'Flexible pickup times'],
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: Truck,
      title: 'Domestic Shipping',
      description: 'Reliable nationwide delivery across the country',
      features: ['2-5 day delivery', 'Insurance included', 'Bulk discounts', 'Business accounts'],
      color: 'bg-green-500',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: Globe,
      title: 'International Courier',
      description: 'Worldwide shipping with customs handling',
      features: ['Global network', 'Customs clearance', 'Express options', 'Documentation support'],
      color: 'bg-purple-500',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: Zap,
      title: 'Express Delivery',
      description: 'Ultra-fast delivery for urgent packages',
      features: ['2-hour delivery', 'Priority handling', 'Live tracking', 'Signature confirmation'],
      color: 'bg-orange-500',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      icon: Users,
      title: 'B2B Logistics',
      description: 'Comprehensive business-to-business solutions',
      features: ['Volume discounts', 'Dedicated account manager', 'API integration', 'Regular pickups'],
      color: 'bg-teal-500',
      gradient: 'from-teal-500 to-teal-600'
    },
    {
      icon: Clock,
      title: 'Scheduled Delivery',
      description: 'Plan your deliveries in advance',
      features: ['Flexible scheduling', 'Recurring deliveries', 'Time slot selection', 'Automated reminders'],
      color: 'bg-indigo-500',
      gradient: 'from-indigo-500 to-indigo-600'
    }
  ];

  const additionalServices = [
    {
      icon: Shield,
      title: 'Package Insurance',
      description: 'Comprehensive coverage for valuable items'
    },
    {
      icon: MapPin,
      title: 'Warehousing',
      description: 'Temporary storage and distribution services'
    },
    {
      icon: Package,
      title: 'Packaging Services',
      description: 'Professional packing for fragile items'
    }
  ];

  return (
    <div className="pt-16 overflow-hidden">
      {/* Hero Section with Video Mask */}
      <VideoMaskReveal imageSrc="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=2000&q=80">
        <section className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-primary-800/80 to-primary-700/70"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <MagneticText>
              <SplitTextReveal
                text="Our Services"
                className="text-5xl md:text-7xl font-bold text-white mb-8"
                delay={0.5}
              />
            </MagneticText>
            <div className="max-w-4xl mx-auto">
              <SplitTextReveal
                text="Comprehensive courier and logistics solutions tailored to meet your specific delivery needs. From local express to international shipping, we've got you covered."
                className="text-xl md:text-2xl text-white/90 leading-relaxed"
                delay={1}
              />
            </div>
          </div>
        </section>
      </VideoMaskReveal>

      {/* Main Services with 3D Cards */}
      <section className="py-32 relative bg-gradient-to-br from-gray-50 to-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=2000&q=80')] opacity-5 bg-fixed bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div ref={servicesRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {mainServices.map((service, index) => (
              <Card key={index} className="hover:shadow-2xl transition-all duration-500 group overflow-hidden bg-white/80 backdrop-blur-sm border-0 hover:-translate-y-2">
                <CardContent className="p-0">
                  <div className={`bg-gradient-to-r ${service.gradient} p-8 text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                    <service.icon className="h-14 w-14 mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                    <h3 className="text-2xl font-bold mb-3 relative z-10">{service.title}</h3>
                    <p className="text-white/90 relative z-10">{service.description}</p>
                  </div>
                  <div className="p-8">
                    <ul className="space-y-4 mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-gray-600">
                          <div className={`w-3 h-3 rounded-full ${service.color} mr-4 group-hover:scale-110 transition-transform duration-300`}></div>
                          <span className="font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/book-pickup">
                      <AnimatedButton className="w-full group-hover:bg-primary-700 transition-colors duration-300">
                        Book Now
                      </AnimatedButton>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Features with Floating Animation */}
      <section className="py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=2000&q=80')] opacity-10 bg-fixed bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <MagneticText>
              <SplitTextReveal
                text="Why Choose Our Services?"
                className="text-4xl md:text-6xl font-bold mb-6"
              />
            </MagneticText>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We go above and beyond to ensure your packages reach their destination safely and on time
            </p>
          </div>

          <div ref={featuresRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Express delivery options available for urgent shipments'
              },
              {
                icon: Shield,
                title: 'Fully Insured',
                description: 'Complete protection for your valuable packages'
              },
              {
                icon: MapPin,
                title: 'Real-Time Tracking',
                description: 'Monitor your package every step of the way'
              },
              {
                icon: Clock,
                title: '24/7 Support',
                description: 'Round-the-clock customer service and assistance'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 w-20 h-20 rounded-2xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 mx-auto"></div>
                  <div className="relative bg-gradient-to-br from-primary-500 to-primary-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary-300 transition-colors duration-300">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services with Slide Animation */}
      <section className="py-32 bg-gradient-to-br from-primary-50 via-white to-primary-100 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80')] opacity-5 bg-fixed bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <MagneticText>
              <SplitTextReveal
                text="Additional Services"
                className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
              />
            </MagneticText>
            <p className="text-xl text-gray-600">
              Complementary services to enhance your shipping experience
            </p>
          </div>

          <div ref={additionalRef} className="grid md:grid-cols-3 gap-10">
            {additionalServices.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-2xl transition-all duration-500 group bg-white/80 backdrop-blur-sm border-0 hover:-translate-y-4">
                <CardContent className="p-10">
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 w-20 h-20 rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 mx-auto"></div>
                    <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 group-hover:bg-gradient-to-br group-hover:from-primary-100 group-hover:to-primary-200">
                      <service.icon className="h-10 w-10 text-gray-600 group-hover:text-primary-600 transition-colors duration-300" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">{service.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Parallax */}
      <section className="py-32 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=2000&q=80')] opacity-20 bg-fixed bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/90 to-primary-800/90"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <MagneticText>
            <SplitTextReveal
              text="Ready to Get Started?"
              className="text-4xl md:text-6xl font-bold mb-8"
            />
          </MagneticText>
          <p className="text-xl md:text-2xl text-primary-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Choose the service that best fits your needs and book your pickup today
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/book-pickup">
              <AnimatedButton size="lg" variant="secondary" className="text-lg px-10 py-4 bg-white text-primary-600 hover:bg-gray-100">
                Book Pickup Now
              </AnimatedButton>
            </Link>
            <Link to="/pricing">
              <AnimatedButton size="lg" variant="outline" className="text-lg px-10 py-4 border-white text-black hover:bg-white hover:text-primary-600">
                View Pricing
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
