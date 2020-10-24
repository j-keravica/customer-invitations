const { filterCustomers } = require('./filtering');

(async () => {
  const args = process.argv.slice(2);
  const inputFilename = args[0];
  const outputFilename = args[1];
  await filterCustomers(inputFilename, outputFilename).catch(console.log);
})();
