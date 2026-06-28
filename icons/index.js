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