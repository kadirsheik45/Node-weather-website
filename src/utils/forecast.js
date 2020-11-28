const request = require('request')

const forecast = (address, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+address+'&units=metric&appid=001adc399d8f180b32b08f488efa5604'

    request({url, json: true}, (error, { body }) => {
        console.log('inside')
        if(error)
        {
            callback('Unable to connect!', undefined)
        }
    
        else if (body.cod ==='404')
        {
            callback('Unable to find locatiion', undefined)
        }
    
        else{
        
             callback(undefined, 'There are '+body.weather[0].main+' today with the temperature being at ' +body.main.temp+ ' degrees and a humidity level of ' + body.main.humidity)
         } 
    })

}

// forecast('london', (error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)
// })

module.exports = forecast