'use client';

import { useEffect } from 'react';

const formId = '6a9e5ee164dec594259381d7';
const containerId = `fd-form-${formId}`;
type FlodeskQueue = ((...args: unknown[]) => void) & { q?: unknown[][] };

declare global {
  interface Window {
    fd?: ((command: 'form', options: { formId: string; containerEl: string }) => void) & { q?: unknown[][] };
    FlodeskObject?: string;
  }
}

export default function FlodeskForm() {
  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container || container.dataset.flodeskInitialized === 'true') return;

    const initializeForm = () => {
      if (container.dataset.flodeskInitialized === 'true' || !window.fd) return;

      window.fd('form', { formId, containerEl: `#${containerId}` });
      container.dataset.flodeskInitialized = 'true';
    };

    const existingScript = document.querySelector<HTMLScriptElement>('script[data-flodesk-universal]');
    if (existingScript) {
      initializeForm();
      return;
    }

    window.FlodeskObject = 'fd';
    const fdQueue = ((...args: unknown[]) => {
      fdQueue.q = fdQueue.q ?? [];
      fdQueue.q.push(args);
    }) as FlodeskQueue;
    window.fd = window.fd ?? fdQueue;

    const version = `?v=${Math.floor(Date.now() / (120 * 1000)) * 60}`;
    const moduleScript = document.createElement('script');
    moduleScript.async = true;
    moduleScript.type = 'module';
    moduleScript.src = `https://assets.flodesk.com/universal.mjs${version}`;
    moduleScript.dataset.flodeskUniversal = 'true';
    moduleScript.addEventListener('load', initializeForm, { once: true });
    document.head.appendChild(moduleScript);

    const fallbackScript = document.createElement('script');
    fallbackScript.async = true;
    fallbackScript.noModule = true;
    fallbackScript.src = `https://assets.flodesk.com/universal.js${version}`;
    fallbackScript.dataset.flodeskUniversalFallback = 'true';
    fallbackScript.addEventListener('load', initializeForm, { once: true });
    document.head.appendChild(fallbackScript);

    return () => {
      moduleScript.removeEventListener('load', initializeForm);
      fallbackScript.removeEventListener('load', initializeForm);
    };
  }, []);

  return <div id={containerId} />;
}
