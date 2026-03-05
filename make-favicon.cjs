const fs = require('fs');
const path = require('path');

const imgPath = path.join(process.cwd(), 'public/images/flaticon.jpeg');
const bgData = fs.readFileSync(imgPath).toString('base64');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <clipPath id="circleView">
      <circle cx="50" cy="50" r="50" fill="#FFFFFF" />
    </clipPath>
  </defs>
  <image width="100" height="100" href="data:image/jpeg;base64,${bgData}" clip-path="url(#circleView)" preserveAspectRatio="xMidYMid slice" />
</svg>`;

fs.writeFileSync(path.join(process.cwd(), 'public/images/favicon.svg'), svg);
console.log('done');
