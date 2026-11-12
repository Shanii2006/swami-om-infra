import { useState, useMemo } from 'react';
import { Calculator, Lock, CheckCircle2 } from 'lucide-react';
import { fleetData } from '../data/fleetData';

export default function RentalEstimator({ lang, t, onLockEstimate }) {
  const [selectedMachineId, setSelectedMachineId] = useState(fleetData[0].id);
  const [units, setUnits] = useState(2);
  const [days, setDays] = useState(15);
  const [shiftMode, setShiftMode] = useState('single'); // 'single' | 'double'
  const [leaseType, setLeaseType] = useState('wet'); // 'wet' | 'dry'

  const selectedMachine = useMemo(
    () => fleetData.find((m) => m.id === selectedMachineId) || fleetData[0],
    [selectedMachineId]
  );

  const calculation = useMemo(() => {
    const baseRate = selectedMachine.ratePerShift;
    const shiftMultiplier = shiftMode === 'double' ? 1.85 : 1.0;
    const leaseMultiplier = leaseType === 'dry' ? 0.88 : 1.0; // 12% off for Dry lease

    const grossAmount = baseRate * units * days * shiftMultiplier * leaseMultiplier;

    // Volume & Duration Discounts
    const bulkDiscountRate = units >= 3 ? 0.08 : 0; // 8% for 3+ units
    const longTermDiscountRate = days >= 30 ? 0.12 : 0; // 12% for 30+ days

    const bulkDiscount = grossAmount * bulkDiscountRate;
    const longTermDiscount = (grossAmount - bulkDiscount) * longTermDiscountRate;

    const subtotal = Math.round(grossAmount - bulkDiscount - longTermDiscount);
    const gstAmount = Math.round(subtotal * 0.18);
    const grandTotal = subtotal + gstAmount;

    return {
      baseRate,
      shiftMultiplier,
      leaseMultiplier,
      bulkDiscount: Math.round(bulkDiscount),
      longTermDiscount: Math.round(longTermDiscount),
      subtotal,
      gstAmount,
      grandTotal,
    };
  }, [selectedMachine, units, days, shiftMode, leaseType]);

  const formatINR = (val) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);

  const handleLockClick = () => {
    const summaryText =
      lang === 'en'
        ? `Estimate Locked: ${units}x ${selectedMachine.en.name} for ${days} days (${shiftMode.toUpperCase()} shift, ${leaseType.toUpperCase()} lease). Estimated Total: ${formatINR(calculation.grandTotal)} incl. GST.`
        : `अंदाजे कोटेशन: ${units}x ${selectedMachine.mr.name}, ${days} दिवस (${shiftMode === 'double' ? 'डबल शिफ्ट' : 'सिंगल शिफ्ट'}, ${leaseType === 'wet' ? 'वेट लीज' : 'ड्राय लीज'}). एकूण अंदाजे रक्कम: ${formatINR(calculation.grandTotal)} (GST सहित).`;

    onLockEstimate({
      machineName: selectedMachine[lang].name,
      summaryText,
    });
  };

  return (
    <section id="estimator" className="py-12 sm:py-20 bg-[#1C1F24]/40 border-b border-[#2A2F37]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="text-xs font-bold tracking-widest text-[#F59E0B] uppercase">
            {t.estimator.eyebrow}
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white mt-2">
            {t.estimator.title}
          </h2>
          <p className="text-sm sm:text-base text-[#9CA3AF] mt-2">{t.estimator.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Controls */}
          <div className="lg:col-span-7 bg-[#1C1F24] border border-[#2A2F37] rounded-2xl p-4 sm:p-8 space-y-6 min-w-0">
            {/* 1. Machine Selection */}
            <div>
              <label className="block text-sm font-bold text-white mb-2">
                {t.estimator.selectMachine}
              </label>
              <select
                value={selectedMachineId}
                onChange={(e) => setSelectedMachineId(e.target.value)}
                className="w-full max-w-full bg-[#121417] border border-[#374151] focus:border-[#F59E0B] rounded-xl px-3 sm:px-4 py-3 text-base sm:text-sm font-medium text-white outline-none"
              >
                {fleetData.map((machine) => (
                  <option key={machine.id} value={machine.id}>
                    {machine[lang].name} — {formatINR(machine.ratePerShift)} {t.fleet.perShift}
                  </option>
                ))}
              </select>
            </div>

            {/* 2 & 3. Sliders for Units & Days */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-[#121417] border border-[#2A2F37] rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-[#9CA3AF]">
                    {t.estimator.unitQty}
                  </label>
                  <span className="font-mono-tabular text-sm font-bold text-[#F59E0B]">
                    {units} {t.estimator.unitsSuffix}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={units}
                  onChange={(e) => setUnits(Number(e.target.value))}
                  className="w-full accent-[#F59E0B] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#9CA3AF] mt-1 font-mono-tabular">
                  <span>1</span>
                  <span>3+ (-8%)</span>
                  <span>10</span>
                </div>
              </div>

              <div className="bg-[#121417] border border-[#2A2F37] rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-[#9CA3AF]">
                    {t.estimator.duration}
                  </label>
                  <span className="font-mono-tabular text-sm font-bold text-[#F59E0B]">
                    {days} {t.estimator.daysSuffix}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="60"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full accent-[#F59E0B] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#9CA3AF] mt-1 font-mono-tabular">
                  <span>1d</span>
                  <span>30d+ (-12%)</span>
                  <span>60d</span>
                </div>
              </div>
            </div>

            {/* 4. Shift Mode */}
            <div>
              <label className="block text-sm font-bold text-white mb-2.5">
                {t.estimator.shiftPattern}
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setShiftMode('single')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    shiftMode === 'single'
                      ? 'bg-[#F59E0B]/15 border-[#F59E0B] text-white'
                      : 'bg-[#121417] border-[#2A2F37] text-[#9CA3AF] hover:text-white'
                  }`}
                >
                  <div className="text-sm font-bold">{t.estimator.singleShift}</div>
                  <div className="text-xs opacity-80 mt-0.5">{t.estimator.singleShiftSub}</div>
                </button>

                <button
                  type="button"
                  onClick={() => setShiftMode('double')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    shiftMode === 'double'
                      ? 'bg-[#F59E0B]/15 border-[#F59E0B] text-white'
                      : 'bg-[#121417] border-[#2A2F37] text-[#9CA3AF] hover:text-white'
                  }`}
                >
                  <div className="text-sm font-bold">{t.estimator.doubleShift}</div>
                  <div className="text-xs opacity-80 mt-0.5">{t.estimator.doubleShiftSub}</div>
                </button>
              </div>
            </div>

            {/* 5. Wet vs Dry Lease */}
            <div>
              <label className="block text-sm font-bold text-white mb-2.5">
                {t.estimator.leaseMode}
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setLeaseType('wet')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    leaseType === 'wet'
                      ? 'bg-[#F59E0B]/15 border-[#F59E0B] text-white'
                      : 'bg-[#121417] border-[#2A2F37] text-[#9CA3AF] hover:text-white'
                  }`}
                >
                  <div className="text-sm font-bold">{t.estimator.wetLease}</div>
                  <div className="text-xs opacity-80 mt-0.5">{t.estimator.wetLeaseSub}</div>
                </button>

                <button
                  type="button"
                  onClick={() => setLeaseType('dry')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    leaseType === 'dry'
                      ? 'bg-[#F59E0B]/15 border-[#F59E0B] text-white'
                      : 'bg-[#121417] border-[#2A2F37] text-[#9CA3AF] hover:text-white'
                  }`}
                >
                  <div className="text-sm font-bold">{t.estimator.dryLease}</div>
                  <div className="text-xs opacity-80 mt-0.5">{t.estimator.dryLeaseSub}</div>
                </button>
              </div>
            </div>

            <p className="text-xs text-[#9CA3AF] italic">{t.estimator.fuelNote}</p>
          </div>

          {/* Right Column: Live Receipt Panel */}
          <div className="lg:col-span-5 bg-[#121417] border-2 border-[#F59E0B]/50 rounded-2xl p-4 sm:p-8 shadow-2xl min-w-0">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#F59E0B] uppercase">
              <Calculator className="w-4 h-4" />
              <span>{t.estimator.summaryTitle}</span>
            </div>

            <div className="mt-4 pb-4 border-b border-[#2A2F37]">
              <div className="font-display text-lg font-bold text-white">
                {selectedMachine[lang].name}
              </div>
              <div className="text-xs text-[#9CA3AF] mt-1">
                {units} {t.estimator.unitsSuffix} × {days} {t.estimator.daysSuffix} (
                {shiftMode === 'double' ? t.estimator.doubleShift : t.estimator.singleShift})
              </div>
            </div>

            <div className="py-4 space-y-3 text-sm border-b border-[#2A2F37]">
              <div className="flex justify-between gap-3 text-[#9CA3AF]">
                <span>{t.estimator.baseTariff}</span>
                <span className="font-mono-tabular text-white shrink-0">
                  {formatINR(calculation.baseRate)} / shift
                </span>
              </div>

              <div className="flex justify-between gap-3 text-[#9CA3AF]">
                <span>{t.estimator.shiftMultiplier}</span>
                <span className="font-mono-tabular text-white">
                  {calculation.shiftMultiplier}x
                </span>
              </div>

              {calculation.bulkDiscount > 0 && (
                <div className="flex justify-between text-[#10B981]">
                  <span>{t.estimator.bulkDiscount}</span>
                  <span className="font-mono-tabular">
                    - {formatINR(calculation.bulkDiscount)}
                  </span>
                </div>
              )}

              {calculation.longTermDiscount > 0 && (
                <div className="flex justify-between text-[#10B981]">
                  <span>{t.estimator.longTermDiscount}</span>
                  <span className="font-mono-tabular">
                    - {formatINR(calculation.longTermDiscount)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-[#9CA3AF] pt-2 border-t border-[#2A2F37]/70">
                <span>{t.estimator.subtotal}</span>
                <span className="font-mono-tabular font-semibold text-white">
                  {formatINR(calculation.subtotal)}
                </span>
              </div>

              <div className="flex justify-between text-[#9CA3AF]">
                <span>{t.estimator.gst}</span>
                <span className="font-mono-tabular text-white">
                  {formatINR(calculation.gstAmount)}
                </span>
              </div>
            </div>

            <div className="py-5 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <span className="text-sm font-bold text-white">{t.estimator.grandTotal}</span>
              <span className="font-mono-tabular text-2xl sm:text-3xl font-bold text-[#F59E0B] break-all">
                {formatINR(calculation.grandTotal)}
              </span>
            </div>

            <button
              type="button"
              onClick={handleLockClick}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 min-h-12 rounded-xl bg-[#F59E0B] hover:bg-[#FBBF24] text-[#121417] font-bold text-sm text-center leading-snug transition-colors"
            >
              <Lock className="w-4 h-4 shrink-0" />
              <span>{t.estimator.lockBtn}</span>
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#9CA3AF]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Zero hidden charges • Official GST Invoice</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
