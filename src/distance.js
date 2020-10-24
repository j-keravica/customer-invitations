const { DUBLIN_OFFICE, DISTANCE_RADIUS } = require('./constants');

const EARTH_RADIUS = 6371;

const isValidLocation = location => {
    const { latitude: lat, longitude: long } = location;
    return lat <= 90 && lat >= -90 &&
        long <= 180 && long >= -180;
}

const calculateDistance = (location1, location2) => {
    const lat1Rad = location1.getRadLatitude();
    const lat2Rad = location2.getRadLatitude();
    const long1Rad = location1.getRadLongitude();
    const long2Rad = location2.getRadLongitude();

    const deltaLong = Math.abs(long1Rad - long2Rad);

    const centralAngle = Math.acos(
        (Math.sin(lat1Rad) * Math.sin(lat2Rad)) +
        (Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.cos(deltaLong))
    );

    return centralAngle * EARTH_RADIUS;
}

const isNearby = (location) => {
    if (!isValidLocation) {
        return false;
    }
    return calculateDistance(DUBLIN_OFFICE, location) < DISTANCE_RADIUS;
}

module.exports = {
    isNearby
};