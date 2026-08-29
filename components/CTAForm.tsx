import { readFileSync } from 'node:fs';
import path from 'node:path';
import FlodeskRedirect from './FlodeskRedirect';

const redirectConfig = 'eyJ0cmlnZ2VyIjp7Im1vZGUiOiJpbW1lZGlhdGVseSIsInZhbHVlIjowfSwib25TdWNjZXNzIjp7Im1vZGUiOiJtZXNzYWdlIiwibWVzc2FnZSI6IiIsInJlZGlyZWN0VXJsIjoiL3RoYW5rLXlvdSJ9LCJjb2kiOmZhbHNlLCJzaG93Rm9yUmV0dXJuVmlzaXRvcnMiOnRydWUsIm5vdGlmaWNhdGlvbiI6ZmFsc2UsImdkcHIiOnsiYWNjZXB0c01hcmtldGluZyI6ZmFsc2UsInByaXZhY3lQb2xpY3kiOnsiZW5hYmxlZCI6ZmFsc2UsIm1hbmRhdG9yeSI6ZmFsc2V9fSwidHJhY2tpbmdDb25maWciOnsibWV0YVBpeGVsSWQiOiIiLCJjb29raWVCYW5uZXJFbmFibGVkIjpmYWxzZSwiZ29vZ2xlQW5hbHl0aWNzSWQiOiIifX0=';

export default function CTAForm() {
  const embedPath = path.join(process.cwd(), 'components', 'flodesk-embed.html');
  const source = readFileSync(embedPath, 'utf8');
  const embed = source
    .replace(/data-ff-config="[^"]+"/, `data-ff-config="${redirectConfig}"`)
    .replace('Book a call with me&gt;', 'Get My Free Marketing Plan →');
  return <div className="glass-card form-card flodesk-card" data-flodesk-embed="native" data-form-version="flodesk-v2"><div className="flodesk-embed" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: embed }} /><FlodeskRedirect /></div>;
}
