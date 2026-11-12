import { useState } from 'react';
import { translations } from './i18n/translations';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FleetCatalog from './components/FleetCatalog';
import RentalEstimator from './components/RentalEstimator';
import SiteStandards from './components/SiteStandards';
import BookingSection from './components/BookingSection';
import Footer from './components/Footer';

export default function App() {
  const [lang, setLang] = useState('en'); // 'en' | 'mr'
  const [prefilledBooking, setPrefilledBooking] = useState(null);

  const t = translations[lang];

  const scrollToBooking = () => {
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectMachineForBooking = (machine) => {
    setPrefilledBooking({
      machineName: machine[lang].name,
      summaryText:
        lang === 'en'
          ? `Interested in renting ${machine.en.name} (${machine.en.subtitle}). Please share availability and low-bed mobilization charges.`
          : `${machine.mr.name} (${machine.mr.subtitle}) भाड्याने हवे आहे. कृपया उपलब्धता आणि ट्रेलर वाहतूक दर कळवा.`,
    });
    scrollToBooking();
  };

  const handleLockEstimate = (estimatePayload) => {
    setPrefilledBooking(estimatePayload);
    scrollToBooking();
  };

  return (
    <div className="min-h-screen min-w-0 bg-[#121417] text-[#F9FAFB] flex flex-col overflow-x-clip">
      <Navbar lang={lang} setLang={setLang} t={t} />
      <main className="flex-grow">
        <HeroSection t={t} />
        <FleetCatalog
          lang={lang}
          t={t}
          onSelectMachineForBooking={handleSelectMachineForBooking}
        />
        <RentalEstimator
          lang={lang}
          t={t}
          onLockEstimate={handleLockEstimate}
        />
        <SiteStandards t={t} />
        <BookingSection
          lang={lang}
          t={t}
          prefilledBooking={prefilledBooking}
        />
      </main>
      <Footer t={t} />
    </div>
  );
}
