const fs = require("fs");
const readline = require("readline");
const { once } = require("events");
const { calculateDistance } = require("./distance");
const Point = require("./point");

const dublinOffice = new Point(-6.257664, 53.339428);

function checkDistance(line) {
  const customer = JSON.parse(line);
  const customerLocation = new Point(customer.longitude, customer.latitude);
  return calculateDistance(dublinOffice, customerLocation) < 100;
}

exports.processFile = async () => {
  try {
    const customers = [];
    const fileStream = fs.createReadStream("customers.txt");

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    rl.on("line", line => {
      if (checkDistance(line)) {
        customers.push(JSON.parse(line));
      }
    }).on("close", function() {
      console.log("File processed.");
    });
    await once(rl, "close");

    const orderedCustomers = customers.sort(
      (c1, c2) => c1.user_id - c2.user_id
    );
    orderedCustomers
      .map(customer => `${customer.user_id} ${customer.name}\n`)
      .forEach(customer => {
        fs.appendFileSync("invited-customers2.txt", customer);
      });

    return orderedCustomers;
  } catch (err) {
    console.error(err);
  }
};
