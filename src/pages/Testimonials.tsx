
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Business Owner',
      company: 'Tech Solutions Inc.',
      content: 'CourierLink has transformed our delivery operations. Their reliability and speed are unmatched. We\'ve seen a 40% improvement in customer satisfaction since switching.',
      rating: 5,
      image: '/placeholder.svg'
    },
    {
      name: 'Mike Chen',
      role: 'E-commerce Manager',
      company: 'Fashion Forward',
      content: 'Excellent service and competitive pricing. The real-time tracking feature is fantastic and our customers love being able to see exactly where their packages are.',
      rating: 5,
      image: '/placeholder.svg'
    },
    {
      name: 'Lisa Rodriguez',
      role: 'Operations Director',
      company: 'Global Imports',
      content: 'Professional team and always on time. They handle our international shipments with care and precision. Great experience working with them for over 2 years now.',
      rating: 5,
      image: '/placeholder.svg'
    },
    {
      name: 'David Park',
      role: 'Startup Founder',
      company: 'InnovateNow',
      content: 'As a growing startup, we needed a courier service that could scale with us. CourierLink has been that partner, growing alongside our business needs.',
      rating: 5,
      image: '/placeholder.svg'
    },
    {
      name: 'Emily Watson',
      role: 'Retail Manager',
      company: 'Boutique Central',
      content: 'The customer service is outstanding. Whenever we have questions or special requests, the team is always ready to help. Highly recommend!',
      rating: 5,
      image: '/placeholder.svg'
    },
    {
      name: 'James Wilson',
      role: 'Supply Chain Manager',
      company: 'Manufacturing Plus',
      content: 'CourierLink handles our B2B deliveries with professionalism. Their logistics expertise has helped us optimize our supply chain significantly.',
      rating: 5,
      image: '/placeholder.svg'
    }
  ];

  return (
    <div className="pt-16">
      <section className="py-20 bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our Customers Say
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say about their experience with CourierLink™.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-semibold text-lg">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                      <div className="text-sm text-primary-600">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
