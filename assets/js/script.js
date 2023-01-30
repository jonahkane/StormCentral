let futureWeather = document.querySelector(".fiveDay");
let currentDate = dayjs(); 
// console.log("today's date is: " + currentDate.format('dddd, MMMM DD'));

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
        currentWeather (lat, lon);
    })}
function currentWeather(lat, lon) {
    let weatherAPI = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    fetch(weatherAPI)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data);

        let location = data.name;
        let temp = data.main.temp;
        let humidity = data.main.humidity;
        let wind = data.wind.speed; 
        let degSymbol = `\u00B0`;
        let description = data.weather[0].description;
        let icon = data.weather[0].icon;
        let weatherIcon = "http://openweathermap.org/img/wn/" + icon + ".png";
        console.log("The weather for today in " + location + " is: " + "Temperature: " + Math.floor(temp) + degSymbol + "F", 
        "Humidity: "+ humidity + "%",
        "Wind speed: " +Math.floor(wind) + "MPH", 
        icon,
        weatherIcon,
        "Current Conditions: " + description);
        
        $('#forecast-info').text("Current weather info for ");
        $('#current-date').text(currentDate.format('dddd, MMMM DD'));
        $('#location').text("In: " + location);
        document.querySelector(".icon").src = weatherIcon;
        $('#temp').text("Temperature: " + Math.floor(temp) + degSymbol + "F");
        $('#humidity').text("Humidity: "+ humidity + "%");
        $('#wind').text("Wind speed: " +Math.floor(wind) + " MPH");
        $('#description').text("Current conditions: " + description);
        fiveDayWeather (lat, lon);
    })}
    //////////////////////////////////
    function fiveDayWeather (lat, lon) {
        let weatherAPI = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
        let degSymbol = `\u00B0`;
        fetch(weatherAPI)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            console.log(data);
            
            
            
            // let day0 = dayjs();
            // let day1 = day0.add(1, 'day');
            // let day2 = day0.add(2, 'day');
            // let day3 = day0.add(3, 'day');
            // let day4 = day0.add(4, 'day');
            // let day5 = day0.add(5, 'day');
            
            
            
            for (let i = 0; i < 5; i++) {
            // var days = [day1.format('dddd, MMMM DD'), day2.format('dddd, MMMM DD'), day3.format('dddd, MMMM DD'), day4.format('dddd, MMMM DD'), day5.format('dddd, MMMM DD')];
            let card = document.createElement("div");
            let weather = document.createElement("ul");
            let date = document.createElement("li");
            let temp = document.createElement("li");
            let hum = document.createElement("li");
            let wind = document.createElement("li");
            let conditions = document.createElement("li");
            // let newLI = document.createElement("li");
            // newLI.setAttribute("id", "icon");
            // let newIcon = document.createElement("img");
            
            // img.src = "http://openweathermap.org/img/wn/" + fIcon + ".png"; 
            
            
            
            let fDate = data.list[i].dt_txt;
            let fDescription = data.list[i].weather[0].description;
            let fIcon = data.list[i].weather[0].icon;
            let fTemp = data.list[i].main.temp;
            let fHum = data.list[i].main.humidity;
            let fWind = data.list[i].wind.speed;
            let fWeatherIcon = "http://openweathermap.org/img/wn/" + fIcon + ".png";     
            
            // newIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + fIcon + ".png");
            // document.getElementById("#icon").appendChild(newIcon);
            // newIcon.appendChild(newLI);
            
            date.innerHTML = "the date is " + fDate;
            conditions.innerHTML = "Current conditions: " + fDescription + " " + fWeatherIcon;
            temp.innerHTML = "Temp.: " + fTemp + degSymbol + "F";
            hum.innerHTML = "Humidity: " + fHum + " %";
            wind.innerHTML = "Wind: " + fWind + " MPH";
            // let location = data.city.name;
            // let weatherIcon = "http://openweathermap.org/img/wn/" + fIcon + ".png";        
            
            card.setAttribute("class", "col-auto card");
            futureWeather.appendChild(card);
            card.appendChild(weather);
            weather.appendChild(date);
            weather.appendChild(conditions);
            weather.appendChild(temp);
            weather.appendChild(hum);
            weather.appendChild(wind);
            // weather.appendChild(elem1);
        
        
        
        // console.log("The weather for " + fDate + " in " + location + " is: " + "Temperature: " + Math.floor(fTemp) + degSymbol + "F", 
        // "Humidity: "+ fHum + "%",
        // "Wind speed: " +Math.floor(fWind) + "MPH", 
        // fIcon,
        // weatherIcon,
        // "Current Conditions: " + fDescription);
    }
    });
  };

                        // let card = document.createElement("div");
        // let futureDate = document.createElement("ul");
        // let futureTemperature = document.createElement("li");
        // let futureHumidity = document.createElement("li");
        // let futureWind = document.createElement("li");
        // let futureDegSymbol = `\u00B0`;
        // let futureDescription = data.list[0].weather[0].description;
        // let futureIcon = data.list[0].weather[0].icon;
        // let futureWeatherIcon = "http://openweathermap.org/img/wn/" + futureIcon + ".png";

        // futureTemperature.innerHTML = "Temperature: " + data.list[i].main.temp + futureDegSymbol + " F";
        // futureHumidity.innerHTML = "Humidity: " + data.list[i].main.humidity + " %";
        // futureWind.innerHTML = "Wind: " + data.list[i].wind.speed + " MPH";
        // card.setAttribute("class", "card");

        // futureWeather.appendChild(card);
        // card.appendChild(futureDate);
        // futureDate.appendChild(futureWeatherIcon);
        // futureDate.appendChild(futureDescription);
        // futureDate.appendChild(futureTemperature);
        // futureDate.appendChild(futureHumidity);
        // futureDate.appendChild(futureWind);



                    // let location = data.city.name;
                    // let futureDate = data.list[0].dt_txt;
                    // let temp = data.list[0].main.temp;
                    // let humidity = data.list[0].main.humidity;
                    // let wind = data.list[0].wind.speed; 
                    // let degSymbol = `\u00B0`;
                    // let description = data.list[0].weather[0].description;
                    // let icon = data.list[0].weather[0].icon;
                    // let weatherIcon = "http://openweathermap.org/img/wn/" + icon + ".png";
                    



            // $('#day1').text(day1.format('dddd, MMMM DD'));
            // $('#day2').text(day2.format('dddd, MMMM DD'));
            // $('#day3').text(day3.format('dddd, MMMM DD'));
            // $('#day4').text(day4.format('dddd, MMMM DD'));
            // $('#day5').text(day5.format('dddd, MMMM DD'));
            