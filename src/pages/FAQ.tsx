
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = () => {
  const faqs = [
    {
      question: 'What are your delivery times?',
      answer: 'We offer same-day delivery within the city (2-6 hours), next-day delivery for domestic shipments, and 3-7 business days for international deliveries depending on the destination.'
    },
    {
      question: 'How can I track my package?',
      answer: 'You can track your package using the tracking number provided via email or SMS. Simply enter the tracking number on our website or use our mobile app for real-time updates.'
    },
    {
      question: 'What items can I ship?',
      answer: 'We ship most items including documents, packages, electronics, clothing, and more. We cannot ship hazardous materials, perishables without proper packaging, or prohibited items as per local regulations.'
    },
    {
      question: 'How do I schedule a pickup?',
      answer: 'You can schedule a pickup through our website, mobile app, or by calling our customer service. We offer flexible pickup times and can accommodate urgent requests.'
    },
    {
      question: 'What if my package is damaged or lost?',
      answer: 'All packages are insured up to their declared value. If your package is damaged or lost, please contact our customer service immediately. We will investigate and provide compensation as per our insurance policy.'
    },
    {
      question: 'Do you offer bulk shipping discounts?',
      answer: 'Yes, we offer competitive rates for bulk shipments and corporate accounts. Contact our sales team to discuss custom pricing based on your shipping volume and requirements.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, bank transfers, and digital wallets. Corporate customers can also set up billing accounts with monthly invoicing.'
    },
    {
      question: 'Can I change the delivery address after booking?',
      answer: 'Yes, you can change the delivery address before the package is out for delivery. Additional charges may apply depending on the new location and timing of the request.'
    }
  ];

  return (
    <div className="pt-16">
      <section className="py-20 bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600">
              Find answers to common questions about our courier services
            </p>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-semibold">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
