const fs = require("fs");
const readline = require("readline");

const createReadStreamAsync = filename => {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(filename);
    fileStream.on("error", reject).on("open", () => {
      resolve(fileStream);
    });
  });
};

const readFromFile = async filename => {
  const customers = [];

  const fileStream = await createReadStreamAsync(filename);
  const rl = readline.createInterface({
    input: fileStream
  });

  for await (const line of rl) {
    customers.push(JSON.parse(line));
  }

  return customers;
};

const formatOutput = customers => {
  return customers
    .sort((c1, c2) => c1.user_id - c2.user_id)
    .map(customer => `${customer.user_id} ${customer.name}`)
    .join("\n");
};

const writeToFile = (customers, filename) => {
  const fileContent = formatOutput(customers);
  fs.writeFileSync(filename, fileContent);
};

module.exports = {
  readFromFile,
  writeToFile
};
