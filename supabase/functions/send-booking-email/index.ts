
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BookingEmailData {
  customerEmail: string;
  customerName: string;
  trackingId: string;
  pickupDate: string;
  pickupTime: string;
  senderInfo: any;
  receiverInfo: any;
  parcelInfo: any;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const bookingData: BookingEmailData = await req.json();
    
    console.log('Booking email request:', bookingData);

    // Send booking confirmation email to customer
    const customerEmailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: 'default_service',
        template_id: 'booking_confirmation',
        user_id: 'YOUR_EMAILJS_USER_ID',
        template_params: {
          to_email: bookingData.customerEmail,
          to_name: bookingData.customerName,
          from_name: 'CourierLink',
          from_email: 'adityaraj1613@gmail.com',
          tracking_id: bookingData.trackingId,
          pickup_date: bookingData.pickupDate,
          pickup_time: bookingData.pickupTime,
          sender_name: bookingData.senderInfo?.name || 'N/A',
          sender_address: bookingData.senderInfo?.address || 'N/A',
          receiver_name: bookingData.receiverInfo?.name || 'N/A',
          receiver_address: bookingData.receiverInfo?.address || 'N/A',
          package_type: bookingData.parcelInfo?.type || 'N/A',
          package_weight: bookingData.parcelInfo?.weight || 'N/A',
        }
      })
    });

    // Send booking notification to admin
    const adminEmailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: 'default_service',
        template_id: 'booking_notification',
        user_id: 'YOUR_EMAILJS_USER_ID',
        template_params: {
          to_email: 'adityaraj1613@gmail.com',
          to_name: 'CourierLink Admin',
          from_name: 'CourierLink System',
          from_email: 'system@courierlink.in',
          customer_name: bookingData.customerName,
          customer_email: bookingData.customerEmail,
          tracking_id: bookingData.trackingId,
          pickup_date: bookingData.pickupDate,
          pickup_time: bookingData.pickupTime,
        }
      })
    });

    console.log('Booking emails sent successfully');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Booking emails sent successfully!',
        trackingId: bookingData.trackingId
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error('Error in send-booking-email function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to send booking emails',
        details: error.message 
      }),
      {
        status: 500,
        headers: { 
          'Content-Type': 'application/json', 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
