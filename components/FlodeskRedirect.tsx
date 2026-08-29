'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    FlodeskObject?: string;
    fd?: ((...args: unknown[]) => void) & { q?: unknown[] };
  }
}

const rootSelector = '[data-ff-el="root"].ff-6a8fe0b05ff63f1b24bf80dc';
type FlodeskQueue = ((...args: unknown[]) => void) & { q?: unknown[] };

export default function FlodeskRedirect() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(rootSelector);
    if (!root) return;

    const submitLabel = root.querySelector<HTMLElement>('[data-ff-el="submit"] [data-draw-element="editable"]');
    if (submitLabel) submitLabel.textContent = 'Get My Free Marketing Plan →';

    window.FlodeskObject = 'fd';
    const queue = ((...args: unknown[]) => {
      queue.q = queue.q ?? [];
      queue.q.push(args);
    }) as FlodeskQueue;
    window.fd = window.fd ?? queue;

    const load = (src: string, type?: string) => {
      const script = document.createElement('script');
      script.async = true;
      if (type) script.type = type;
      script.src = `${src}?v=${Math.floor(Date.now() / 120000) * 60}`;
      document.head.appendChild(script);
      return script;
    };

    const moduleScript = load('https://assets.flodesk.com/universal.mjs', 'module');
    const legacyScript = load('https://assets.flodesk.com/universal.js');
    window.fd?.('form:handle', { formId: '6a8fe0b05ff63f1b24bf80dc', rootEl: '.ff-6a8fe0b05ff63f1b24bf80dc' });

    let redirectTimer: number | undefined;
    let redirected = false;
    const redirectAfterSuccess = () => {
      if (redirected) return;
      redirected = true;
      redirectTimer = window.setTimeout(() => window.location.assign('/thank-you'), 1800);
    };
    const observer = new MutationObserver(() => {
      if (root.getAttribute('data-ff-stage') === 'success') redirectAfterSuccess();
    });
    observer.observe(root, { attributes: true, attributeFilter: ['data-ff-stage'] });

    return () => {
      observer.disconnect();
      if (redirectTimer) window.clearTimeout(redirectTimer);
      moduleScript.remove();
      legacyScript.remove();
    };
  }, []);

  return null;
}
