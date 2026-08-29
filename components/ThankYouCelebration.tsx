'use client';

import { useEffect, useState } from 'react';
import ConfettiCanvas from './ConfettiCanvas';

export default function ThankYouCelebration() {
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    setTrigger(1);
  }, []);

  return <ConfettiCanvas trigger={trigger} duration={5200} zIndex={100} />;
}
