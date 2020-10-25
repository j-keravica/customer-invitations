# Customer filtering

This project loads fictional customer records from a text file (customers.txt) and outputs the names and user IDs of any customer within 100km of the Dublin office, sorted by User ID (ascending).

## Running the example

Prerequisites: Node v11.4.0 or higher.

```
yarn install
yarn filter-customers 'input-file-path' 'output-file-path'
```
This runs `src/app.js`. Input and output file paths are optional arguments, relative to the project folder. The command will read from `customers.txt` and output to `output.txt` by default.

## Running tests

Tests are stored in `/test` directory. Run them with `yarn test`.
