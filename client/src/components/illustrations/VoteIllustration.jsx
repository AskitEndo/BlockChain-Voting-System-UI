export const VoteIllustration = () => (
  <svg
    className="w-32 h-32 md:w-48 md:h-48 opacity-90"
    viewBox="0 0 512 512"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Ballot Box */}
    <rect
      x="96"
      y="156"
      width="320"
      height="280"
      rx="20"
      fill="url(#ballotGradient)"
      className="filter drop-shadow-lg"
    />
    {/* Ballot Slot */}
    <rect
      x="176"
      y="136"
      width="160"
      height="40"
      rx="10"
      fill="#A4CAFE"
      className="filter drop-shadow-md"
    />
    {/* Vote Paper */}
    <path
      d="M256 76L286 126H226L256 76Z"
      fill="#EBF5FF"
      className="animate-float"
    />
    {/* Checkmark */}
    <path
      d="M236 256L256 276L296 236"
      stroke="#1C64F2"
      strokeWidth="12"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="animate-draw"
    />
    <defs>
      <linearGradient
        id="ballotGradient"
        x1="96"
        y1="156"
        x2="416"
        y2="436"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#EBF5FF" />
        <stop offset="1" stopColor="#E1EFFE" />
      </linearGradient>
      <style>
        {`
          @keyframes draw {
            from { stroke-dashoffset: 100; }
            to { stroke-dashoffset: 0; }
          }
          .animate-draw {
            stroke-dasharray: 100;
            animation: draw 1.5s ease-in-out infinite alternate;
          }
        `}
      </style>
    </defs>
  </svg>
);

export const ElectionSettingsIllustration = () => (
  <svg
    className="w-32 h-32 md:w-48 md:h-48 opacity-90"
    viewBox="0 0 512 512"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Settings Gear */}
    <circle
      cx="256"
      cy="256"
      r="160"
      fill="url(#settingsGradient)"
      className="animate-spin-slow"
    />
    <path
      d="M256 156C194.772 156 156 194.772 156 256C156 317.228 194.772 356 256 356C317.228 356 356 317.228 356 256C356 194.772 317.228 156 256 156ZM289.5 281H256C253.25 281 251 278.75 251 276V206C251 203.25 253.25 201 256 201C258.75 201 261 203.25 261 206V271H289.5C292.25 271 294.5 273.25 294.5 276C294.5 278.75 292.25 281 289.5 281Z"
      fill="#1C64F2"
    />
    {/* Small Gears */}
    <circle
      cx="376"
      cy="176"
      r="40"
      fill="#A4CAFE"
      className="animate-spin-reverse"
    />
    <circle
      cx="136"
      cy="336"
      r="40"
      fill="#A4CAFE"
      className="animate-spin-reverse"
    />
    <defs>
      <linearGradient
        id="settingsGradient"
        x1="96"
        y1="96"
        x2="416"
        y2="416"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#EBF5FF" />
        <stop offset="1" stopColor="#E1EFFE" />
      </linearGradient>
      <style>
        {`
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes spin-reverse {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
          }
          .animate-spin-reverse {
            animation: spin-reverse 15s linear infinite;
          }
        `}
      </style>
    </defs>
  </svg>
);
