import { BrandLogo } from './MachineryArtwork';

export default function Footer({ t }) {
  return (
    <footer className="bg-[#0D0F12] border-t border-[#2A2F37] py-10 sm:py-12 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-12 gap-8 pb-8 border-b border-[#2A2F37]">
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-3">
              <BrandLogo className="w-10 h-10" />
              <div>
                <div className="font-display font-bold text-lg text-white">
                  {t.brand.name}
                </div>
                <div className="text-[11px] font-semibold text-[#F59E0B]">
                  {t.brand.tagline}
                </div>
              </div>
            </div>
            <p className="text-sm text-[#9CA3AF] max-w-md leading-relaxed">
              {t.footer.about}
            </p>
          </div>

          <div className="md:col-span-3 space-y-2 text-sm">
            <div className="font-bold text-white mb-3">{t.footer.quickLinks}</div>
            <div>
              <a href="#fleet" className="text-[#9CA3AF] hover:text-[#F59E0B]">
                {t.nav.fleet}
              </a>
            </div>
            <div>
              <a href="#estimator" className="text-[#9CA3AF] hover:text-[#F59E0B]">
                {t.nav.estimator}
              </a>
            </div>
            <div>
              <a href="#standards" className="text-[#9CA3AF] hover:text-[#F59E0B]">
                {t.nav.standards}
              </a>
            </div>
            <div>
              <a href="#booking" className="text-[#9CA3AF] hover:text-[#F59E0B]">
                {t.nav.booking}
              </a>
            </div>
          </div>

          <div className="md:col-span-3 space-y-2 text-sm text-[#9CA3AF]">
            <div className="font-bold text-white mb-3">{t.footer.fleetCategories}</div>
            <div>Komatsu PC210 / PC300LC</div>
            <div>Tata Hitachi EX210</div>
            <div>12-Tyre & 10-Tyre Hyva Dumpers</div>
            <div>140mm Hydraulic Rock Breakers</div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#9CA3AF]">
          <div className="leading-relaxed">{t.footer.copyright}</div>
          <div className="font-mono-tabular leading-relaxed">{t.footer.compliance}</div>
        </div>
      </div>
    </footer>
  );
}
