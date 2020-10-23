const { isNear } = require('../src/distance');

describe('#isNear', () => {
    it('returns true if customer is within 100km of Dublin office', () => {
        const guiness = {
            latitude: 53.3435462,
            longitude: -6.2808661,
            name: 'Guiness',
            user_id: 123
        };
        const mullingar = {
            latitude: 53.3736511,
            longitude: -6.3671953,
            name: 'Mullingar',
            user_id: 456
        };
        expect(isNear(guiness)).toBe(true);
        expect(isNear(mullingar)).toBe(true);
    });

    it('returns false if customer is not within 100km of Dublin office', () => {
        const athlone = {
            latitude: 53.4232399,
            longitude: -7.9666102,
            name: 'Athlone',
            user_id: 789
        };
        expect(isNear(athlone)).toBe(false);
    });
})