/**
 * AWS Lambda function for Meta Conversions API (CAPI)
 * 
 * This function receives events from your frontend and forwards them to Meta's Conversions API
 * 
 * Environment Variables Required:
 * - META_PIXEL_ID: Your Meta Pixel ID
 * - META_ACCESS_TOKEN: Your Meta Conversions API Access Token
 * - META_TEST_EVENT_CODE: (Optional) For testing events
 * 
 * Note: This code supports both CommonJS and ES modules
 */

import crypto from 'crypto';

export const handler = async (event) => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  // Detect if this is Lambda Function URL or API Gateway
  const isLambdaUrl = event.requestContext && event.requestContext.http;
  const httpMethod = isLambdaUrl ? event.requestContext.http.method : (event.httpMethod || event.requestContext?.http?.method);
  const requestHeaders = isLambdaUrl ? event.headers : event.headers || {};
  
  // Handle OPTIONS request for CORS preflight
  // Lambda Function URL CORS handles this automatically if configured in Console
  // If CORS is configured in Lambda Function URL, it will add headers automatically
  // So we just return empty response for OPTIONS
  if (httpMethod === 'OPTIONS' || httpMethod === 'options') {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: 'CORS preflight' })
    };
  }

  // Standard response headers
  // Don't set CORS headers here if Lambda Function URL CORS is configured
  // Lambda Function URL will add CORS headers automatically
  const headers = {
    'Content-Type': 'application/json'
  };

  try {
    // Validate required environment variables
    const pixelId = process.env.META_PIXEL_ID;
    const accessToken = process.env.META_ACCESS_TOKEN;
    const testEventCode = process.env.META_TEST_EVENT_CODE;

    if (!pixelId || !accessToken) {
      throw new Error('Missing required environment variables: META_PIXEL_ID or META_ACCESS_TOKEN');
    }

    // Parse request body - handle both Lambda Function URL and API Gateway formats
    let body;
    if (isLambdaUrl) {
      // Lambda Function URL: body is already parsed or is a string
      body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    } else {
      // API Gateway: body is always a string
      body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    }
    const { eventName, eventId, userData, customData, eventTime } = body;

    // Validate required fields
    if (!eventName) {
      throw new Error('Missing required field: eventName');
    }

    // Prepare event data for Meta Conversions API
    const eventData = {
      data: [
        {
          event_name: eventName,
          event_time: eventTime || Math.floor(Date.now() / 1000),
          event_id: eventId || generateEventId(),
          event_source_url: userData?.source_url || '',
          action_source: 'website',
          user_data: {
            client_ip_address: userData?.client_ip_address || 
              (isLambdaUrl ? event.requestContext?.http?.sourceIp : event.requestContext?.identity?.sourceIp) || '',
            client_user_agent: userData?.client_user_agent || 
              requestHeaders['user-agent'] || 
              requestHeaders['User-Agent'] || '',
            fbp: userData?.fbp || '', // Facebook browser ID
            fbc: userData?.fbc || '', // Facebook click ID
            em: userData?.em ? hashEmail(userData.em) : undefined, // Hashed email
            ph: userData?.ph ? hashPhone(userData.ph) : undefined, // Hashed phone
            external_id: userData?.external_id ? hashValue(userData.external_id) : undefined
          },
          custom_data: customData || {}
        }
      ],
      ...(testEventCode && { test_event_code: testEventCode })
    };

    // Send event to Meta Conversions API
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

    console.log('Successfully sent event to Meta:', responseData);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        events_received: responseData.events_received,
        messages: responseData.messages
      })
    };

  } catch (error) {
    console.error('Error processing event:', error);
    
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
 * Generate a unique event ID
 */
function generateEventId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
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
  // Remove all non-digit characters
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

