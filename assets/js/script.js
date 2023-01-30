// let currentDate = dayjs();
// $('#current-date').text(currentDate.format('dddd, MMMM DD'));


let apiKey = "26aab995b68ef9eaae3c5d668d386911";

document.getElementById("search-btn").addEventListener("click", function(event) {
    event.preventDefault()
    let cityName = document.getElementById("cities").value;
    latandLongData(cityName);

})

function latandLongData (cityName) {
    let geoAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}` 

    fetch(geoAPI)
    .then(function(response){
return response.json()
    })
    .then(function(data){
        console.log(data);
        let lat = data[0].lat
        let lon = data[0].lon
        currentForecast, fiveDayWeather (lat, lon);
    })

}
function currentForecast(lat, lon) {
    let weatherAPI = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    fetch(weatherAPI)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data);

        let location = data.name;
        let temp = data.main.temp
        let humidity = data.main.humidity;
        let wind = data.wind.speed; 
        let degSymbol = `\u00B0`;
        let currentDate = dayjs(); 
        let description = data.weather[0].description;
        let icon = data.weather[0].icon;
        let weatherIcon = "http://openweathermap.org/img/wn/" + icon + ".png";
         
        console.log("The weather for today in " + location + " is: " + "Temperature: " + Math.floor(temp) + degSymbol + "F", 
        "Humidity: "+ humidity + "%",
        "Wind speed: " +Math.floor(wind) + "MPH", 
        icon,
        weatherIcon,
        "Current Conditions: " + description);
    
        $('#forecast-info').text("Forecast info for ");
        $('#current-date').text(currentDate.format('dddd, MMMM DD'));
        $('#location').text("In: " + location);
        document.querySelector(".icon").src = weatherIcon;
        $('#temp').text("Temperature: " + Math.floor(temp) + degSymbol + "F");
        $('#humidity').text("Humidity: "+ humidity + "%");
        $('#wind').text("Wind speed: " +Math.floor(wind) + " MPH");
        $('#description').text("Current conditions: " + description);
    })}
    //////////////////////////////////
function fiveDayWeather (lat, lon) {
                let weatherAPI = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
                fetch(weatherAPI)
                .then(function(response){
                    return response.json()
                })
                .then(function(data){
                    console.log(data);
                    let location = data.city.name;
                    let futureDate = data.list[0].dt_txt;
                    let temp = data.list[0].main.temp;
                    let humidity = data.list[0].main.humidity;
                    let wind = data.list[0].wind.speed; 
                    let degSymbol = `\u00B0`;
                    let description = data.list[0].weather[0].description;
                    let icon = data.list[0].weather[0].icon;
                    let weatherIcon = "http://openweathermap.org/img/wn/" + icon + ".png";
                    
                    
                    console.log("The weather for " + futureDate + "in " + location + " is: " + "Temperature: " + Math.floor(temp) + degSymbol + "F", 
                    "Humidity: "+ humidity + "%",
                    "Wind speed: " +Math.floor(wind) + "MPH", 
                    icon,
                    weatherIcon,
                    "Current Conditions: " + description);
                    
                })
            }
            let day0 = dayjs();
            let day1 = day0.add(1, 'day');
            let day2 = day0.add(2, 'day');
            let day3 = day0.add(3, 'day');
            let day4 = day0.add(4, 'day');
            let day5 = day0.add(5, 'day');
            // console.log(day0.format('dddd, MMMM DD')) 
            // console.log(day1.format('dddd, MMMM DD')) 
            // console.log(day2.format('dddd, MMMM DD'))
            // console.log(day3.format('dddd, MMMM DD'))
            // console.log(day4.format('dddd, MMMM DD'))
            // console.log(day5.format('dddd, MMMM DD'))
            for (let i = 0; i <5; i++) {
    // let APIDate = data.list[0].dt_txt;
            $('#day1').text(day1.format('dddd, MMMM DD'));
            $('#day2').text(day2.format('dddd, MMMM DD'));
            $('#day3').text(day3.format('dddd, MMMM DD'));
            $('#day4').text(day4.format('dddd, MMMM DD'));
            $('#day5').text(day5.format('dddd, MMMM DD'));
            }
            // console.log(APIDate);