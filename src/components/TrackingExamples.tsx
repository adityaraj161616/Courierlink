
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Package, Clock, MapPin, Truck } from 'lucide-react';

const TrackingExamples = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const exampleTrackingIds = [
    {
      id: 'CL20241225-0001',
      status: 'Delivered',
      location: 'Mumbai',
      icon: Package,
      color: 'text-green-600 bg-green-50'
    },
    {
      id: 'CL20241224-0235',
      status: 'In Transit',
      location: 'Delhi Hub',
      icon: Truck,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      id: 'CL20241223-0187',
      status: 'Out for Delivery',
      location: 'Bangalore',
      icon: MapPin,
      color: 'text-orange-600 bg-orange-50'
    },
    {
      id: 'CL20241222-0099',
      status: 'Processing',
      location: 'Chennai',
      icon: Clock,
      color: 'text-purple-600 bg-purple-50'
    },
    {
      id: 'CL20241221-0456',
      status: 'Picked Up',
      location: 'Kolkata',
      icon: Package,
      color: 'text-indigo-600 bg-indigo-50'
    },
    {
      id: 'CL20241220-0321',
      status: 'In Transit',
      location: 'Hyderabad Hub',
      icon: Truck,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      id: 'CL20241219-0789',
      status: 'Delivered',
      location: 'Pune',
      icon: Package,
      color: 'text-green-600 bg-green-50'
    },
    {
      id: 'CL20241218-0654',
      status: 'Out for Delivery',
      location: 'Ahmedabad',
      icon: MapPin,
      color: 'text-orange-600 bg-orange-50'
    }
  ];

  const handleCopy = async (id: string) => {
    await navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Try These Sample Tracking Numbers
        </h3>
        <p className="text-gray-600">
          Click on any tracking number to copy and test our tracking system across India
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {exampleTrackingIds.map((item, index) => (
          <Card 
            key={item.id} 
            className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
            onClick={() => handleCopy(item.id)}
          >
            <CardContent className="p-4">
              <div className="flex flex-col items-center space-y-3">
                <div className={`p-3 rounded-full ${item.color}`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="text-center">
                  <div className="font-mono text-sm font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {item.id}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {item.status}
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.location}
                  </div>
                </div>
                <div className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                  {copiedId === item.id ? 'Copied!' : 'Click to copy'}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center">
        <AnimatedButton 
          variant="outline" 
          className="mt-4"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Back to Tracking
        </AnimatedButton>
      </div>
    </div>
  );
};

export default TrackingExamples;
