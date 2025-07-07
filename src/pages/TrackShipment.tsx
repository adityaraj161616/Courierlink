import { useState, useEffect } from 'react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Package, MapPin, Clock, CheckCircle, Truck, AlertCircle, Search, Copy, RefreshCw, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import TrackingExamples from '@/components/TrackingExamples';
import InteractiveMap from '@/components/InteractiveMap';
import SplitTextReveal from '@/components/animations/SplitTextReveal';
import MagneticText from '@/components/animations/MagneticText';

const TrackShipment = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingData, setTrackingData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  // Enhanced mock tracking data with Indian locations
  const mockTrackingData = {
    trackingNumber: 'CL123456789',
    status: 'in_transit',
    estimatedDelivery: '2024-01-15',
    currentLocation: 'Distribution Hub - Delhi',
    progress: 65,
    weight: '2.5 kg',
    dimensions: '30x20x15 cm',
    service: 'Express Delivery',
    sender: {
      name: 'Rajesh Kumar',
      city: 'Mumbai',
      address: '123 Linking Road, Bandra West, Mumbai, Maharashtra 400050'
    },
    receiver: {
      name: 'Priya Sharma',
      city: 'Delhi',
      address: '456 Connaught Place, New Delhi, Delhi 110001'
    },
    timeline: [
      {
        status: 'order_placed',
        title: 'Order Placed',
        description: 'Shipment order created and confirmed',
        location: 'Mumbai, Maharashtra',
        timestamp: '2024-01-11 08:00 AM',
        completed: true
      },
      {
        status: 'picked_up',
        title: 'Package Picked Up',
        description: 'Package collected from sender location',
        location: 'Mumbai, Maharashtra',
        timestamp: '2024-01-12 09:30 AM',
        completed: true
      },
      {
        status: 'in_transit',
        title: 'In Transit',
        description: 'Package is on its way to destination',
        location: 'Distribution Hub - Delhi',
        timestamp: '2024-01-13 02:15 PM',
        completed: true
      },
      {
        status: 'out_for_delivery',
        title: 'Out for Delivery',
        description: 'Package is out for delivery',
        location: 'Delhi, Delhi',
        timestamp: 'Expected: 2024-01-15 10:00 AM',
        completed: false
      },
      {
        status: 'delivered',
        title: 'Delivered',
        description: 'Package delivered successfully',
        location: 'Delhi, Delhi',
        timestamp: 'Expected: 2024-01-15 12:00 PM',
        completed: false
      }
    ]
  };

  const handleTrack = async () => {
    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate realistic API loading time
    setTimeout(() => {
      if (trackingNumber.toLowerCase().includes('cl') || trackingNumber === '123456789') {
        setTrackingData(mockTrackingData);
      } else {
        setError('Tracking number not found. Please verify your tracking number and try again.');
        setTrackingData(null);
      }
      setIsLoading(false);
    }, 2000);
  };

  const handleCopyTracking = async () => {
    if (trackingData?.trackingNumber) {
      await navigator.clipboard.writeText(trackingData.trackingNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStatusIcon = (status: string, completed: boolean) => {
    if (completed) {
      return <CheckCircle className="h-6 w-6 text-green-500" />;
    }
    
    switch (status) {
      case 'order_placed':
        return <Package className="h-6 w-6 text-blue-500" />;
      case 'picked_up':
        return <Package className="h-6 w-6 text-blue-500" />;
      case 'in_transit':
        return <Truck className="h-6 w-6 text-orange-500" />;
      case 'out_for_delivery':
        return <MapPin className="h-6 w-6 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      default:
        return <Clock className="h-6 w-6 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'order_placed':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'picked_up':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'in_transit':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'out_for_delivery':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'delivered':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  // Auto-focus effect for better UX
  useEffect(() => {
    const input = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (input) {
      input.focus();
    }
  }, []);

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Enhanced Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Package className="h-4 w-4" />
            <span>Real-time Package Tracking Across India</span>
          </div>
          <MagneticText>
            <SplitTextReveal
              text="Track Your Shipment"
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight"
            />
          </MagneticText>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Enter your tracking number below to get real-time updates and detailed information about your package delivery across India
          </p>
        </div>

        {/* Enhanced Tracking Input */}
        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="space-y-4">
              <div className={cn(
                "relative transition-all duration-300",
                searchFocused && "scale-[1.02]"
              )}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Enter tracking number (e.g., CL123456789)"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      onFocus={() => setSearchFocused(true)}
                      onBlur={() => setSearchFocused(false)}
                      className={cn(
                        "text-lg py-4 pl-12 pr-4 border-2 transition-all duration-300",
                        searchFocused 
                          ? "border-primary-500 ring-4 ring-primary-100 shadow-lg" 
                          : "border-gray-200 hover:border-gray-300"
                      )}
                      onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
                      disabled={isLoading}
                    />
                  </div>
                  <AnimatedButton 
                    onClick={handleTrack} 
                    disabled={isLoading || !trackingNumber.trim()}
                    size="lg"
                    className="bg-primary-600 hover:bg-primary-700 text-lg px-8 py-4"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                        Tracking...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-5 w-5" />
                        Track Package
                      </>
                    )}
                  </AnimatedButton>
                </div>
              </div>

              {/* Enhanced Error Display */}
              {error && (
                <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg animate-fade-in">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
                    <div>
                      <p className="text-red-700 font-medium">Tracking Error</p>
                      <p className="text-red-600 text-sm mt-1">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Loading State */}
              {isLoading && (
                <div className="space-y-3 animate-fade-in">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <RefreshCw className="h-5 w-5 animate-spin text-primary-600" />
                    <span className="font-medium">Searching for your package across India...</span>
                  </div>
                  <Progress value={33} className="w-full" />
                  <p className="text-sm text-gray-500">This may take a few seconds</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Sample Tracking Numbers */}
        <TrackingExamples />

        {/* Enhanced Tracking Results */}
        {trackingData && (
          <div className="space-y-8 animate-fade-in">
            {/* Enhanced Package Summary */}
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-gray-900">Package Details</CardTitle>
                  <div className="flex items-center space-x-3">
                    <span className={cn(
                      "px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-300",
                      getStatusColor(trackingData.status)
                    )}>
                      {trackingData.status.replace('_', ' ').toUpperCase()}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyTracking}
                      className="hover:bg-gray-50"
                    >
                      {copied ? (
                        <>
                          <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="mr-1 h-4 w-4" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">Delivery Progress</span>
                    <span className="text-primary-600 font-semibold">{trackingData.progress}%</span>
                  </div>
                  <Progress value={trackingData.progress} className="h-3" />
                </div>

                {/* Package Info Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Tracking Number</h4>
                    <p className="text-gray-700 font-mono text-lg">{trackingData.trackingNumber}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Service Type</h4>
                    <p className="text-gray-700">{trackingData.service}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Weight</h4>
                    <p className="text-gray-700">{trackingData.weight}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Dimensions</h4>
                    <p className="text-gray-700">{trackingData.dimensions}</p>
                  </div>
                </div>

                {/* Sender/Receiver Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide flex items-center">
                      <Package className="mr-2 h-4 w-4" />
                      From
                    </h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-900 font-medium">{trackingData.sender.name}</p>
                      <p className="text-gray-600 text-sm">{trackingData.sender.address}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide flex items-center">
                      <MapPin className="mr-2 h-4 w-4" />
                      To
                    </h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-900 font-medium">{trackingData.receiver.name}</p>
                      <p className="text-gray-600 text-sm">{trackingData.receiver.address}</p>
                    </div>
                  </div>
                </div>

                {/* Current Status Highlight */}
                <div className="bg-gradient-to-r from-primary-50 to-primary-100 p-6 rounded-xl border border-primary-200">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary-600 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-lg">Current Location</h4>
                      <p className="text-gray-700 text-lg">{trackingData.currentLocation}</p>
                      <div className="flex items-center mt-3 space-x-4">
                        <div className="flex items-center text-primary-700">
                          <Clock className="h-5 w-5 mr-2" />
                          <span className="font-medium">Estimated Delivery</span>
                        </div>
                        <span className="text-gray-900 font-semibold">{trackingData.estimatedDelivery}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Tracking Timeline */}
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Tracking Timeline</CardTitle>
                <p className="text-gray-600">Follow your package's journey from pickup to delivery</p>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {trackingData.timeline.map((event: any, index: number) => (
                    <div key={index} className={cn(
                      "flex items-start mb-8 last:mb-0 transition-all duration-300",
                      event.completed ? "opacity-100" : "opacity-60"
                    )}>
                      <div className="flex flex-col items-center mr-6">
                        <div className={cn(
                          "p-2 rounded-full transition-all duration-300",
                          event.completed 
                            ? "bg-green-100 ring-4 ring-green-50" 
                            : "bg-gray-100 ring-4 ring-gray-50"
                        )}>
                          {getStatusIcon(event.status, event.completed)}
                        </div>
                        {index < trackingData.timeline.length - 1 && (
                          <div className={cn(
                            "w-0.5 h-16 mt-3 transition-all duration-300",
                            event.completed ? "bg-green-300" : "bg-gray-200"
                          )} />
                        )}
                      </div>
                      <div className={cn(
                        "flex-1 pb-8 transition-all duration-300",
                        event.completed ? "bg-white" : "bg-gray-50/50",
                        "p-4 rounded-lg border-l-4",
                        event.completed ? "border-green-400" : "border-gray-300"
                      )}>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                          <h4 className={cn(
                            "font-bold text-lg transition-all duration-300",
                            event.completed ? "text-gray-900" : "text-gray-500"
                          )}>
                            {event.title}
                          </h4>
                          <span className={cn(
                            "text-sm font-medium mt-1 sm:mt-0",
                            event.completed ? "text-gray-600" : "text-gray-400"
                          )}>
                            {event.timestamp}
                          </span>
                        </div>
                        <p className={cn(
                          "text-sm mb-2 transition-all duration-300",
                          event.completed ? "text-gray-700" : "text-gray-400"
                        )}>
                          {event.description}
                        </p>
                        <div className="flex items-center">
                          <MapPin className={cn(
                            "h-4 w-4 mr-2 transition-all duration-300",
                            event.completed ? "text-primary-600" : "text-gray-400"
                          )} />
                          <p className={cn(
                            "text-sm font-medium transition-all duration-300",
                            event.completed ? "text-primary-700" : "text-gray-400"
                          )}>
                            {event.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Interactive Map */}
            <InteractiveMap trackingData={trackingData} />

            {/* Additional Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                size="lg"
                className="hover:bg-primary-50 hover:text-primary-700 hover:border-primary-300"
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                Refresh Tracking
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="hover:bg-primary-50 hover:text-primary-700 hover:border-primary-300"
              >
                <Package className="mr-2 h-5 w-5" />
                Track Another Package
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackShipment;
