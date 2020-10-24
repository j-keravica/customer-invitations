class Location {
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    getRadLatitude() {
        return this.degreesToRadians(this.latitude)
    }

    getRadLongitude() {
        return this.degreesToRadians(this.longitude)
    }
}

module.exports = Location;