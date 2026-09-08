'use client';

import { useEffect } from 'react';
import { trackMetaEvent } from './MetaPixel';

const formRootSelector = '.ff-6a9e5ee164dec594259381d7[data-ff-el="root"]';

export default function FlodeskLeadTracker() {
  useEffect(() => {
    const formRoot = document.querySelector<HTMLElement>(formRootSelector);
    if (!formRoot) return;

    const trackSuccessfulSubmission = () => {
      if (formRoot.dataset.ffStage !== 'success' || formRoot.dataset.metaPixelLeadTracked === 'true') return;

      formRoot.dataset.metaPixelLeadTracked = 'true';
      trackMetaEvent('Lead');
    };

    trackSuccessfulSubmission();
    const observer = new MutationObserver(trackSuccessfulSubmission);
    observer.observe(formRoot, { attributes: true, attributeFilter: ['data-ff-stage'] });

    return () => observer.disconnect();
  }, []);

  return null;
}
