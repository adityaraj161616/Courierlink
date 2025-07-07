import { Card, CardContent } from '@/components/ui/card';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Check, Star, Zap } from 'lucide-react';
import SplitTextReveal from '@/components/animations/SplitTextReveal';
import VideoMaskReveal from '@/components/animations/VideoMaskReveal';
import MagneticText from '@/components/animations/MagneticText';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Pricing = () => {
  const plansRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (plansRef.current) {
      gsap.fromTo(
        plansRef.current.children,
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: plansRef.current,
            start: 'top 70%',
          }
        }
      );
    }
  }, []);

  const plans = [
    {
      name: 'Basic',
      price: '₹1,500',
      period: '/month',
      features: ['Up to 50 deliveries', 'Local courier service', 'Basic tracking', 'Email support'],
      color: 'blue'
    },
    {
      name: 'Professional',
      price: '₹3,500',
      period: '/month',
      popular: true,
      features: ['Up to 200 deliveries', 'Local & domestic shipping', 'Real-time tracking', 'Priority support', 'API access'],
      color: 'primary'
    },
    {
      name: 'Enterprise',
      price: '₹7,500',
      period: '/month',
      features: ['Unlimited deliveries', 'Pan-India shipping', 'Advanced analytics', '24/7 phone support', 'Custom integrations'],
      color: 'purple'
    }
  ];

  return (
    <div className="pt-16 overflow-hidden">
      {/* Hero Section with Video Mask */}
      <VideoMaskReveal imageSrc="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=2000&q=80">
        <section className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-primary-800/80 to-primary-700/70"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <MagneticText>
              <SplitTextReveal
                text="Simple, Transparent Pricing"
                className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
                delay={0.5}
              />
            </MagneticText>
            <div className="max-w-4xl mx-auto">
              <SplitTextReveal
                text="Choose the perfect plan for your delivery needs across India. No hidden fees, no surprises."
                className="text-xl md:text-2xl text-white/90 leading-relaxed"
                delay={1}
              />
            </div>
          </div>
        </section>
      </VideoMaskReveal>
      
      {/* Pricing Cards with Advanced Animation */}
      <section className="py-32 relative bg-gradient-to-br from-gray-50 to-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=2000&q=80')] opacity-5 bg-fixed bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div ref={plansRef} className="grid md:grid-cols-3 gap-10">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative transition-all duration-500 group overflow-hidden bg-white/80 backdrop-blur-sm border-0 hover:-translate-y-4 ${
                plan.popular 
                  ? 'ring-4 ring-primary-500 shadow-2xl hover:shadow-3xl scale-105' 
                  : 'hover:shadow-2xl'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center">
                      <Star className="h-4 w-4 mr-2 fill-current" />
                      Most Popular
                    </div>
                  </div>
                )}
                
                {/* Background Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${
                  plan.color === 'blue' ? 'from-blue-400 to-blue-600' :
                  plan.color === 'primary' ? 'from-primary-400 to-primary-600' :
                  'from-purple-400 to-purple-600'
                }`}></div>
                
                <CardContent className="p-10 text-center relative z-10">
                  <div className="mb-8">
                    <div className={`w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                      plan.color === 'blue' ? 'bg-gradient-to-br from-blue-100 to-blue-200' :
                      plan.color === 'primary' ? 'bg-gradient-to-br from-primary-100 to-primary-200' :
                      'bg-gradient-to-br from-purple-100 to-purple-200'
                    }`}>
                      {plan.popular ? (
                        <Zap className="h-10 w-10 text-primary-600" />
                      ) : (
                        <div className={`w-6 h-6 rounded-full ${
                          plan.color === 'blue' ? 'bg-blue-500' :
                          plan.color === 'primary' ? 'bg-primary-500' :
                          'bg-purple-500'
                        }`}></div>
                      )}
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">{plan.name}</h3>
                  </div>
                  
                  <div className="mb-8">
                    <span className="text-6xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">{plan.price}</span>
                    <span className="text-xl text-gray-600">{plan.period}</span>
                  </div>
                  
                  <ul className="space-y-4 mb-10">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-left">
                        <div className={`rounded-full p-1 mr-4 ${
                          plan.color === 'blue' ? 'bg-blue-100' :
                          plan.color === 'primary' ? 'bg-primary-100' :
                          'bg-purple-100'
                        }`}>
                          <Check className={`h-4 w-4 ${
                            plan.color === 'blue' ? 'text-blue-600' :
                            plan.color === 'primary' ? 'text-primary-600' :
                            'text-purple-600'
                          }`} />
                        </div>
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <AnimatedButton 
                    className={`w-full text-lg py-4 ${
                      plan.popular 
                        ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg' 
                        : plan.color === 'blue'
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                    glowEffect={plan.popular}
                  >
                    Get Started
                  </AnimatedButton>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Additional Info */}
          <div className="text-center mt-16">
            <p className="text-gray-600 text-lg mb-8">All plans include our standard features:</p>
            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                'SSL Encryption',
                'Mobile App Access',
                'Package Insurance',
                '30-Day Free Trial'
              ].map((feature, index) => (
                <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 hover:bg-white/80 transition-colors duration-300">
                  <Check className="h-6 w-6 text-green-500 mx-auto mb-2" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=2000&q=80')] opacity-10 bg-fixed bg-cover bg-center"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <MagneticText>
            <SplitTextReveal
              text="Frequently Asked Questions"
              className="text-4xl md:text-6xl font-bold mb-16"
            />
          </MagneticText>
          
          <div className="grid gap-8 text-left">
            {[
              {
                q: "Can I change my plan anytime?",
                a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
              },
              {
                q: "Is there a setup fee?",
                a: "No setup fees! You only pay the monthly subscription fee for your chosen plan."
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit/debit cards, UPI, net banking, and digital wallets for your convenience."
              },
              {
                q: "Do you deliver across all states in India?",
                a: "Yes, we provide delivery services across all states and union territories in India including remote locations."
              }
            ].map((faq, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-colors duration-300">
                <CardContent className="p-8">
                  <h4 className="text-xl font-bold text-white mb-4">{faq.q}</h4>
                  <p className="text-gray-300 leading-relaxed">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
