const { isNear } = require("./distance");
const { readFromFile, writeToFile } = require("./file-handlers");

(async () => {
  const customers = await readFromFile("customers.txt");

  const invitedCustomers = customers
    .filter(customer => isNear(customer))
    .sort((c1, c2) => c1.user_id - c2.user_id);

    writeToFile(invitedCustomers);
})();
