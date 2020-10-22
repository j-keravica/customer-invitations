const fs = require("fs");
const readline = require("readline");
const { once } = require("events");

exports.readFile = async () => {
  try {
    const customers = [];

    const rl = readline.createInterface({
      input: fs.createReadStream("customers.txt"),
      crlfDelay: Infinity
    });

      rl.on("line", line => {
          customers.push(JSON.parse(line));
      });
    await once(rl, "close");

    return customers;
  } catch (err) {
    console.error(err);
  }
};

exports.writeFile = (customers) => {
    const fileContent = customers
        .map(customer => `${customer.user_id} ${customer.name}`)
        .join('\n');
    fs.writeFileSync("output.txt", fileContent);
}
