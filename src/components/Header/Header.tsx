import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import LogoImage from '../LogoImage/LogoImage';
import logoFull from '../../assets/logo-full.webp';

const navLinks = [
  { name: 'Work', path: '/portfolio' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Contact', path: '/contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === '/';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled 
          ? 'nav-blur py-3' 
          : 'py-8 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link to="/" className="flex items-end gap-2">
          <div className={`transition-all duration-700 ${isScrolled ? 'opacity-100 scale-100' : 'opacity-20 scale-75'}`}>
            <div className="w-7 h-7 overflow-hidden flex items-center justify-center">
              <LogoImage
                src={logoFull}
                alt=""
                className="w-full"
                style={{ transform: 'translateY(35%) scale(1.7)' }}
              />
            </div>
          </div>
          <span className={`text-[14px] font-semibold tracking-tight transition-opacity duration-700 ${isScrolled ? 'opacity-100' : 'opacity-20'}`} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            <span className="text-white font-bold">BLANK</span>
            <span className="text-primary font-medium" style={{ letterSpacing: '0.15em' }}>STUDIO</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm transition-colors link-underline ${
                location.pathname === link.path || (isHome && link.path === '/portfolio')
                  ? 'text-white'
                  : isScrolled ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <Link
          to="/contact"
          className={`hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm transition-all duration-500 ${
            isScrolled 
              ? 'border border-white/10 hover:bg-white hover:text-black' 
              : 'border border-white/10 hover:border-white/20 text-zinc-400 hover:text-white'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          联系我们
        </Link>

        <button
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-full border border-white/10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-black/95 backdrop-blur-xl border-t border-white/5">
          <div className="flex flex-col py-4 px-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm py-2 ${
                  location.pathname === link.path
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="w-full text-center px-5 py-3 border border-white/10 rounded-full text-sm mt-4 hover:bg-white hover:text-black transition-all duration-500"
            >
              联系我们
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
