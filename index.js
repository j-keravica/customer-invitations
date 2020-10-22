const { checkOfficeDistance } = require("./distance");
const { readFile, writeFile } = require("./file-loader");

(async () => {
  const customers = await readFile();

  const invitedCustomers = customers
    .filter(customer => checkOfficeDistance(customer))
    .sort((c1, c2) => c1.user_id - c2.user_id);

  writeFile(invitedCustomers);
})();
