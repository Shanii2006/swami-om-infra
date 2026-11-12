import { useState } from 'react';
import { PhoneCall, Globe, Menu, X, ArrowUpRight } from 'lucide-react';
import { BrandLogo } from './MachineryArtwork';

export default function Navbar({ setLang, t }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'mr' : 'en'));
  };

  return (
    <header className="sticky top-0 z-50 bg-[#121417]/95 backdrop-blur-md border-b border-[#2A2F37] pt-[env(safe-area-inset-top)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 h-16 sm:h-20">
          {/* Brand Identity */}
          <a href="#" className="flex items-center gap-2 sm:gap-3 group min-w-0 flex-1 md:flex-none">
            <BrandLogo className="w-9 h-9 sm:w-11 sm:h-11 shrink-0 transition-transform duration-200 group-hover:scale-105" />
            <div className="min-w-0">
              <div className="font-display font-bold text-[15px] sm:text-xl tracking-tight text-white leading-none truncate">
                {t.brand.name}
              </div>
              <div className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-[#F59E0B] mt-1 truncate">
                {t.brand.tagline}
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#9CA3AF]">
            <a href="#fleet" className="hover:text-white transition-colors">
              {t.nav.fleet}
            </a>
            <a href="#estimator" className="hover:text-white transition-colors">
              {t.nav.estimator}
            </a>
            <a href="#standards" className="hover:text-white transition-colors">
              {t.nav.standards}
            </a>
            <a href="#booking" className="hover:text-white transition-colors">
              {t.nav.booking}
            </a>
          </nav>

          {/* Actions: Language Switcher + Dispatch + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              type="button"
              aria-label="Switch Language between English and Marathi"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#1C1F24] hover:bg-[#2A2F37] border border-[#374151] text-xs font-semibold text-white transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>{t.switchLabel}</span>
            </button>

            <a
              href="tel:+919820477190"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#1C1F24] hover:bg-[#2A2F37] border border-[#2A2F37] text-xs font-semibold text-[#F9FAFB] transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#10B981]" />
              <span>{t.nav.dispatchBtn}</span>
            </a>

            <a
              href="#booking"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#F59E0B] hover:bg-[#FBBF24] text-[#121417] font-bold text-sm transition-colors"
            >
              <span>{t.nav.quoteBtn}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-2 shrink-0">
            <button
              onClick={toggleLanguage}
              type="button"
              className="inline-flex items-center gap-1 min-h-10 px-2.5 py-2 rounded-lg bg-[#1C1F24] border border-[#374151] text-xs font-bold text-[#F59E0B]"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{t.switchLabel}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              aria-label="Toggle Menu"
              aria-expanded={mobileMenuOpen}
              className="p-2 min-h-10 min-w-10 rounded-lg bg-[#1C1F24] border border-[#2A2F37] text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1C1F24] border-b border-[#2A2F37] px-4 pt-3 pb-5 space-y-1">
          <a
            href="#fleet"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-3 text-base font-medium text-white hover:text-[#F59E0B]"
          >
            {t.nav.fleet}
          </a>
          <a
            href="#estimator"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-3 text-base font-medium text-white hover:text-[#F59E0B]"
          >
            {t.nav.estimator}
          </a>
          <a
            href="#standards"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-3 text-base font-medium text-white hover:text-[#F59E0B]"
          >
            {t.nav.standards}
          </a>
          <a
            href="#booking"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-3 text-base font-medium text-white hover:text-[#F59E0B]"
          >
            {t.nav.booking}
          </a>
          <div className="pt-3 border-t border-[#2A2F37] flex flex-col gap-2">
            <a
              href="tel:+919820477190"
              className="flex items-center justify-center gap-2 min-h-11 py-2.5 rounded-lg bg-[#121417] border border-[#374151] text-sm font-semibold text-white"
            >
              <PhoneCall className="w-4 h-4 text-[#10B981]" />
              <span>{t.nav.dispatchBtn}</span>
            </a>
            <a
              href="#booking"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 min-h-11 py-2.5 rounded-lg bg-[#F59E0B] text-[#121417] text-sm font-bold"
            >
              <span>{t.nav.quoteBtn}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
