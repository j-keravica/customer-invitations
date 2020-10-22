const fs = require("fs");
const readline = require("readline");
const { once } = require('events');

exports.processFile = async () => {
  try {
    const customers = [];
    const fileStream = fs.createReadStream('customers.txt');

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
  
    for await (const line of rl) {
        customers.push(JSON.parse(line));
    }
    console.log("File processed.");

    return customers;
  } catch (err) {
    console.error(err);
  }
};
