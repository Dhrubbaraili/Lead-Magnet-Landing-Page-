import CTAButton from '@/components/CTAButton';
import CTAForm from '@/components/CTAForm';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import WhatsAppButton from '@/components/WhatsAppButton';

const benefits = ['Identify your biggest marketing challenge', 'Discover which digital channels fit your business', 'Get clear and practical marketing recommendations', 'Know what actions to take first', 'Leave with a customized marketing plan'];
const steps = [['01', 'Tell Me About Your Business', 'Share your business information and biggest marketing challenge.'], ['02', 'Schedule Your Consultation', 'Choose a suitable time or submit your consultation request.'], ['03', 'Get Your Customized Plan', 'Receive clear and practical marketing recommendations for your business.']];
const trust = ['Free consultation', 'No obligation', 'Practical recommendations', 'Your information stays private'];

export default function Home() {
  return <main><Header /><section className="hero-section"><div className="hero-inner"><p className="eyebrow">Free AI marketing consultation</p><h1 className="hero-title">Get a <span className="red-emphasis">Free</span> <span className="green-emphasis">customized</span> digital marketing plan for your business.</h1><p className="hero-copy">In a free one-to-one consultation, we’ll review your current marketing, identify your biggest challenge, and outline practical next steps using digital marketing and AI.</p><CTAButton /></div></section>
    <section className="section-shell" aria-labelledby="benefits-heading"><div className="section-inner"><p className="eyebrow">A clearer next step</p><h2 id="benefits-heading" className="section-title">What You’ll Get From the Free Consultation</h2><div className="card-grid benefits-grid">{benefits.map((benefit) => <article key={benefit} className="glass-card benefit-card"><span className="check-icon">✓</span><p>{benefit}</p></article>)}</div></div></section>
    <section className="section-shell alt-section" aria-labelledby="trust-heading"><div className="section-inner"><p className="eyebrow">A conversation built around you</p><h2 id="trust-heading" className="section-title">Practical, personal, and focused.</h2><p className="section-lede">A practical, one-to-one conversation focused on your business—not a generic marketing presentation.</p><div className="card-grid trust-grid">{trust.map((item) => <div className="glass-card trust-card" key={item}><span className="trust-dot" aria-hidden="true">✓</span><span>{item}</span></div>)}</div></div></section>
    <section className="section-shell" aria-labelledby="process-heading"><div className="section-inner"><p className="eyebrow">Simple and clear</p><h2 id="process-heading" className="section-title">How the consultation works</h2><div className="card-grid process-grid">{steps.map(([number, title, body]) => <article key={number} className="glass-card process-card"><span className="step-number">{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
    <FAQ />
    <section className="section-shell booking-section" id="booking" aria-labelledby="booking-heading"><div className="section-inner booking-grid"><div className="consultation-info"><p className="eyebrow">Request your consultation</p><h2 id="booking-heading" className="section-title">Let’s make your next step clearer.</h2><p className="section-lede">Share a few details about your business and we’ll use them to prepare for a focused conversation.</p><div className="glass-card consultation-card"><p className="card-kicker">One-to-one consultation</p><h3>Customized Strategy for Your Business</h3><p>Free, practical, and focused on the marketing challenge you are facing right now.</p><WhatsAppButton label="Ask a question on WhatsApp" /></div></div><CTAForm /></div></section>
    <Footer />
  </main>;
}
