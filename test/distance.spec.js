const { DUBLIN_OFFICE } = require('../src/constants');
const { isNearby } = require('../src/distance');
const Location = require('../src/location');

describe('Distance calculations', () => {
    describe('#isNearby', () => {
        it('returns true for locations near Dublin office', () => {
            const stStephensGreen = new Location(53.3393864, -6.2586152);
            const mullingar = new Location(53.3736511, -6.3671953);

            expect(isNearby(stStephensGreen)).toBe(true);
            expect(isNearby(mullingar)).toBe(true);
            expect(isNearby(DUBLIN_OFFICE)).toBe(true);
        });
    
        it('returns false for locations not near Dublin office', () => {
            const athlone = new Location(53.4232399, -7.9666102);
            const brisbane = new Location(-27.3818617, 152.7123185);
            const southPole = new Location(-90, -180);

            expect(isNearby(athlone)).toBe(false);
            expect(isNearby(brisbane)).toBe(false);
            expect(isNearby(southPole)).toBe(false);
        });

        it('returns false for invalid locations', () => {
            const invalidLocation1 = new Location(1000.4232399, -7.9666102);
            const invalidLocation2 = new Location(27.3818617, -181.9666102);
            const invalidLocation3 = new Location(NaN, NaN);
            const invalidLocation4 = new Location();

            expect(isNearby(invalidLocation1)).toBe(false);
            expect(isNearby(invalidLocation2)).toBe(false);
            expect(isNearby(invalidLocation3)).toBe(false);
            expect(isNearby(invalidLocation4)).toBe(false);
        });
    })
})
