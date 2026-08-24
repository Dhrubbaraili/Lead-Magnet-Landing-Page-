import Image from 'next/image';
import Link from 'next/link';
import WhatsAppButton from './WhatsAppButton';

export default function Footer() {
  return <footer className="site-footer"><div className="footer-inner"><div className="footer-brand"><Image className="footer-logo" src="/assets/db-logo.png" alt="Dhrub Baraili — AI Digital Marketing Consultant" width={1268} height={251} /><div><p className="font-bold">Dhrub Kumar Baraili</p><p className="text-sm text-muted">AI Digital Marketing Consultant</p></div></div><div className="footer-contact"><WhatsAppButton label="WhatsApp: +977 9747533326" /><Link href="/privacy-policy" className="footer-link">Privacy Policy</Link><p className="text-xs text-muted">© {new Date().getFullYear()} Dhrub Kumar Baraili. All rights reserved.</p></div></div></footer>;
}
