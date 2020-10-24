const { filterCustomers } = require('./filtering');

(async () => {
  await filterCustomers().catch(console.log);
})();
