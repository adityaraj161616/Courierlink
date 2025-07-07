
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();
    
    console.log('Contact form submission:', formData);

    // Send email to admin
    const adminEmailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: 'default_service',
        template_id: 'contact_form',
        user_id: 'YOUR_EMAILJS_USER_ID',
        template_params: {
          to_email: 'adityaraj1613@gmail.com',
          from_name: `${formData.firstName} ${formData.lastName}`,
          from_email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          to_name: 'CourierLink Support',
        }
      })
    });

    // Send confirmation email to user
    const userEmailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: 'default_service',
        template_id: 'contact_confirmation',
        user_id: 'YOUR_EMAILJS_USER_ID',
        template_params: {
          to_email: formData.email,
          to_name: `${formData.firstName} ${formData.lastName}`,
          from_name: 'CourierLink Support',
          from_email: 'adityaraj1613@gmail.com',
        }
      })
    });

    console.log('Emails sent successfully');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Contact form submitted successfully and emails sent!' 
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
    console.error('Error in contact-form function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to submit contact form',
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
