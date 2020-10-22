class Location {
    constructor(longitude, latitude) {
        this.longitude = longitude;
        this.latitude = latitude;
    }

    degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    getRadLongitude() {
        return this.degreesToRadians(this.longitude)
    }

    getRadLatitude() {
        return this.degreesToRadians(this.latitude)
    }
}

module.exports = Location;