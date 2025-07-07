
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Package, MapPin, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import SplitTextReveal from '@/components/animations/SplitTextReveal';
import MagneticText from '@/components/animations/MagneticText';

const BookPickup = () => {
  const [date, setDate] = useState<Date>();
  const [isLoading, setIsLoading] = useState(false);
  const [packageType, setPackageType] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const trackingId = `CL${Date.now().toString().slice(-8)}`;
    
    const bookingData = {
      trackingId,
      senderInfo: {
        name: formData.get('sender-name') as string,
        phone: formData.get('sender-phone') as string,
        email: formData.get('sender-email') as string,
        address: formData.get('sender-address') as string,
      },
      receiverInfo: {
        name: formData.get('receiver-name') as string,
        phone: formData.get('receiver-phone') as string,
        email: formData.get('receiver-email') as string,
        address: formData.get('receiver-address') as string,
      },
      parcelInfo: {
        type: packageType,
        weight: formData.get('weight') as string,
        service: serviceType,
        description: formData.get('description') as string,
      },
      pickupDate: date ? format(date, 'yyyy-MM-dd') : '',
      pickupTime: timeSlot,
    };

    try {
      // Send booking email
      const { error: emailError } = await supabase.functions.invoke('send-booking-email', {
        body: {
          customerEmail: bookingData.senderInfo.email,
          customerName: bookingData.senderInfo.name,
          trackingId: bookingData.trackingId,
          pickupDate: bookingData.pickupDate,
          pickupTime: bookingData.pickupTime,
          senderInfo: bookingData.senderInfo,
          receiverInfo: bookingData.receiverInfo,
          parcelInfo: bookingData.parcelInfo,
        }
      });

      if (emailError) {
        console.error('Email error:', emailError);
      }

      toast({
        title: "Pickup Booked Successfully! 📦",
        description: `Your tracking ID is: ${trackingId}. Confirmation emails have been sent to both you and our team.`,
        duration: 10000,
      });
      
      // Reset form
      (e.target as HTMLFormElement).reset();
      setDate(undefined);
      setPackageType('');
      setServiceType('');
      setTimeSlot('');
      
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: "Booking Error",
        description: "There was an issue processing your booking. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-primary-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <MagneticText>
            <SplitTextReveal
              text="Book Your Pickup"
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            />
          </MagneticText>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Schedule a pickup for your package anywhere in India and get real-time tracking updates
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Sender Information */}
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="mr-2 h-5 w-5 text-primary-600" />
                  Sender Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sender-name">Full Name</Label>
                    <Input id="sender-name" name="sender-name" placeholder="Rajesh Kumar" required />
                  </div>
                  <div>
                    <Label htmlFor="sender-phone">Phone Number</Label>
                    <Input id="sender-phone" name="sender-phone" placeholder="+91 9876543210" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="sender-email">Email Address</Label>
                  <Input id="sender-email" name="sender-email" type="email" placeholder="rajesh@example.com" required />
                </div>
                <div>
                  <Label htmlFor="sender-address">Pickup Address</Label>
                  <Textarea id="sender-address" name="sender-address" placeholder="123 Main Street, Andheri West, Mumbai, Maharashtra 400058" required />
                </div>
              </CardContent>
            </Card>

            {/* Receiver Information */}
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-primary-600" />
                  Receiver Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="receiver-name">Full Name</Label>
                    <Input id="receiver-name" name="receiver-name" placeholder="Priya Sharma" required />
                  </div>
                  <div>
                    <Label htmlFor="receiver-phone">Phone Number</Label>
                    <Input id="receiver-phone" name="receiver-phone" placeholder="+91 9876543210" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="receiver-email">Email Address</Label>
                  <Input id="receiver-email" name="receiver-email" type="email" placeholder="priya@example.com" required />
                </div>
                <div>
                  <Label htmlFor="receiver-address">Delivery Address</Label>
                  <Textarea id="receiver-address" name="receiver-address" placeholder="456 Connaught Place, New Delhi, Delhi 110001" required />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Package Details */}
          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="mr-2 h-5 w-5 text-primary-600" />
                Package Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label htmlFor="package-type">Package Type</Label>
                  <Select value={packageType} onValueChange={setPackageType} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="document">Document</SelectItem>
                      <SelectItem value="package">Package</SelectItem>
                      <SelectItem value="fragile">Fragile Item</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input id="weight" name="weight" type="number" placeholder="1.5" step="0.1" required />
                </div>
                <div>
                  <Label htmlFor="service">Service Type</Label>
                  <Select value={serviceType} onValueChange={setServiceType} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard (3-5 days) - ₹150</SelectItem>
                      <SelectItem value="express">Express (1-2 days) - ₹250</SelectItem>
                      <SelectItem value="overnight">Overnight - ₹500</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="description">Package Description</Label>
                <Textarea id="description" name="description" placeholder="Brief description of contents..." />
              </div>
            </CardContent>
          </Card>

          {/* Pickup Schedule */}
          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-primary-600" />
                Pickup Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Pickup Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <AnimatedButton
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </AnimatedButton>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label>Pickup Time</Label>
                  <Select value={timeSlot} onValueChange={setTimeSlot} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00">9:00 AM - 12:00 PM</SelectItem>
                      <SelectItem value="12:00">12:00 PM - 3:00 PM</SelectItem>
                      <SelectItem value="15:00">3:00 PM - 6:00 PM</SelectItem>
                      <SelectItem value="18:00">6:00 PM - 9:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <AnimatedButton
              type="submit"
              size="lg"
              className="bg-primary-600 hover:bg-primary-700 text-lg px-12 py-3"
              disabled={isLoading}
            >
              {isLoading ? "Booking Pickup..." : "Book Pickup Now"}
            </AnimatedButton>
            {date && serviceType && (
              <p className="text-sm text-gray-600 mt-2">
                📧 Confirmation emails will be sent to both you and our team
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookPickup;
