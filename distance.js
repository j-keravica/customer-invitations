const Location = require("./location");

const EARTH_RADIUS = 6371;
const DUBLIN_OFFICE = new Location(-6.257664, 53.339428);

const calculateDistance = (point1, point2) => {
    const lat1Rad = point1.getRadLatitude();
    const lat2Rad = point2.getRadLatitude();
    const long1Rad = point1.getRadLongitude();
    const long2Rad = point2.getRadLongitude();

    const deltaLong = Math.abs(long1Rad - long2Rad);

    const centralAngle = Math.acos(
        (Math.sin(lat1Rad) * Math.sin(lat2Rad)) +
        (Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.cos(deltaLong))
    );

    return centralAngle * EARTH_RADIUS;
}

exports.checkOfficeDistance = (customer) => {
    const customerLocation =
        new Location(customer.longitude, customer.latitude);
    return calculateDistance(DUBLIN_OFFICE, customerLocation) < 100;
}
