const degreesToRadians = (degrees) => {
    return degrees * (Math.PI / 180);
};

class Location {
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    getRadLatitude() {
        return degreesToRadians(this.latitude)
    }

    getRadLongitude() {
        return degreesToRadians(this.longitude)
    }
}

module.exports = Location;