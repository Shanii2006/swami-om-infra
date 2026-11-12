import { ArrowRight, Calculator, ShieldCheck, MapPin, Wrench } from 'lucide-react';
import { MachinerySchematic } from './MachineryArtwork';

export default function HeroSection({ t }) {
  return (
    <section className="relative overflow-hidden blueprint-grid border-b border-[#2A2F37]">
      {/* Subtle Industrial Glow */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#F59E0B]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 min-w-0">
            <div className="inline-flex max-w-full items-start gap-2 px-3 py-1.5 rounded-full bg-[#1C1F24] border border-[#F59E0B]/40 text-[10px] sm:text-xs font-bold tracking-wide sm:tracking-wider text-[#F59E0B] leading-snug">
              <span className="w-2 h-2 mt-0.5 rounded-full bg-[#10B981] animate-pulse shrink-0" />
              <span className="text-pretty">{t.hero.badge}</span>
            </div>

            <h1 className="font-display text-[1.85rem] sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              {t.hero.titleLine1}
              <span className="block text-[#F59E0B] mt-1">{t.hero.titleLine2}</span>
            </h1>

            <p className="text-sm sm:text-lg text-[#9CA3AF] max-w-2xl leading-relaxed">
              {t.hero.subtitle}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <a
                href="#booking"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 min-h-12 rounded-xl bg-[#F59E0B] hover:bg-[#FBBF24] text-[#121417] font-bold text-base transition-all shadow-lg shadow-[#F59E0B]/10"
              >
                <span>{t.hero.ctaPrimary}</span>
                <ArrowRight className="w-5 h-5 shrink-0" />
              </a>

              <a
                href="#estimator"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 min-h-12 rounded-xl bg-[#1C1F24] hover:bg-[#2A2F37] border border-[#374151] text-white font-semibold text-base transition-colors"
              >
                <Calculator className="w-5 h-5 text-[#F59E0B] shrink-0" />
                <span>{t.hero.ctaSecondary}</span>
              </a>
            </div>

            {/* Key Operational Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-[#2A2F37]">
              {t.hero.stats.map((stat, index) => (
                <div key={index} className="bg-[#1C1F24]/70 border border-[#2A2F37] rounded-xl p-3 min-w-0">
                  <div className="font-mono-tabular text-xl sm:text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-[11px] sm:text-xs text-[#9CA3AF] mt-1 leading-snug">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Live Dispatch Telemetry Card */}
          <div className="lg:col-span-5 min-w-0">
            <div className="bg-[#1C1F24] border border-[#2A2F37] rounded-2xl overflow-hidden shadow-2xl">
              <div className="h-2 hazard-stripe" />

              <div className="p-4 sm:p-6 space-y-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#10B981]/15 text-[#10B981] text-xs font-bold w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                    {t.hero.liveCard.status}
                  </span>
                  <span className="font-mono-tabular text-xs text-[#9CA3AF]">
                    {t.hero.liveCard.fleetId}
                  </span>
                </div>

                {/* Custom Technical Vector Preview */}
                <div className="bg-[#121417] border border-[#2A2F37] rounded-xl p-4">
                  <MachinerySchematic type="excavator-heavy" />
                </div>

                <div>
                  <h2 className="font-display text-xl font-bold text-white">
                    {t.hero.liveCard.title}
                  </h2>
                  <div className="mt-3 space-y-2 text-sm text-[#9CA3AF]">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#F59E0B] shrink-0" />
                      <span>{t.hero.liveCard.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-[#F59E0B] shrink-0" />
                      <span>{t.hero.liveCard.operator}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#10B981] shrink-0" />
                      <span>RTO • PUC • Commercial Insurance Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
