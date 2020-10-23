const fs = require("fs");
const readline = require("readline");
const { once } = require("events");

exports.readFromFile = async filePath => {
  try {
    const customers = [];

    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    rl.on("line", line => {
      customers.push(JSON.parse(line));
    });
    await once(rl, "close");

    return customers;
  } catch (err) {
    throw err;
  }
};

exports.writeToFile = customers => {
  const fileContent = customers
    .map(customer => `${customer.user_id} ${customer.name}`)
    .join("\n");
  fs.writeFileSync("output.txt", fileContent);
};
