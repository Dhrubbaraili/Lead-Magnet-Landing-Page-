import Image from 'next/image';

export default function Header() {
  return <header className="relative z-10 flex justify-center px-6 py-4"><Image src="/logo.png" alt="Dhrub Baraili AI Marketing" width={150} height={265} priority className="h-auto w-16 object-contain sm:w-20" /></header>;
}
