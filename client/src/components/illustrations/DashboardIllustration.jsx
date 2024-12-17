export const DashboardIllustration = () => (
  <svg
    className="w-64 h-64 opacity-80"
    viewBox="0 0 500 500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="250" cy="250" r="200" fill="url(#gradient)" fillOpacity="0.2" />
    <path
      d="M250 150C194.772 150 150 194.772 150 250C150 305.228 194.772 350 250 350C305.228 350 350 305.228 350 250C350 194.772 305.228 150 250 150ZM283.5 275H250C247.25 275 245 272.75 245 270V200C245 197.25 247.25 195 250 195C252.75 195 255 197.25 255 200V265H283.5C286.25 265 288.5 267.25 288.5 270C288.5 272.75 286.25 275 283.5 275Z"
      fill="currentColor"
      className="text-primary-600"
    />
    <defs>
      <linearGradient
        id="gradient"
        x1="50"
        y1="50"
        x2="450"
        y2="450"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#B8E3FF" />
        <stop offset="1" stopColor="#C7D2FE" />
      </linearGradient>
    </defs>
  </svg>
);

export const VotingIllustration = () => (
  <svg
    className="w-48 h-48 opacity-80"
    viewBox="0 0 400 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="100"
      y="100"
      width="200"
      height="250"
      rx="20"
      fill="url(#cardGradient)"
      className="filter drop-shadow-lg"
    />
    <path
      d="M150 200L180 230L250 160"
      stroke="currentColor"
      strokeWidth="20"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-primary-600"
    />
    <defs>
      <linearGradient
        id="cardGradient"
        x1="100"
        y1="100"
        x2="300"
        y2="350"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" stopOpacity="0.5" />
        <stop offset="1" stopColor="white" stopOpacity="0.2" />
      </linearGradient>
    </defs>
  </svg>
);
