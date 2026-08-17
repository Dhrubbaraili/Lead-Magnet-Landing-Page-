import type { Metadata } from 'next';
import './globals.css';
import BackgroundBubbles from '@/components/BackgroundBubbles';
import MouseGlow from '@/components/MouseGlow';
import WelcomeIntro from '@/components/WelcomeIntro';

export const metadata: Metadata = {
  title: 'AI Marketing Dhrub | Free AI Marketing Consultation',
  description: 'Get a customized digital marketing plan for your business through a free AI marketing consultation call.',
  openGraph: { title: 'AI Marketing Dhrub | Free AI Marketing Consultation', description: 'Get a customized digital marketing plan for your business.', type: 'website' }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><BackgroundBubbles /><MouseGlow /><WelcomeIntro />{children}</body></html>;
}
