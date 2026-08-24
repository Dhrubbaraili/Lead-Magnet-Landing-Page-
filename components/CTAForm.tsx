'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import ConfettiCanvas from './ConfettiCanvas';

type Fields = { name: string; email: string; whatsapp: string; business: string; url: string; message: string };
type FieldKey = keyof Fields;
const initial: Fields = { name: '', email: '', whatsapp: '', business: '', url: '', message: '' };

export default function CTAForm() {
  const [fields, setFields] = useState<Fields>(initial);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const [burstOrigin, setBurstOrigin] = useState<{ x: number; y: number }>();
  const redirectTimer = useRef<number>();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const fieldRefs = useRef<Partial<Record<FieldKey, HTMLInputElement | HTMLTextAreaElement>>>({});
  const router = useRouter();

  useEffect(() => () => { if (redirectTimer.current) window.clearTimeout(redirectTimer.current); }, []);
  const update = (key: FieldKey, value: string) => setFields((current) => ({ ...current, [key]: value }));
  const validate = (current: Fields) => {
    const next: Partial<Record<FieldKey, string>> = {};
    if (!current.name.trim()) next.name = 'Please enter your full name.';
    if (!/^\S+@\S+\.\S+$/.test(current.email)) next.email = 'Please enter a valid email address.';
    const phone = current.whatsapp.replace(/\D/g, '');
    if (phone.length < 7 || phone.length > 12) next.whatsapp = 'Please enter a valid WhatsApp number.';
    if (!current.business.trim()) next.business = 'Please enter your business or industry.';
    return next;
  };
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (submitting || success) return;
    setSubmitted(true);
    const next = validate(fields);
    setErrors(next);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0] as FieldKey;
      window.requestAnimationFrame(() => fieldRefs.current[first]?.focus());
      return;
    }
    setSubmitting(true);
    // Existing project has no API route; retain its current local-success redirect behavior.
    await Promise.resolve();
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) setBurstOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    setSuccess(true);
    setConfettiTrigger((value) => value + 1);
    redirectTimer.current = window.setTimeout(() => router.push('/thank-you'), 2400);
  };
  const showError = (key: FieldKey) => (submitted || touched[key]) && errors[key];
  const input = (key: FieldKey, label: string, placeholder: string, options: { required?: boolean; type?: string; autoComplete?: string } = {}) => {
    const errorId = `${key}-error`;
    return <label className="form-label" htmlFor={key}>{label}{options.required && <span className="required-mark"> *</span>}<input id={key} name={key} ref={(element) => { if (element) fieldRefs.current[key] = element; }} className="input" type={options.type ?? 'text'} value={fields[key]} onChange={(event) => update(key, event.target.value)} onBlur={() => setTouched((current) => ({ ...current, [key]: true }))} placeholder={placeholder} required={options.required} autoComplete={options.autoComplete} aria-invalid={!!showError(key)} aria-describedby={showError(key) ? errorId : undefined} />{showError(key) && <span id={errorId} className="field-error" role="alert">{errors[key]}</span>}</label>;
  };
  return <form onSubmit={submit} noValidate className="glass-card form-card"><ConfettiCanvas trigger={confettiTrigger} duration={2400} zIndex={20} origin={burstOrigin} />
    {submitted && Object.keys(errors).length > 0 && <div className="error-summary" role="alert" tabIndex={-1}>Please review the highlighted fields before continuing.</div>}
    {input('name', 'Full Name', 'Your full name', { required: true, autoComplete: 'name' })}
    {input('email', 'Email Address', 'you@example.com', { required: true, type: 'email', autoComplete: 'email' })}
    <label className="form-label" htmlFor="whatsapp">WhatsApp Number<span className="required-mark"> *</span><div className="phone-field"><span className="country-prefix">+977</span><input id="whatsapp" name="whatsapp" ref={(element) => { if (element) fieldRefs.current.whatsapp = element; }} className="input phone-input" type="tel" value={fields.whatsapp} onChange={(event) => update('whatsapp', event.target.value.replace(/[^\d\s-]/g, ''))} onBlur={() => setTouched((current) => ({ ...current, whatsapp: true }))} placeholder="9747533326" required autoComplete="tel-national" inputMode="tel" aria-invalid={!!showError('whatsapp')} aria-describedby={showError('whatsapp') ? 'whatsapp-error' : undefined} /></div>{showError('whatsapp') && <span id="whatsapp-error" className="field-error" role="alert">{errors.whatsapp}</span>}</label>
    {input('business', 'Business Name or Industry', 'Your business or industry', { required: true, autoComplete: 'organization' })}
    {input('url', 'Website or Facebook URL', 'https://...', { type: 'url', autoComplete: 'url' })}
    <label className="form-label" htmlFor="message">What is your biggest marketing challenge?<textarea id="message" name="message" ref={(element) => { if (element) fieldRefs.current.message = element; }} className="input textarea" value={fields.message} onChange={(event) => update('message', event.target.value)} onBlur={() => setTouched((current) => ({ ...current, message: true }))} placeholder="Tell us what you are working through" autoComplete="off" /></label>
    {success && <p className="success-message" role="status" aria-live="polite">Request received — thank you!</p>}
    <button ref={buttonRef} type="submit" disabled={submitting || success} className="primary-cta form-submit">{success ? 'Request Received' : submitting ? 'Submitting...' : 'Book Free Consultation'}</button>
    <p className="privacy-note">By submitting this form, you agree to be contacted regarding your consultation request. Your information will not be sold or shared.</p>
    <p className="privacy-note">We respect your privacy. No spam. <a href="/privacy-policy" className="inline-link">Read our Privacy Policy.</a></p>
  </form>;
}
