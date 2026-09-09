'use client';

import { useEffect } from 'react';
import { trackMetaEvent } from './MetaPixel';

const formContainerId = 'fd-form-6a9e5ee164dec594259381d7';

export default function FlodeskLeadTracker() {
  useEffect(() => {
    const trackSuccessfulSubmission = () => {
      const formRoot = document.querySelector<HTMLElement>(`#${formContainerId} [data-ff-el="root"]`);
      if (!formRoot) return;
      if (formRoot.dataset.ffStage !== 'success' || formRoot.dataset.metaPixelLeadTracked === 'true') return;

      formRoot.dataset.metaPixelLeadTracked = 'true';
      trackMetaEvent('Lead');
    };

    trackSuccessfulSubmission();
    const container = document.getElementById(formContainerId);
    if (!container) return;

    const observer = new MutationObserver(trackSuccessfulSubmission);
    observer.observe(container, { attributes: true, attributeFilter: ['data-ff-stage'], childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
}
