const Location = require('../src/location');

describe('Location', () => {
  describe('#getRadLatitude', () => {
    it('converts latitude in degrees to radians', () => {
      const location1 = new Location(90, 0);
      const location2 = new Location(45, 0);
      expect(location1.getRadLatitude()).toBeCloseTo(1.57, 1);
      expect(location2.getRadLatitude()).toBeCloseTo(0.78, 1);
    });
  });

  describe('#getRadLongitude', () => {
    it('converts longitude in degrees to radians', () => {
      const location1 = new Location(0, -180);
      const location2 = new Location(0, 56);
      expect(location1.getRadLongitude()).toBeCloseTo(-3.14, 1);
      expect(location2.getRadLongitude()).toBeCloseTo(0.97, 1);
    });
  });
});