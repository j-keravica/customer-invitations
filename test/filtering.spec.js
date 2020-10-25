const fs = require("fs");
const mockFs = require("mock-fs");
const { filterCustomers } = require("../src/filtering");

describe("#filterCustomers", () => {

  afterEach(() => {
    mockFs.restore();
  });

  it("outputs the names and user ids of matching customers", async () => {
    mockFs({
      "customers.txt": `{"latitude": "53.74452", "user_id": 29, "name": "Oliver Ahearn", "longitude": "-7.11167"}
      {"latitude": "51.999447", "user_id": 14, "name": "Helen Cahill", "longitude": "-9.742744"}
      {"latitude": "52.986375", "user_id": 12, "name": "Christina McArdle", "longitude": "-6.043701"}
      {"latitude": "51.92893", "user_id": 1, "name": "Alice Cahill", "longitude": "-10.27699"}`
    });
    const writeFileSyncSpy = jest.spyOn(fs, "writeFileSync");
    await filterCustomers();

    expect(writeFileSyncSpy).toHaveBeenCalledWith(
      "output.txt",
      "12 Christina McArdle\n29 Oliver Ahearn"
    );
  });

  it("skips customers with no location data", async () => {
    mockFs({
      "customers.txt": `{"latitude": "53.74452", "user_id": 29, "name": "Oliver Ahearn", "longitude": "-7.11167"}
      {"latitude": "", "user_id": 14, "name": "Eoin Gallagher", "longitude": ""}
      {"user_id": 14, "name": "Lisa Ahearn"}
      {"latitude": "52.986375", "user_id": 12, "name": "Christina McArdle", "longitude": "-6.043701"}`
    });
    const writeFileSyncSpy = jest.spyOn(fs, "writeFileSync");
    await filterCustomers();

    expect(writeFileSyncSpy).toHaveBeenCalledWith(
      "output.txt",
      "12 Christina McArdle\n29 Oliver Ahearn"
    );
  });

  it("reads and writes from custom file paths if provided", async () => {
    mockFs({
      "somePath/someFile.txt": `{"latitude": "53.74452", "user_id": 29, "name": "Oliver Ahearn", "longitude": "-7.11167"}
      {"latitude": "51.92893", "user_id": 1, "name": "Alice Cahill", "longitude": "-10.27699"}
      {"latitude": "52.986375", "user_id": 12, "name": "Christina McArdle", "longitude": "-6.043701"}`
    });
    const writeFileSyncSpy = jest.spyOn(fs, "writeFileSync");
    await filterCustomers("somePath/someFile.txt", "someOutput.txt");

    expect(writeFileSyncSpy).toHaveBeenCalledWith(
      "someOutput.txt",
      "12 Christina McArdle\n29 Oliver Ahearn"
    );
  });
});
