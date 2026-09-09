import FlodeskLeadTracker from './FlodeskLeadTracker';
import FlodeskForm from './FlodeskForm';

export default function CTAForm() {
  return <div className="glass-card form-card flodesk-card" data-flodesk-embed="native" data-form-version="flodesk-v2"><div className="flodesk-embed"><FlodeskForm /></div><FlodeskLeadTracker /></div>;
}
