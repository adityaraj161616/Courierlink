
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { MapPin, ExternalLink } from 'lucide-react';

interface InteractiveMapProps {
  trackingData?: any;
}

const InteractiveMap = ({ trackingData }: InteractiveMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Mock locations for Indian cities
  const locations = [
    { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
    { name: 'Delhi', lat: 28.7041, lng: 77.1025 },
    { name: 'Bangalore', lat: 12.9716, lng: 77.5946 },
    { name: 'Chennai', lat: 13.0827, lng: 80.2707 },
    { name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
    { name: 'Hyderabad', lat: 17.3850, lng: 78.4867 },
    { name: 'Pune', lat: 18.5204, lng: 73.8567 },
    { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714 }
  ];

  const getCurrentLocation = () => {
    if (trackingData?.currentLocation) {
      const location = locations.find(loc => 
        trackingData.currentLocation.toLowerCase().includes(loc.name.toLowerCase())
      );
      return location || locations[1]; // Default to Delhi
    }
    return locations[1]; // Default to Delhi
  };

  const handleOpenGoogleMaps = () => {
    const currentLoc = getCurrentLocation();
    const googleMapsUrl = `https://www.google.com/maps?q=${currentLoc.lat},${currentLoc.lng}&z=15`;
    window.open(googleMapsUrl, '_blank');
  };

  const handleGetDirections = () => {
    const currentLoc = getCurrentLocation();
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${currentLoc.lat},${currentLoc.lng}`;
    window.open(directionsUrl, '_blank');
  };

  return (
    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
          <MapPin className="mr-3 h-6 w-6 text-primary-600" />
          Package Location Tracker
        </CardTitle>
        <p className="text-gray-600">Interactive tracking across India</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Map Placeholder with Indian theme */}
          <div className="bg-gradient-to-br from-orange-50 to-green-50 rounded-xl h-80 flex items-center justify-center relative overflow-hidden border-2 border-orange-200">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=2000&q=80')] opacity-20 bg-cover bg-center"></div>
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
              <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                🇮🇳 Tracking across India
              </div>
              <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                Live Tracking
              </div>
            </div>
            
            <div className="text-center z-10 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
              <div className="bg-primary-600 p-4 rounded-full mb-4 mx-auto w-fit">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Google Maps</h3>
              <p className="text-gray-600 mb-4">
                {trackingData 
                  ? `Current location: ${trackingData.currentLocation || 'Delhi Hub'}`
                  : 'Ready to track your package location'
                }
              </p>
              
              <div className="space-y-3">
                <AnimatedButton 
                  onClick={handleOpenGoogleMaps}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  size="sm"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open in Google Maps
                </AnimatedButton>
                
                <AnimatedButton 
                  onClick={handleGetDirections}
                  variant="outline"
                  className="border-primary-500 text-primary-600 hover:bg-primary-50"
                  size="sm"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Get Directions
                </AnimatedButton>
              </div>
            </div>

            {/* Mock route indicators */}
            <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
            <div className="absolute top-3/4 right-1/3 w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
            <div className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
          </div>

          {/* Route Information */}
          {trackingData && (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Origin</h4>
                <p className="text-blue-700">{trackingData.sender?.city || 'Mumbai'}</p>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Destination</h4>
                <p className="text-green-700">{trackingData.receiver?.city || 'Delhi'}</p>
              </div>
            </div>
          )}

          {/* Additional map features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-2xl mb-1">🚚</div>
              <div className="text-sm text-gray-600">Live Tracking</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-2xl mb-1">📍</div>
              <div className="text-sm text-gray-600">Pin Location</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-2xl mb-1">🛣️</div>
              <div className="text-sm text-gray-600">Route Info</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-2xl mb-1">⏱️</div>
              <div className="text-sm text-gray-600">ETA Updates</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveMap;
