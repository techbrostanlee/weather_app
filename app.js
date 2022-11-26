const express = require('express');
const https = require('https');
const env = require('dotenv').config()
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
app.set('views', './views')
app.set('view engine', 'ejs')
const port = process.env.PORT || 3000

const { log } = require('console');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

let partWeather = 0;
allWeather = [] ;

app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');

    
});

app.post('/', function(req,res){
    const querry = req.body.location;
    const simKey = process.env.SECRET_KEY;
   const days = 7

    const mainUrl = process.env.SECRET_URL+querry+'&appid='+simKey+'&cnt='+days

    https.get(mainUrl, function(map){
        console.log(map.statusCode);
        
        map.on('data', function(data){
           const weathers = JSON.parse(data) ;
            

            
            var filler = weathers.list[2].dt
            var location = weathers.city.name
            var country = weathers.city.country
            var population = weathers.city.population;
            var timezone = weathers.city.timezone;
            var lat = weathers.city.coord.lat;
            var lon = weathers.city.coord.lon;
            //var time = weathers.list[0].dt_txt
            var desc = weathers.list[0].weather[0].description
            //var icon = weathers.list[0].weather[0].icon
            //var cloud = weathers.list[0].clouds.all
            //var humidity = weathers.list[0].main.humidity
            //var wind = weathers.list[0].wind.speed
            var pressure = weathers.list[0].main.pressure
            //var temp = weathers.list[0].main.temp
            

            res.render('index', {fil: filler, countriz: country, locationz: location, timez: weathers.list[0].dt_txt, iconz: weathers.list[0].weather[0].icon, cloudz:weathers.list[0].clouds.all, diz: desc, Humiditz: weathers.list[0].main.humidity, windz:weathers.list[0].wind.speed, pressz:pressure, tempz: weathers.list[0].main.temp, array: weathers.list, popo:population, timepo: timezone, latpo: lat, lonpo: lon}); 
        });
    });
})





app.listen(port, function(){
    console.log('123 server started');
});