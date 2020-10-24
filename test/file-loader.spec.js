const { readFromFile, writeToFile } = require('../src/file-handlers');

describe('File handlers', () => {
    describe('#readFromFile', () => {
        it('returns an array of all customers from txt file', async () => {
            const customers = await readFromFile('test/mocks/valid-input.txt');
    
            expect(customers).toBeInstanceOf(Array);
            expect(customers.length).toEqual(3);
            customers.forEach(customer => {
                expect(customer).toHaveProperty('longitude');
                expect(customer).toHaveProperty('latitude');
                expect(customer).toHaveProperty('user_id');
                expect(customer).toHaveProperty('name');
            })
        });
    
        it('returns an empty array if the file is empty', async () => {
            const customers = await readFromFile('test/mocks/empty.txt');
    
            expect(customers).toBeInstanceOf(Array);
            expect(customers.length).toEqual(0);
        });
    
        it('throws an error if the file does not exist', async () => {
            expect(async () => {
                await readFromFile('test/mocks/nonexistent.txt');
            }).rejects.toThrow();
        });
    
        it('throws an error if file contents cannot be parsed', async () => {
            expect(async () => {
                await readFromFile('test/mocks/gibberish.txt');
            }).rejects.toThrow();
        });
    });

    describe('#writeToFile', () => {
    });
});
