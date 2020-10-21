const EARTH_RADIUS = 6371;

const degreesToRadians = degrees => degrees * (Math.PI / 180);

const calculateDistance = (point1, point2) => {
    const { longitude: long1, latitude: lat1 } = point1;
    const { longitude: long2, latitude: lat2 } = point2;
    const lat1Rad = degreesToRadians(lat1);
    const lat2Rad = degreesToRadians(lat2);
    const long1Rad = degreesToRadians(long1);
    const long2Rad = degreesToRadians(long2);

    const deltaLong = Math.abs(long1Rad - long2Rad);

    const centralAngle = Math.acos(
        (Math.sin(lat1Rad) * Math.sin(lat2Rad)) +
        (Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.cos(deltaLong))
    );

    return centralAngle * EARTH_RADIUS;
}

const d1 = calculateDistance(
    { latitude: 44.49, longitude: 20.28 },
    { latitude: 45.15, longitude: 19.51 }
);

const d2 = calculateDistance(
    { latitude: 44.49, longitude: 20.28 },
    { latitude: 40.42, longitude: -74 }
);

console.log(d1);
console.log(d2);