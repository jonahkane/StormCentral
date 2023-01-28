   
//lat and long data,
//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

let apiKey = "c98e2acdd96b3a859a933d44be6055e7"

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
        fiveDayWeather(lat, lon);
    })

}

function fiveDayWeather (lat, lon) {
    let weatherAPI = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    fetch(weatherAPI)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data);
    })

}
