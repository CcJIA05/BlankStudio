import { ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import LogoImage from '../LogoImage/LogoImage';
import logoFull from '../../assets/logo-full.webp';

const footerLinks = [
  { name: 'Work', path: '/portfolio' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Contact', path: '/contact' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-10 px-6 md:px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-end gap-2">
          <div className="w-7 h-7 overflow-hidden flex items-center justify-center">
            <LogoImage
              src={logoFull}
              alt=""
              className="w-full"
              style={{ transform: 'translateY(35%) scale(1.7)' }}
            />
          </div>
          <span className="text-[14px] font-semibold" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            <span className="text-white font-bold">BLANK</span>
            <span className="text-primary font-medium" style={{ letterSpacing: '0.15em' }}>STUDIO</span>
          </span>
          <span className="text-[14px] text-zinc-500 ml-4">© 2025 All rights reserved.</span>
        </div>

        <div className="flex items-center gap-8">
          {footerLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-[13px] text-zinc-500 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 text-[13px] text-zinc-500 hover:text-white transition-colors group"
        >
          Back to top
          <span className="w-8 h-8 border border-zinc-700 rounded-full flex items-center justify-center group-hover:border-white transition-colors">
            <ArrowUp className="w-3 h-3" />
          </span>
        </button>
      </div>
    </footer>
  );
}
