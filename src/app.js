const path = require("path")
const hbs = require('hbs')
    // imports one method called express
const express = require("express")
const { response } = require("express")

const geocodeUtility = require('./utils/geocode.js')
const weatherUtility = require('./utils/weather.js')

// create express application
const app = express()

// Paths for express config
const pathToPublicDir = path.join(__dirname, '../public')
const pathToViewDir = path.join(__dirname, '../templates/views')
const pathToPartials = path.join(__dirname, '../templates/partials')

// dynamic view engine instead of static from html 
app.set('view engine', 'hbs')
    // default expects views in views folder, but here it specifies the views are in templates dir
app.set('views', pathToViewDir)
hbs.registerPartials(pathToPartials)
    // on hitting home url -> displayes index.js from public folder which is made static below
    // You can access the public files using => base_url/static_file_with_extension
    // in case of home page i.e http://base_url/ it automatically calls the index.html page
app.use(express.static(pathToPublicDir))

app.get('', (request, response) => {
    response.render('index', {
        title: 'Weather',
        city: 'Bangaluru',
        name: 'Kavya'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Kavya'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Kavya'
    })
})

app.get('/weather', (request, res) => {
    const city = request.query.address
    if (city) {
        geocodeUtility.geocode((error, response) => {
            if (error) {
                return res.send({
                    error: "Geocode API failed"
                })
            }
            console.log(response);

            weatherUtility.fetchWeather(city, (error, response) => {
                if (error) {
                    return res.send({
                        error: "Weather API failed"
                    })
                }
                console.log(response);

                return res.send({
                    forecast: response,
                    location: request.query.address,
                    address: request.query.address
                })
            })
        })

    } else {
        return res.send({
            error: 'Missing parameter in the URL'
        })
    }

    // return response.send({
    //     error: 'Missing parameter in the URL',
    // })

})

app.get('/products', (request, response) => {
    console.log(request.query);
    console.log(request.query.key);
    response.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        error: 'Help article not found',
        name: 'Kavya'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        error: 'Page Not Found',
        name: 'Kavya'
    })
})

// To start server on port 3000
app.listen(3000, () => {
    // executes when server runs
    console.log("Server has started on port 3000!");
})