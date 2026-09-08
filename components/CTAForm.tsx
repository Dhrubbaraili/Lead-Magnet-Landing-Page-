import { readFileSync } from 'node:fs';
import path from 'node:path';
import FlodeskLeadTracker from './FlodeskLeadTracker';

export default function CTAForm() {
  const embedPath = path.join(process.cwd(), 'components', 'flodesk-embed.html');
  const source = readFileSync(embedPath, 'utf8');
  const embed = source.replace('Book a call with me&nbsp;', 'Get My Free Marketing Plan →');
  return <div className="glass-card form-card flodesk-card" data-flodesk-embed="native" data-form-version="flodesk-v2"><div className="flodesk-embed" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: embed }} /><FlodeskLeadTracker /></div>;
}
