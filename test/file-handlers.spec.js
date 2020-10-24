const { readFromFile, writeToFile } = require("../src/file-handlers");
const fs = require('fs');
const mockFs = require("mock-fs");

describe("File handlers", () => {
  describe("#readFromFile", () => {
    beforeEach(() => {
      mockFs({
        "valid-input.txt": `{"latitude": "52.986375", "user_id": 12, "name":      "Christina McArdle", "longitude": "-6.043701"}
          {"latitude": "51.92893", "user_id": 1, "name": "Alice Cahill", "longitude": "-10.27699"}
          {"latitude": "51.8856167", "user_id": 2, "name": "Ian McArdle", "longitude": "-10.4240951"}`,
        "empty.txt": "",
        "gibberish.txt": "qwertyuiop",
        "image.png": Buffer.from([8, 6, 7, 5, 3, 0, 9])
      });
    });

    afterEach(() => {
      mockFs.restore();
    });

    it("returns an array of all customers from txt file", async () => {
      const customers = await readFromFile("valid-input.txt");

      expect(customers).toBeInstanceOf(Array);
      expect(customers.length).toEqual(3);
      customers.forEach(customer => {
        expect(customer).toHaveProperty("longitude");
        expect(customer).toHaveProperty("latitude");
        expect(customer).toHaveProperty("user_id");
        expect(customer).toHaveProperty("name");
      });
    });

    it("returns an empty array if the file is empty", async () => {
      const customers = await readFromFile("empty.txt");

      expect(customers).toBeInstanceOf(Array);
      expect(customers.length).toEqual(0);
    });

    it("throws an error if the file does not exist", async () => {
      expect(async () => {
        await readFromFile("nonexistent.txt");
      }).rejects.toThrow();
    });

    it("throws an error if file contents cannot be parsed", async () => {
      expect(async () => {
        await readFromFile("gibberish.txt");
        mockFs.restore();
      }).rejects.toThrow();
    });

    it("throws an error if file is not a txt file", async () => {
      expect(async () => {
        await readFromFile("image.png");
        mockFs.restore();
      }).rejects.toThrow();
    });
  });

  describe("#writeToFile", () => {
    beforeEach(() => {
      mockFs();
    });
      
    afterEach(() => {
      mockFs.restore();
    });

    it("writes invited customers in a proper format to a txt file", () => {
      const nearbyCustomers = [
        {
          latitude: 53.89971,
          longitude: -6.11167,
          user_id: 56,
          name: "John Doe"
        },
        {
          latitude: 53.2451022,
          longitude: -6.238335,
          user_id: 12,
          name: "Ian Kehoe"
        },
        {
          latitude: 53.74452,
          longitude: -7.11167,
          user_id: 34,
          name: "Jane Smith"
        }
      ];
      const writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync');
      writeToFile(nearbyCustomers, "invited-customers.txt");

      expect(writeFileSyncSpy).toHaveBeenCalledWith(
        "invited-customers.txt",
        "12 Ian Kehoe\n34 Jane Smith\n56 John Doe"
      );
    });

    it("writes an empty file if there are no nearby customers", () => {
      const writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync');
      writeToFile([], "invited-customers.txt");

      expect(writeFileSyncSpy).toHaveBeenCalledWith("invited-customers.txt", "");
    });

    it("writes to output.txt if no file specified", () => {
      const writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync');
      writeToFile([]);

      expect(writeFileSyncSpy).toHaveBeenCalledWith("output.txt", "");
    });
  });
});
