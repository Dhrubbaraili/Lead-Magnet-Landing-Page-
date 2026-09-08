'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

type MetaPixelCommand = 'init' | 'track';
type MetaPixelFunction = ((...args: [MetaPixelCommand, string]) => void) & {
  callMethod?: (...args: [MetaPixelCommand, string]) => void;
  queue: Array<[MetaPixelCommand, string]>;
  push: MetaPixelFunction;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: MetaPixelFunction;
    _fbq?: Window['fbq'];
    __metaPixelInitializedIds?: string[];
    __metaPixelLastPageView?: string;
  }
}

const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const librarySelector = 'script[data-meta-pixel-library]';

function ensurePixelIsReady(id: string) {
  if (!window.fbq) {
    const fbq = ((...args: [MetaPixelCommand, string]) => {
      if (fbq.callMethod) {
        fbq.callMethod(...args);
      } else {
        fbq.queue.push(args);
      }
    }) as MetaPixelFunction;
    fbq.queue = [];
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    window.fbq = fbq;
    window._fbq = fbq;
  }

  const initializedIds = window.__metaPixelInitializedIds ?? [];
  if (!initializedIds.includes(id)) {
    window.fbq('init', id);
    window.__metaPixelInitializedIds = [...initializedIds, id];
  }

  if (!document.querySelector(librarySelector)) {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    script.dataset.metaPixelLibrary = 'true';
    document.head.appendChild(script);
  }
}

export function trackMetaEvent(eventName: 'PageView' | 'Lead') {
  if (!pixelId || typeof window === 'undefined') return;
  ensurePixelIsReady(pixelId);
  window.fbq?.('track', eventName);
}

export default function MetaPixel() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pixelId) return;

    ensurePixelIsReady(pixelId);
  }, []);

  useEffect(() => {
    if (!pixelId || window.__metaPixelLastPageView === pathname) return;

    window.__metaPixelLastPageView = pathname;
    trackMetaEvent('PageView');
  }, [pathname]);

  return null;
}
