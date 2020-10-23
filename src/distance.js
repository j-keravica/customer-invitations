const Location = require("./location");

const EARTH_RADIUS = 6371;
const DUBLIN_OFFICE = new Location(-6.257664, 53.339428);

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

exports.isNear = (customer) => {
    const customerLocation =
        new Location(customer.longitude, customer.latitude);
    return calculateDistance(DUBLIN_OFFICE, customerLocation) < 100;
}
