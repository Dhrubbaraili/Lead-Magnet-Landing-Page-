'use client';

import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import ConfettiCanvas from './ConfettiCanvas';

const welcomeSessionKey = 'ai-marketing-dhrub-welcome-seen';
let welcomeClaimedInRuntime = false;

export default function WelcomeIntro() {
  const [visible, setVisible] = useState(false);
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const closing = useRef(false);

  useEffect(() => {
    if (welcomeClaimedInRuntime) return;
    try {
      if (window.sessionStorage.getItem(welcomeSessionKey)) {
        welcomeClaimedInRuntime = true;
        return;
      }
      window.sessionStorage.setItem(welcomeSessionKey, 'true');
    } catch {
      // Keep the in-memory guard active if storage is unavailable.
    }
    welcomeClaimedInRuntime = true;
    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), 4000);
    return () => window.clearTimeout(timer);
  }, []);

  const activate = () => {
    if (closing.current) return;
    closing.current = true;
    setConfettiTrigger((value) => value + 1);
    window.setTimeout(() => setVisible(false), 1800);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); activate(); }
  };
  if (!visible) return null;
  return <div className="welcome-intro" onClick={(event) => { if (event.target === event.currentTarget) activate(); }}><ConfettiCanvas trigger={confettiTrigger} duration={1900} zIndex={60} sideBursts={false} /><div className="welcome-content"><button type="button" className="welcome-word" onClick={activate} onKeyDown={onKeyDown} aria-label="Welcome — click to continue">WELCOME</button><p className="welcome-instruction"><span className="click-icon" aria-hidden="true">☝</span>Click once to explore</p></div></div>;
}
