/* eslint-disable @next/next/no-img-element */

import type { Metadata } from 'next';
import './globals.css';
import BackgroundBubbles from '@/components/BackgroundBubbles';
import MetaPixel from '@/components/MetaPixel';
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
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return <html lang="en"><body><MetaPixel />{metaPixelId ? <noscript><img height="1" width="1" style={{ display: 'none' }} src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`} alt="" /></noscript> : null}<BackgroundBubbles /><MouseGlow /><WelcomeIntro />{children}<WhatsAppFloating /></body></html>;
}
