/**
 * Meta Conversions API (CAPI) Client
 * 
 * This utility sends server-side events to Meta via AWS Lambda
 */

interface MetaEventData {
  eventName: string;
  eventId?: string;
  userData?: {
    em?: string; // Email (will be hashed)
    ph?: string; // Phone (will be hashed)
    fbp?: string; // Facebook browser ID from _fbp cookie
    fbc?: string; // Facebook click ID from _fbc parameter
    client_ip_address?: string;
    client_user_agent?: string;
    source_url?: string;
    external_id?: string;
  };
  customData?: {
    currency?: string;
    value?: number;
    content_name?: string;
    content_category?: string;
    [key: string]: string | number | boolean | undefined;
  };
  eventTime?: number;
}

// Get Lambda endpoint URL from environment variable or use default
const LAMBDA_ENDPOINT = import.meta.env.VITE_META_CAPI_LAMBDA_URL || '';

/**
 * Get Facebook Pixel ID from cookie (_fbp)
 */
function getFbp(): string {
  const match = document.cookie.match(/_fbp=([^;]+)/);
  return match ? match[1] : '';
}

/**
 * Get Facebook Click ID from cookie (_fbc)
 */
function getFbc(): string {
  const match = document.cookie.match(/_fbc=([^;]+)/);
  return match ? match[1] : '';
}

/**
 * Send event to Meta Conversions API via AWS Lambda
 */
export async function sendMetaCAPIEvent(data: MetaEventData): Promise<boolean> {
  if (!LAMBDA_ENDPOINT) {
    console.warn('Meta CAPI Lambda endpoint not configured. Set VITE_META_CAPI_LAMBDA_URL environment variable.');
    return false;
  }

  try {
    const payload = {
      ...data,
      userData: {
        ...data.userData,
        fbp: data.userData?.fbp || getFbp(),
        fbc: data.userData?.fbc || getFbc(),
        client_user_agent: data.userData?.client_user_agent || navigator.userAgent,
        source_url: data.userData?.source_url || window.location.href,
      },
      eventTime: data.eventTime || Math.floor(Date.now() / 1000),
      eventId: data.eventId || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };

    const response = await fetch(LAMBDA_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Meta CAPI Error:', errorData);
      return false;
    }

    const result = await response.json();
    console.log('Meta CAPI Success:', result);
    return result.success || false;

  } catch (error) {
    console.error('Failed to send Meta CAPI event:', error);
    return false;
  }
}

/**
 * Common event tracking functions
 */

export const MetaEvents = {
  /**
   * Track WhatsApp button click - Contact event
   * 这是唯一需要追踪的转化事件：用户点击 WhatsApp 按钮跳转联系
   */
  whatsAppClick: (customData?: MetaEventData['customData']) => {
    return sendMetaCAPIEvent({
      eventName: 'Contact',
      customData: {
        content_name: 'WhatsApp Contact',
        content_category: 'Social Media',
        content_type: 'WhatsApp',
        ...customData,
      },
    });
  },
};

