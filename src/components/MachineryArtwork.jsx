export function BrandLogo({ className = 'w-10 h-10' }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="4" y="4" width="56" height="56" rx="12" fill="#1C1F24" stroke="#F59E0B" strokeWidth="2.5" />
      {/* Crawler Tracks */}
      <rect x="12" y="44" width="32" height="8" rx="4" fill="#2A2F37" stroke="#F59E0B" strokeWidth="2" />
      <circle cx="17" cy="48" r="1.8" fill="#F59E0B" />
      <circle cx="28" cy="48" r="1.8" fill="#F59E0B" />
      <circle cx="39" cy="48" r="1.8" fill="#F59E0B" />
      {/* Cab */}
      <path d="M16 42V29C16 27.3431 17.3431 26 19 26H29L33 34V42H16Z" fill="#F59E0B" />
      <path d="M20 29H27L29.5 34H20V29Z" fill="#121417" />
      {/* Boom & Arm */}
      <path
        d="M31 35L43 17L52 25L47 36"
        stroke="#F9FAFB"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Bucket */}
      <path
        d="M44 35H52L50 42C49.5 43.5 47.5 44 46 43L43 40L44 35Z"
        fill="#F59E0B"
      />
    </svg>
  );
}

export function MachinerySchematic({ type }) {
  if (type === 'dumper-12' || type === 'dumper-10') {
    const isTwelveTyre = type === 'dumper-12';
    return (
      <svg viewBox="0 0 320 140" fill="none" className="w-full h-36" aria-hidden="true">
        {/* Grid lines */}
        <line x1="10" y1="118" x2="310" y2="118" stroke="#374151" strokeWidth="2" strokeDasharray="6 4" />
        {/* Tipper Rock Body */}
        <path
          d="M30 42L185 36L195 88H42L30 42Z"
          fill="#2A2F37"
          stroke="#F59E0B"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        {/* Body Ribs */}
        <line x1="72" y1="41" x2="78" y2="88" stroke="#4B5563" strokeWidth="2" />
        <line x1="112" y1="39" x2="117" y2="88" stroke="#4B5563" strokeWidth="2" />
        <line x1="152" y1="38" x2="156" y2="88" stroke="#4B5563" strokeWidth="2" />
        {/* Canopy Over Cab */}
        <path d="M185 36H226L222 44H185V36Z" fill="#F59E0B" />
        {/* Hyva Front Hydraulic Cylinder */}
        <rect x="196" y="45" width="7" height="44" rx="2" fill="#9CA3AF" />
        {/* Truck Cabin */}
        <path
          d="M210 48H254L274 72V92H210V48Z"
          fill="#F59E0B"
          stroke="#FBBF24"
          strokeWidth="1.5"
        />
        {/* Windshield */}
        <path d="M236 53H251L264 69H236V53Z" fill="#121417" />
        {/* Chassis Frame */}
        <rect x="44" y="88" width="232" height="8" rx="2" fill="#1F2937" stroke="#6B7280" strokeWidth="1.5" />
        {/* Rear Wheels */}
        <g>
          <circle cx="72" cy="102" r="15" fill="#121417" stroke="#F9FAFB" strokeWidth="3" />
          <circle cx="72" cy="102" r="6" fill="#F59E0B" />
          <circle cx="110" cy="102" r="15" fill="#121417" stroke="#F9FAFB" strokeWidth="3" />
          <circle cx="110" cy="102" r="6" fill="#F59E0B" />
          {isTwelveTyre && (
            <>
              <circle cx="148" cy="102" r="15" fill="#121417" stroke="#F9FAFB" strokeWidth="3" />
              <circle cx="148" cy="102" r="6" fill="#F59E0B" />
            </>
          )}
        </g>
        {/* Front Wheel */}
        <circle cx="244" cy="102" r="15" fill="#121417" stroke="#F9FAFB" strokeWidth="3" />
        <circle cx="244" cy="102" r="6" fill="#F59E0B" />
      </svg>
    );
  }

  const isBreaker = type === 'breaker';
  const isMini = type === 'excavator-mini';

  return (
    <svg viewBox="0 0 320 140" fill="none" className="w-full h-36" aria-hidden="true">
      {/* Ground line */}
      <line x1="10" y1="120" x2="310" y2="120" stroke="#374151" strokeWidth="2" strokeDasharray="6 4" />
      {/* Crawler Tracks */}
      <rect
        x={isMini ? '55' : '40'}
        y="96"
        width={isMini ? '105' : '130'}
        height="22"
        rx="11"
        fill="#1F2937"
        stroke="#F59E0B"
        strokeWidth="2.5"
      />
      {[65, 90, 115, 140].map((cx, idx) => (
        <circle key={idx} cx={cx} cy="107" r="4.5" fill="#F59E0B" />
      ))}
      {/* Mini Dozer Blade */}
      {isMini && (
        <path d="M164 102L182 96V118H164V102Z" fill="#F59E0B" />
      )}
      {/* Upper House / Counterweight */}
      <path
        d="M44 62C44 56.4772 48.4772 52 54 52H128L142 74V92H44V62Z"
        fill="#F59E0B"
      />
      {/* Counterweight Stripes */}
      <rect x="44" y="64" width="22" height="28" rx="3" fill="#1C1F24" />
      <line x1="48" y1="71" x2="62" y2="71" stroke="#F59E0B" strokeWidth="2" />
      <line x1="48" y1="78" x2="62" y2="78" stroke="#F59E0B" strokeWidth="2" />
      <line x1="48" y1="85" x2="62" y2="85" stroke="#F59E0B" strokeWidth="2" />
      {/* Operator Cabin Window */}
      <path d="M98 56H124L134 73H98V56Z" fill="#121417" />
      {/* Main Boom */}
      <path
        d="M132 76L192 24L214 34L154 84Z"
        fill="#2A2F37"
        stroke="#F9FAFB"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Hydraulic Boom Cylinder */}
      <line x1="146" y1="84" x2="180" y2="48" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
      {/* Stick / Arm */}
      <path
        d="M204 28L252 68L242 76L196 36Z"
        fill="#2A2F37"
        stroke="#F9FAFB"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Attachment: Rock Breaker OR Heavy Bucket */}
      {isBreaker ? (
        <g>
          <rect x="238" y="70" width="20" height="30" rx="3" fill="#F59E0B" stroke="#121417" strokeWidth="1.5" />
          <path d="M245 100H251L248 118L245 100Z" fill="#F9FAFB" />
        </g>
      ) : (
        <path
          d="M244 72H268L274 92C272 100 260 104 250 100L238 88L244 72Z"
          fill="#F59E0B"
          stroke="#121417"
          strokeWidth="1.5"
        />
      )}
    </svg>
  );
}
