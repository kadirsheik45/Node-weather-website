const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))


const app = express()

const port = process.env.PORT || 3000

const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

//set up handlebars engline
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.get('',(req, res) =>{
    res.render('index', {
        title: 'Weather app',
        name: 'Kadir sheikh'
    })  //the second option in render is the object which we want to make
    //it accessable in the index.hbs file  
})
// After setting up public/help.html this code doesnt need to be here



app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Kadir Sheikh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'HELP!',
        name: 'Kadir Sheikh',
        p: 'This is the help section of the app'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Must provide an address!'
        })
    }

        forecast(req.query.address, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                address: req.query.address
            })
        })
    })


app.get('/products', (req, res) => {
    if(!req.query.search)
    {
       return res.send({
            error: 'No search term was provided'
        })
    }
    console.log(req.query)
    res.send({
        response: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 help',
        name: 'Kadir Sheikh',
        errorMessage: 'Help not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kadir Sheikh',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})