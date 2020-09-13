const request = require("request")
const access_code = 'pk.eyJ1Ijoia3BzMjQwMzk1IiwiYSI6ImNrZHJhbzVpYTFjNDIyeHRhNWZyNWNkZGEifQ.QdrhnMvr770kUiiSX37Sog'
const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/bengaluru.json?access_token=${access_code}`


function geocode(callback) {
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback("Could not contact mapbox server", undefined)
        } else if (body.features.length === 0) {
            callback("No location details available", undefined)
        } else {
            callback(undefined, `Longitude: ${body.features[0].center[0]} || Latitude: ${body.features[0].center[1]}`)
        }
    })
}

exports.geocode = geocode