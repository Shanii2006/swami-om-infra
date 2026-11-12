import { Wrench, Satellite, HardHat, FileCheck2 } from 'lucide-react';

export default function SiteStandards({ t }) {
  const icons = [Wrench, Satellite, HardHat, FileCheck2];

  return (
    <section id="standards" className="py-12 sm:py-20 border-b border-[#2A2F37]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="text-xs font-bold tracking-widest text-[#F59E0B] uppercase">
            {t.standards.eyebrow}
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white mt-2">
            {t.standards.title}
          </h2>
          <p className="text-sm sm:text-base text-[#9CA3AF] mt-2">{t.standards.subtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.standards.items.map((item, idx) => {
            const IconComponent = icons[idx % icons.length];
            return (
              <div
                key={idx}
                className="bg-[#1C1F24] border border-[#2A2F37] rounded-2xl p-6 hover:border-[#F59E0B]/50 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B] mb-4">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-white">{item.title}</h3>
                <p className="text-sm text-[#9CA3AF] mt-2 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
