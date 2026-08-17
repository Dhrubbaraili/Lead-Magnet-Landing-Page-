'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import ConfettiCanvas from './ConfettiCanvas';

type Fields = { name: string; email: string; whatsapp: string; business: string; url: string; message: string };
const initial: Fields = { name: '', email: '', whatsapp: '', business: '', url: '', message: '' };

export default function CTAForm() {
  const [fields, setFields] = useState<Fields>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const [burstOrigin, setBurstOrigin] = useState<{ x: number; y: number }>();
  const redirectTimer = useRef<number>();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const update = (key: keyof Fields, value: string) => setFields((current) => ({ ...current, [key]: value }));
  useEffect(() => () => { if (redirectTimer.current) window.clearTimeout(redirectTimer.current); }, []);
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (submitting || success) return;
    const next: typeof errors = {};
    if (!fields.name.trim()) next.name = 'Please enter your full name.';
    if (!/^\S+@\S+\.\S+$/.test(fields.email)) next.email = 'Please enter a valid email.';
    if (!fields.whatsapp.trim()) next.whatsapp = 'Please enter your WhatsApp number.';
    if (!fields.business.trim()) next.business = 'Please enter your business name.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setSubmitting(true);
    // The existing project has no backend endpoint, so a valid local submission is its current success confirmation.
    await Promise.resolve();
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) setBurstOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    setSuccess(true);
    setConfettiTrigger((value) => value + 1);
    redirectTimer.current = window.setTimeout(() => router.push('/thank-you'), 2400);
  };
  const input = (key: keyof Fields, label: string, placeholder: string, required = false, type = 'text') => <label className="block text-sm font-semibold text-slate-700">{label}{required && <span className="text-brand-600"> *</span>}<input className="input mt-2 font-normal" type={type} value={fields[key]} onChange={(e) => update(key, e.target.value)} placeholder={placeholder} required={required} aria-invalid={!!errors[key]} />{errors[key] && <span className="mt-1 block text-xs font-normal text-red-600">{errors[key]}</span>}</label>;
  return <form onSubmit={submit} noValidate className="relative space-y-5 rounded-[2rem] bg-white p-5 shadow-soft sm:p-8"><ConfettiCanvas trigger={confettiTrigger} duration={2400} zIndex={20} origin={burstOrigin} />
    {input('name', 'Full Name', 'Your full name', true)}
    {input('email', 'Active Email', 'you@example.com', true, 'email')}
    {input('whatsapp', 'WhatsApp Number', 'Your WhatsApp number', true, 'tel')}
    {input('business', 'Business Name', 'Your business name', true)}
    {input('url', 'Website or Facebook URL', 'https://...', false, 'url')}
    <label className="block text-sm font-semibold text-slate-700">Anything You Want to Say<textarea className="input mt-2 min-h-32 resize-y font-normal" value={fields.message} onChange={(e) => update('message', e.target.value)} placeholder="Tell us a little about your business" /></label>
    {success && <p className="text-center text-base font-bold text-brand-700" role="status" aria-live="polite">Booking Successful!</p>}
    <button ref={buttonRef} type="submit" disabled={submitting || success} className="min-h-14 w-full rounded-full bg-brand-600 px-6 text-base font-bold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70 focus:outline-none focus:ring-4 focus:ring-brand-500/30">{success ? 'Booking Successful!' : submitting ? 'Submitting…' : 'Book Free Consultation'}</button>
    <p className="text-center text-xs text-slate-500">We respect your privacy. No spam.</p>
  </form>;
}
