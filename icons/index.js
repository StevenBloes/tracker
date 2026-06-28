/*
  SVG images used throughout the webapp.
*/

export function BackIcon(size = "100%", color = "#4ea13f"){
    return `
      <svg
        width="${size}"
        height="${size}"
        viewBox="0 0 110 110"
        id="backIcon">
        <style>
          .arrow-line {
            fill: none;
            stroke: ${color};
            stroke-width: 12;
            stroke-linecap: round;
            stroke-linejoin: round;
          }
          .circle {
            fill: white;
            opacity: 90%;
            stroke: none;
          }
        </style>
        <circle
          id="backCircle"
          class="circle"
          cx="55"
          cy="55"
          r="50"
        />
        <g id="backArrow" class="arrow-line">
          <path d="M 50,30 25,55 50,80" />
          <path d="M 25,55 85,55" />
        </g>
      </svg>
    `;
}

export function MailIcon(size = "100%", color= "#4ea13f"){
    return `
      <svg
        width="${size}"
        height="${size}}"
        viewBox="0 0 110 110"
        id="mailIcon">
        <style>
          .line {
            fill: none;
            stroke: ${color};
            stroke-width: 10;
            stroke-linecap: round;
            stroke-linejoin: round;
          }
        </style>
        <path class="line" d="M 5,20 105,20 105,90 5,90 Z" />
        <path class="line" d="M 5,20 50,60 105,20" />
      </svg>
    `;
}

export function LockIcon(size = "100%", color= "#4ea13f"){
    return `
      <svg
        width="${size}"
        height="${size}"
        viewBox="0 0 110 110"
        id="mailIcon">
        <style>
          .outer {
            fill: none;
            stroke: ${color};
            stroke-width: 10;
            stroke-linecap: round;
            stroke-linejoin: round;
          }
        </style>
        <circle
          class="outer"
          cx="55"
          cy="65"
          r="6"
        />
	    <path class="outer" d="M 55,65 V 85" />
	    <rect class="outer"
          x="20"
          y="40"
          width="70"
          height="61" />
        <path class="outer" d="M 35,40 C 35,3 75,3 75,40" />
      </svg>
    `;
}

export function CompanyIcon(size = "100%", color = "#4ea13f"){
  return `
    <svg
      width="${size}" 
      height="${size}" 
      viewBox="0 0 780 781">
      <style>
        .logo-style {
          fill: ${color};
          stroke: ${color};
          stroke-width: 1px;
        }
      </style>
        <g class="logo-style">
          <rect x="275" y="380" width="40" height="20" />
          <rect x="0" y="20" width="290" height="740" />
          <path d="M 280 390 C 250 50, 551 19, 740 0 C 720 480, 340 380, 280 390" />
          <path d="M 280 390 C 250 720, 551 761, 740 780 C 720 300, 340 400, 280 390" />
        </g>
    </svg>
  `;
}