'use client';

import { useState } from 'react';

const questions = [
  ['Is the consultation really free?', 'Yes. This is a free AI marketing consultation call.'],
  ['How long will the consultation take?', 'TODO: Please confirm the exact consultation duration before publishing this answer.'],
  ['What will I receive after the consultation?', 'You will receive clear, practical marketing recommendations and a customized marketing plan for your business.'],
  ['Is this suitable for my type of business?', 'TODO: Please confirm which business types this consultation is suitable for before publishing a specific answer.'],
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return <section className="section-shell" aria-labelledby="faq-heading"><div className="section-inner max-w-4xl"><p className="eyebrow">Questions, answered clearly</p><h2 id="faq-heading" className="section-title">Before you request your consultation</h2><div className="mt-8 space-y-3">{questions.map(([question, answer], index) => { const expanded = open === index; const answerId = `faq-answer-${index}`; return <div key={question} className="glass-card overflow-hidden"><button type="button" aria-expanded={expanded} aria-controls={answerId} onClick={() => setOpen(expanded ? null : index)} className="faq-trigger"><span>{question}</span><span className={`faq-plus ${expanded ? 'rotate-45' : ''}`}>+</span></button><div id={answerId} role="region" aria-hidden={!expanded} className={`faq-answer ${expanded ? 'faq-answer-open' : ''}`}><p>{answer}</p></div></div>; })}</div></div></section>;
}
