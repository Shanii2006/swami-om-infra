import { useState } from 'react';
import { SlidersHorizontal, Info, CalendarCheck, X, CheckCircle2 } from 'lucide-react';
import { fleetData } from '../data/fleetData';
import { MachinerySchematic } from './MachineryArtwork';

export default function FleetCatalog({ lang, t, onSelectMachineForBooking }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedModalMachine, setSelectedModalMachine] = useState(null);

  const categories = [
    { key: 'all', label: t.fleet.filters.all },
    { key: 'excavator', label: t.fleet.filters.excavator },
    { key: 'dumper', label: t.fleet.filters.dumper },
    { key: 'attachment', label: t.fleet.filters.attachment },
  ];

  const filteredFleet =
    activeCategory === 'all'
      ? fleetData
      : fleetData.filter((item) => item.category === activeCategory);

  const formatINR = (amount) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <section id="fleet" className="py-12 sm:py-20 border-b border-[#2A2F37]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Category Filter Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div className="min-w-0">
            <div className="text-xs font-bold tracking-widest text-[#F59E0B] uppercase">
              {t.fleet.eyebrow}
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-white mt-2">
              {t.fleet.title}
            </h2>
            <p className="text-sm sm:text-base text-[#9CA3AF] mt-2 max-w-2xl">{t.fleet.subtitle}</p>
          </div>

          <div className="-mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto">
            <div className="flex items-center gap-2 w-max min-w-full pb-1">
              <SlidersHorizontal className="w-4 h-4 text-[#9CA3AF] mr-1 hidden sm:inline shrink-0" />
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-3.5 sm:px-4 py-2 min-h-10 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                    activeCategory === cat.key
                      ? 'bg-[#F59E0B] text-[#121417]'
                      : 'bg-[#1C1F24] text-[#9CA3AF] hover:text-white border border-[#2A2F37]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Fleet Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFleet.map((machine) => {
            const localized = machine[lang];
            return (
              <article
                key={machine.id}
                className="bg-[#1C1F24] border border-[#2A2F37] hover:border-[#F59E0B]/60 rounded-2xl overflow-hidden flex flex-col justify-between transition-all group min-w-0"
              >
                <div>
                  {/* Card Top Bar */}
                  <div className="px-4 sm:px-5 pt-5 flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded bg-[#F59E0B]/15 text-[#F59E0B] text-[11px] font-bold tracking-wide shrink-0">
                      {machine.badge[lang]}
                    </span>
                    <span className="font-mono-tabular text-[11px] sm:text-xs text-[#10B981] font-semibold text-right">
                      ● {machine.availableCount} Units Ready
                    </span>
                  </div>

                  {/* Schematic Illustration */}
                  <div className="mx-5 mt-4 bg-[#121417] border border-[#2A2F37] rounded-xl p-3 group-hover:border-[#374151] transition-colors">
                    <MachinerySchematic type={machine.svgType} />
                  </div>

                  {/* Title & Subtitle */}
                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold text-white leading-snug">
                      {localized.name}
                    </h3>
                    <p className="text-xs text-[#9CA3AF] mt-1">{localized.subtitle}</p>

                    {/* 2x2 Key Specs */}
                    <div className="grid grid-cols-2 gap-2.5 mt-4">
                      {localized.metrics.map((m, idx) => (
                        <div
                          key={idx}
                          className="bg-[#121417] border border-[#2A2F37] rounded-lg px-3 py-2"
                        >
                          <div className="text-[11px] text-[#9CA3AF]">{m.label}</div>
                          <div className="font-mono-tabular text-xs font-bold text-white mt-0.5">
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pricing & Actions Footer */}
                <div className="px-4 sm:px-5 py-4 bg-[#121417]/60 border-t border-[#2A2F37] flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="font-mono-tabular text-lg font-bold text-[#F59E0B]">
                      {formatINR(machine.ratePerShift)}
                    </div>
                    <div className="text-[11px] text-[#9CA3AF]">{t.fleet.perShift}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 w-full sm:w-auto sm:flex sm:items-center">
                    <button
                      type="button"
                      onClick={() => setSelectedModalMachine(machine)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 min-h-11 rounded-lg bg-[#1C1F24] hover:bg-[#2A2F37] border border-[#374151] text-xs font-semibold text-white transition-colors"
                    >
                      <Info className="w-3.5 h-3.5 text-[#F59E0B]" />
                      <span>{t.fleet.specsBtn}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectMachineForBooking(machine)}
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 min-h-11 rounded-lg bg-[#F59E0B] hover:bg-[#FBBF24] text-[#121417] text-xs font-bold transition-colors"
                    >
                      <CalendarCheck className="w-3.5 h-3.5" />
                      <span>{t.fleet.bookBtn}</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Technical Specification Modal */}
      {selectedModalMachine && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-[#1C1F24] border border-[#374151] rounded-t-2xl sm:rounded-2xl max-w-2xl w-full max-h-[92dvh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-[#1C1F24] border-b border-[#2A2F37] px-4 sm:px-6 py-4 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <span className="text-xs font-bold text-[#F59E0B]">
                  {selectedModalMachine.badge[lang]}
                </span>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-snug">
                  {selectedModalMachine[lang].name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedModalMachine(null)}
                className="p-2 min-h-10 min-w-10 rounded-lg bg-[#121417] text-[#9CA3AF] hover:text-white shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-6">
              {/* Technical Parameters Table */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#F59E0B] mb-3">
                  {t.fleet.modal.parameters}
                </h4>
                <div className="border border-[#2A2F37] rounded-xl overflow-hidden divide-y divide-[#2A2F37]">
                  {selectedModalMachine[lang].specs.map((row, i) => (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 px-4 py-2.5 text-sm bg-[#121417]/50"
                    >
                      <span className="text-[#9CA3AF]">{row.key}</span>
                      <span className="font-mono-tabular font-semibold text-white sm:text-right break-words">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Site Applications & Inclusions */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-[#121417] border border-[#2A2F37] rounded-xl p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2.5">
                    {t.fleet.modal.applications}
                  </h4>
                  <ul className="space-y-2 text-xs text-[#9CA3AF]">
                    {selectedModalMachine[lang].applications.map((app, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#F59E0B] font-bold">•</span>
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#121417] border border-[#2A2F37] rounded-xl p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2.5">
                    {t.fleet.modal.inclusions}
                  </h4>
                  <ul className="space-y-2 text-xs text-[#9CA3AF]">
                    {selectedModalMachine[lang].inclusions.map((inc, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="px-4 sm:px-6 py-4 bg-[#121417] border-t border-[#2A2F37] flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-between gap-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <div className="font-mono-tabular text-lg font-bold text-[#F59E0B]">
                {formatINR(selectedModalMachine.ratePerShift)}{' '}
                <span className="text-xs font-normal text-[#9CA3AF]">{t.fleet.perShift}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 w-full sm:w-auto sm:flex sm:items-center">
                <button
                  type="button"
                  onClick={() => setSelectedModalMachine(null)}
                  className="px-4 py-2.5 min-h-11 rounded-lg border border-[#374151] text-xs font-semibold text-[#9CA3AF] hover:text-white"
                >
                  {t.fleet.modal.close}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const target = selectedModalMachine;
                    setSelectedModalMachine(null);
                    onSelectMachineForBooking(target);
                  }}
                  className="px-4 py-2.5 min-h-11 rounded-lg bg-[#F59E0B] hover:bg-[#FBBF24] text-[#121417] text-xs font-bold"
                >
                  {t.fleet.modal.selectUnit}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
