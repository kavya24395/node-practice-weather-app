const request = require("request")

const api_access_key = "b9bafd9670b9c71955f7c2d5e17d862c"

function fetchWeather(city, callback) {
    const url = `http://api.weatherstack.com/current?access_key=${api_access_key}&query=${city}`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to contact weatherstack server", undefined)
        } else if (body.error) {
            callback("Error response from weatherstack server", undefined)
        } else {
            const temp = body.current.temperature
            const precip = body.current.precip
            callback(undefined, `It is currently ${temp} degrees out. There is a ${precip}% chance of rain.`)
        }
    })
}

exports.fetchWeather = fetchWeather