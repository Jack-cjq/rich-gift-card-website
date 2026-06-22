export const WHATSAPP_DISPLAY = '+852 9389 8414';
export const WHATSAPP_PHONE = '85293898414';

const WHATSAPP_MESSAGE = `Hi, I'm interested in trading gift cards on Rich! Contact: ${WHATSAPP_DISPLAY}`;

export const WHATSAPP_URL = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export const openWhatsApp = () => {
  window.open(WHATSAPP_URL, '_blank');
};
