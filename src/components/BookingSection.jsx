import { useState } from 'react';
import { MapPin, Phone, Mail, Navigation, Send, CheckCircle2 } from 'lucide-react';
import { fleetData } from '../data/fleetData';

export default function BookingSection({ lang, t, prefilledBooking }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    location: '',
    equipment: fleetData[0][lang].name,
    date: '',
    notes: '',
  });

  const [submittedRef, setSubmittedRef] = useState(null);
  const [appliedPrefill, setAppliedPrefill] = useState(null);

  if (prefilledBooking && prefilledBooking !== appliedPrefill) {
    setAppliedPrefill(prefilledBooking);
    setSubmittedRef(null);
    setFormData((prev) => ({
      ...prev,
      equipment: prefilledBooking.machineName || prev.equipment,
      notes: prefilledBooking.summaryText || prev.notes,
    }));
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const randomCode = `SOI-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedRef(randomCode);
  };

  return (
    <section id="booking" className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="text-xs font-bold tracking-widest text-[#F59E0B] uppercase">
            {t.booking.eyebrow}
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white mt-2">
            {t.booking.title}
          </h2>
          <p className="text-sm sm:text-base text-[#9CA3AF] mt-2">{t.booking.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Control Room Info */}
          <div className="lg:col-span-5 bg-[#1C1F24] border border-[#2A2F37] rounded-2xl p-4 sm:p-8 flex flex-col justify-between space-y-6 min-w-0">
            <div>
              <h3 className="font-display text-xl font-bold text-white mb-6">
                {t.booking.contactTitle}
              </h3>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-[#121417] border border-[#2A2F37] text-[#F59E0B]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#9CA3AF]">{t.booking.hqLabel}</div>
                    <div className="text-white mt-0.5">{t.booking.hqValue}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-[#121417] border border-[#2A2F37] text-[#10B981]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#9CA3AF]">{t.booking.phoneLabel}</div>
                    <div className="font-mono-tabular text-white font-semibold mt-0.5">
                      {t.booking.phoneValue}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-[#121417] border border-[#2A2F37] text-[#F59E0B]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#9CA3AF]">{t.booking.emailLabel}</div>
                    <div className="font-mono-tabular text-white mt-0.5">
                      {t.booking.emailValue}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-[#121417] border border-[#2A2F37] text-[#F59E0B]">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#9CA3AF]">
                      {t.booking.corridorsLabel}
                    </div>
                    <div className="text-white mt-0.5">{t.booking.corridorsValue}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-2 rounded-full hazard-stripe" />
          </div>

          {/* Right Dispatch Form */}
          <div className="lg:col-span-7 bg-[#1C1F24] border border-[#2A2F37] rounded-2xl p-4 sm:p-8 min-w-0">
            {submittedRef ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#10B981]/15 border border-[#10B981] text-[#10B981] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  {t.booking.form.successTitle}
                </h3>
                <div className="inline-block px-4 py-1.5 rounded-lg bg-[#121417] border border-[#374151] font-mono-tabular text-sm font-bold text-[#F59E0B]">
                  REF ID: {submittedRef}
                </div>
                <p className="text-sm text-[#9CA3AF] max-w-md mx-auto">
                  {t.booking.form.successMsg}
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setSubmittedRef(null)}
                    className="px-5 py-2.5 rounded-xl bg-[#2A2F37] hover:bg-[#374151] text-white text-sm font-semibold"
                  >
                    {t.booking.form.resetBtn}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#9CA3AF] mb-1.5">
                      {t.booking.form.name}
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t.booking.form.namePlaceholder}
                      className="w-full bg-[#121417] border border-[#374151] focus:border-[#F59E0B] rounded-xl px-4 py-3 text-base sm:text-sm text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#9CA3AF] mb-1.5">
                      {t.booking.form.company}
                    </label>
                    <input
                      type="text"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      placeholder={t.booking.form.companyPlaceholder}
                      className="w-full bg-[#121417] border border-[#374151] focus:border-[#F59E0B] rounded-xl px-4 py-3 text-base sm:text-sm text-white outline-none"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#9CA3AF] mb-1.5">
                      {t.booking.form.phone}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t.booking.form.phonePlaceholder}
                      className="w-full bg-[#121417] border border-[#374151] focus:border-[#F59E0B] rounded-xl px-4 py-3 text-base sm:text-sm text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#9CA3AF] mb-1.5">
                      {t.booking.form.location}
                    </label>
                    <input
                      type="text"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      placeholder={t.booking.form.locationPlaceholder}
                      className="w-full bg-[#121417] border border-[#374151] focus:border-[#F59E0B] rounded-xl px-4 py-3 text-base sm:text-sm text-white outline-none"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#9CA3AF] mb-1.5">
                      {t.booking.form.equipment}
                    </label>
                    <select
                      name="equipment"
                      value={formData.equipment}
                      onChange={handleChange}
                      className="w-full bg-[#121417] border border-[#374151] focus:border-[#F59E0B] rounded-xl px-4 py-3 text-base sm:text-sm text-white outline-none"
                    >
                      {fleetData.map((m) => (
                        <option key={m.id} value={m[lang].name}>
                          {m[lang].name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#9CA3AF] mb-1.5">
                      {t.booking.form.date}
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full bg-[#121417] border border-[#374151] focus:border-[#F59E0B] rounded-xl px-4 py-3 text-base sm:text-sm text-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#9CA3AF] mb-1.5">
                    {t.booking.form.notes}
                  </label>
                  <textarea
                    name="notes"
                    rows="3"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder={t.booking.form.notesPlaceholder}
                      className="w-full bg-[#121417] border border-[#374151] focus:border-[#F59E0B] rounded-xl px-4 py-3 text-base sm:text-sm text-white outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 min-h-12 rounded-xl bg-[#F59E0B] hover:bg-[#FBBF24] text-[#121417] font-bold text-sm transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.booking.form.submitBtn}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
