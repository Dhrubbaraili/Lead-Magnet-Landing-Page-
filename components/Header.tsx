import Image from 'next/image';

export default function Header() {
  return <header className="site-header"><Image className="header-logo" src="/assets/db-logo.png" alt="Dhrub Baraili — AI Digital Marketing Consultant" width={1268} height={251} priority /></header>;
}
