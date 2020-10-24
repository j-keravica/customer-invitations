const Location = require("./location");
const { isNearby } = require("./distance");
const { readFromFile, writeToFile } = require("./file-handlers");

const filterByLocation = customers => {
  return customers
    .filter(customer => {
      const { latitude, longitude } = customer;
      const customerLocation = new Location(latitude, longitude);
      return isNearby(customerLocation);
    });
}

const filterCustomers = async () => {
  const customers = await readFromFile();

  const invitedCustomers = filterByLocation(customers);

  writeToFile(invitedCustomers, "output.txt");
}

module.exports = {
  filterCustomers
};