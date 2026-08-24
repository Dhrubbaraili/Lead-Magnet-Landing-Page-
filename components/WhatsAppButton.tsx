import WhatsAppIcon from './WhatsAppIcon';

export const whatsappHref = 'https://wa.me/9779747533326?text=Hello%20Dhrub%2C%20I%E2%80%99m%20interested%20in%20the%20free%20AI%20marketing%20consultation.%20I%20would%20like%20to%20know%20more.';

export default function WhatsAppButton({ label = 'Chat on WhatsApp', className = '' }: { label?: string; className?: string }) {
  return <a href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label={`${label} at +977 9747533326`} className={`whatsapp-button ${className}`}><WhatsAppIcon /><span>{label}</span></a>;
}
