export default function CTAButton({ children = 'Book Free Consultation' }: { children?: React.ReactNode }) {
  return <a href="#booking" className="inline-flex min-h-14 items-center justify-center rounded-full bg-brand-600 px-8 text-center text-base font-bold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-500/30">{children}</a>;
}
