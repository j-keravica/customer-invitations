const { calculateDistance } = require('./distance');
const { processFile } = require('./file-loader');
const Point = require('./point');

const belgrade = new Point(20.28, 44.49);
const noviSad = new Point(19.51, 45.15);
const newYorkCity = new Point(-74, 40.42);
const dublin = new Point(-6.257664, 53.339428);


const d1 = calculateDistance(
    belgrade,
    noviSad
);

const d2 = calculateDistance(
    belgrade,
    newYorkCity
);

const d3 = calculateDistance(
    belgrade,
    dublin
);

console.log(d1);
console.log(d2);
console.log(d3);

(async() => {  
    const customers = await processFile();
    console.log(customers);
})();