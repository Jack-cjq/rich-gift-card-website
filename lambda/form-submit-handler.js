/**
 * AWS Lambda function for form submission
 * 
 * This function:
 * 1. Sends email to admin
 * 2. Sends confirmation email to user
 * 3. Sends Meta CAPI Lead event
 * 
 * Environment Variables Required:
 * - META_PIXEL_ID: Your Meta Pixel ID
 * - META_ACCESS_TOKEN: Your Meta Conversions API Access Token
 * - META_TEST_EVENT_CODE: (Optional) For testing events
 * - SES_REGION: AWS SES Region (e.g., us-east-1)
 * - ADMIN_EMAIL: Admin email address to receive submissions
 * - FROM_EMAIL: Verified sender email in SES
 */

import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import crypto from 'crypto';

const sesClient = new SESClient({ region: process.env.SES_REGION || 'us-east-1' });

export const handler = async (event) => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  // Handle OPTIONS request for CORS preflight
  const httpMethod = event.requestContext?.http?.method || event.httpMethod;
  if (httpMethod === 'OPTIONS' || httpMethod === 'options') {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: 'CORS preflight' })
    };
  }

  const headers = {
    'Content-Type': 'application/json'
  };

  try {
    // Validate required environment variables
    const adminEmail = process.env.ADMIN_EMAIL;
    const fromEmail = process.env.FROM_EMAIL;
    const pixelId = process.env.META_PIXEL_ID;
    const accessToken = process.env.META_ACCESS_TOKEN;

    if (!adminEmail || !fromEmail) {
      throw new Error('Missing required environment variables: ADMIN_EMAIL or FROM_EMAIL');
    }

    // Parse request body
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    const { name, email, phone } = body;

    // Validate required fields
    if (!name || !email || !phone) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Missing required fields: name, email, phone'
        })
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Invalid email format'
        })
      };
    }

    // Send email to admin
    const adminEmailResult = await sendAdminEmail({
      to: adminEmail,
      from: fromEmail,
      name,
      email,
      phone,
      timestamp: new Date().toISOString()
    });

    // Send confirmation email to user
    const userEmailResult = await sendUserConfirmationEmail({
      to: email,
      from: fromEmail,
      name
    });

    // Send Meta CAPI Lead event
    let metaCAPIResult = null;
    if (pixelId && accessToken) {
      try {
        metaCAPIResult = await sendMetaCAPIEvent({
          pixelId,
          accessToken,
          name,
          email,
          phone,
          userAgent: event.headers?.['user-agent'] || event.headers?.['User-Agent'] || '',
          sourceUrl: event.requestContext?.http?.sourceUrl || event.headers?.['referer'] || '',
          clientIp: event.requestContext?.http?.sourceIp || ''
        });
      } catch (metaError) {
        console.error('Meta CAPI error:', metaError);
        // Don't fail the entire request if Meta CAPI fails
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Form submitted successfully',
        emailSent: {
          admin: adminEmailResult.success,
          user: userEmailResult.success
        },
        metaCAPI: metaCAPIResult ? { sent: true } : null
      })
    };

  } catch (error) {
    console.error('Error processing form submission:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};

/**
 * Send email to admin
 */
async function sendAdminEmail({ to, from, name, email, phone, timestamp }) {
  const subject = `New Contact Form Submission - ${name}`;
  const body = `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #4F46E5;">New Contact Form Submission</h2>
        <p>You have received a new contact form submission:</p>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #f9f9f9; font-weight: bold;">Name:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #f9f9f9; font-weight: bold;">Email:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(email)}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #f9f9f9; font-weight: bold;">Phone:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(phone)}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #f9f9f9; font-weight: bold;">Submitted:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${new Date(timestamp).toLocaleString()}</td>
          </tr>
        </table>
        <p style="margin-top: 20px; color: #666;">Please follow up with this lead as soon as possible.</p>
      </body>
    </html>
  `;

  try {
    const command = new SendEmailCommand({
      Source: from,
      Destination: {
        ToAddresses: [to]
      },
      Message: {
        Subject: {
          Data: subject,
          Charset: 'UTF-8'
        },
        Body: {
          Html: {
            Data: body,
            Charset: 'UTF-8'
          }
        }
      }
    });

    const response = await sesClient.send(command);
    console.log('Admin email sent:', response.MessageId);
    return { success: true, messageId: response.MessageId };
  } catch (error) {
    console.error('Error sending admin email:', error);
    throw error;
  }
}

/**
 * Send confirmation email to user
 */
async function sendUserConfirmationEmail({ to, from, name }) {
  const subject = 'Thank You for Contacting Rich - Gift Card Trading';
  const body = `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #4F46E5;">Thank You, ${escapeHtml(name)}!</h2>
          <p>We have received your contact form submission and our team will get back to you shortly.</p>
          <p>In the meantime, feel free to:</p>
          <ul>
            <li>Visit our website to learn more about our services</li>
            <li>Contact us directly via WhatsApp for immediate assistance</li>
            <li>Check out our rates and trading options</li>
          </ul>
          <p style="margin-top: 30px;">Best regards,<br>The Rich Team</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
          <p style="color: #666; font-size: 12px;">This is an automated email. Please do not reply to this message.</p>
        </div>
      </body>
    </html>
  `;

  try {
    const command = new SendEmailCommand({
      Source: from,
      Destination: {
        ToAddresses: [to]
      },
      Message: {
        Subject: {
          Data: subject,
          Charset: 'UTF-8'
        },
        Body: {
          Html: {
            Data: body,
            Charset: 'UTF-8'
          }
        }
      }
    });

    const response = await sesClient.send(command);
    console.log('User confirmation email sent:', response.MessageId);
    return { success: true, messageId: response.MessageId };
  } catch (error) {
    console.error('Error sending user confirmation email:', error);
    throw error;
  }
}

/**
 * Send Meta CAPI Lead event
 */
async function sendMetaCAPIEvent({ pixelId, accessToken, name, email, phone, userAgent, sourceUrl, clientIp }) {
  const eventData = {
    data: [
      {
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        event_id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        event_source_url: sourceUrl || '',
        action_source: 'website',
        user_data: {
          client_ip_address: clientIp || '',
          client_user_agent: userAgent || '',
          em: hashEmail(email),
          ph: hashPhone(phone),
          external_id: hashValue(email)
        },
        custom_data: {
          content_name: 'Contact Form Submission',
          content_category: 'Lead Generation',
          currency: 'USD',
          value: 0
        }
      }
    ],
    ...(process.env.META_TEST_EVENT_CODE && { test_event_code: process.env.META_TEST_EVENT_CODE })
  };

  const response = await fetch(
    `https://graph.facebook.com/v21.0/${pixelId}/events`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...eventData,
        access_token: accessToken
      })
    }
  );

  const responseData = await response.json();

  if (!response.ok) {
    console.error('Meta API Error:', responseData);
    throw new Error(`Meta API error: ${JSON.stringify(responseData)}`);
  }

  console.log('Meta CAPI event sent:', responseData);
  return { success: true, events_received: responseData.events_received };
}

/**
 * Hash email using SHA256
 */
function hashEmail(email) {
  if (!email) return undefined;
  return crypto.createHash('sha256').update(email.toLowerCase().trim()).digest('hex');
}

/**
 * Hash phone number using SHA256
 */
function hashPhone(phone) {
  if (!phone) return undefined;
  const cleaned = phone.replace(/\D/g, '');
  return crypto.createHash('sha256').update(cleaned).digest('hex');
}

/**
 * Hash any value using SHA256
 */
function hashValue(value) {
  if (!value) return undefined;
  return crypto.createHash('sha256').update(String(value)).digest('hex');
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

