const Location = require("./location");
const { isNearby } = require("./distance");
const { readFromFile, writeToFile } = require("./file-handlers");
const { DEFAULT_INPUT, DEFAULT_OUTPUT } = require('./constants');

const filterByLocation = customers => {
  return customers
    .filter(customer => {
      const { latitude, longitude } = customer;
      const customerLocation = new Location(latitude, longitude);
      return isNearby(customerLocation);
    });
}

const filterCustomers = async (
  inputFileName = DEFAULT_INPUT,
  outputFileName = DEFAULT_OUTPUT
) => {
  const customers = await readFromFile(inputFileName);

  const invitedCustomers = filterByLocation(customers);

  writeToFile(invitedCustomers, outputFileName);

  if (process.env['NODE_ENV'] !== 'test') {
    console.log(`Customers written in ${outputFileName}`);
  }
}

module.exports = {
  filterCustomers
};