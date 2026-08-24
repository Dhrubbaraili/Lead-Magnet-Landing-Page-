import type { Metadata } from 'next';
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
  return <html lang="en"><body><BackgroundBubbles /><MouseGlow /><WelcomeIntro />{children}<WhatsAppFloating /></body></html>;
}
