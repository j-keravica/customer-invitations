const Location = require('./location');

const DUBLIN_OFFICE = new Location(53.339428, -6.257664);
const DISTANCE_RADIUS = 100; //kilometers
const DEFAULT_INPUT = "customers.txt";
const DEFAULT_OUTPUT = "output.txt";

module.exports = {
    DUBLIN_OFFICE,
    DISTANCE_RADIUS,
    DEFAULT_INPUT,
    DEFAULT_OUTPUT
};