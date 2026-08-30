/* eslint-disable @next/next/no-img-element */

import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import BackgroundBubbles from '@/components/BackgroundBubbles';
import MouseGlow from '@/components/MouseGlow';
import WelcomeIntro from '@/components/WelcomeIntro';
import WhatsAppFloating from '@/components/WhatsAppFloating';

export const metadata: Metadata = {
  metadataBase: new URL('https://appointment.dhrubbaraili.com.np/'),
  title: 'Dhrub Baraili | Free AI Marketing Consultation',
  description: 'Request a free one-to-one AI marketing consultation and get a customized digital marketing plan for your business.',
  alternates: { canonical: 'https://appointment.dhrubbaraili.com.np/' },
  icons: { icon: '/icon.png' },
  openGraph: { title: 'Dhrub Baraili | Free AI Marketing Consultation', description: 'Request a free one-to-one AI marketing consultation and get a customized digital marketing plan for your business.', url: 'https://appointment.dhrubbaraili.com.np/', siteName: 'Dhrub Baraili AI Digital Marketing', images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Dhrub Baraili AI Digital Marketing Consultant' }], type: 'website' },
  twitter: { card: 'summary_large_image', title: 'Dhrub Baraili | Free AI Marketing Consultation', description: 'Request a free one-to-one AI marketing consultation and get a customized digital marketing plan for your business.', images: ['/og-image.svg'] }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Script id="meta-pixel" strategy="afterInteractive">{`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1691047835309433');
fbq('track', 'PageView');`}</Script><noscript><img height="1" width="1" style={{ display: 'none' }} src="https://www.facebook.com/tr?id=1691047835309433&ev=PageView&noscript=1" alt="" /></noscript><BackgroundBubbles /><MouseGlow /><WelcomeIntro />{children}<WhatsAppFloating /></body></html>;
}
