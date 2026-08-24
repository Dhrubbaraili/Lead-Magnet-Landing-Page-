export default function CTAButton({ children = 'Book Free Consultation' }: { children?: React.ReactNode }) {
  return <a href="#booking" className="primary-cta">{children}</a>;
}
