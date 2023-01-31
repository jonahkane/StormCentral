let currentDay = dayjs();
let degSymbol = `\u00B0`;
let apiKey = "26aab995b68ef9eaae3c5d668d386911";
let cityName = document.querySelector("#city-text");
let cityForm = document.querySelector("#city-form");
let searchButton = document.querySelector("#search-btn");
let cityList = document.querySelector('#city-list');
let cityCountSpan = document.querySelector('#city-count');
let cities = [];

function DefaultView () {
    document.getElementById("search-btn").defaultValue = "Minneapolis";
    latAndLonData("Minneapolis");
}
document.getElementById("search-btn").addEventListener("click", function(event) {
    event.preventDefault();
    let cityName = document.getElementById("city-text").value;
    latAndLonData(cityName);
})

function latAndLonData(cityName) {
    let geoAPI = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}` 
    fetch(geoAPI)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data);

        let lat = data[0].lat;
        let lon = data[0].lon;
        currentWather (lat, lon);
    })}

    function currentWather (lat, lon){
        let weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
        fetch(weatherAPI)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);

            let location = data.name;
            let temp = data.main.temp;
            let humidity = data.main.humidity;
            let wind = data.wind.speed; 
            let description = data.weather[0].description;
            let icon = data.weather[0].icon;
            let weatherIcon = "https://openweathermap.org/img/wn/" + icon + ".png";

            $('#current-date').text(currentDay.format('dddd, MMMM DD'));
            $('#location').text(location + " ");
            $('#weather-conditions').text("Current conditions: " + description);
            document.querySelector(".icon").src = weatherIcon;
            $('#temperature').text("Temperature: " + Math.floor(temp) + degSymbol + "F");
            $('#humidity').text("Humidity: " + humidity + "%");
            $('#wind-speed').text("Wind speed: " + wind + "mph");
            
fiveDayWeather (lat, lon);
            })}
function fiveDayWeather (lat, lon) {
    let weatherAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    fetch(weatherAPI)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data);

        for(i = 0; i<40; i+=8){
            document.getElementById("day" + (i+8) + "Temp").innerHTML = "Temp: " + Math.floor(data.list[i].main.temp) + degSymbol;
            document.getElementById("day" + (i+8) + "Hum").innerHTML = "Hum: " + Math.floor(data.list[i].main.humidity) + "%";
            document.getElementById("day" + (i+8) + "Description").innerHTML = "Conditions: " + data.list[i].weather[0].description;
            document.getElementById("day" + (i+8) + "Wind").innerHTML = "Wind Speed: " + data.list[i].wind.speed + "MPH";
            document.getElementById("img" + (i+8)).src = "https://openweathermap.org/img/wn/"+
            data.list[i].weather[0].icon
            +".png";
        }

        let day0 = dayjs();
        let day1 = day0.add(1, 'day');
        let day2 = day0.add(2, 'day');
        let day3 = day0.add(3, 'day');
        let day4 = day0.add(4, 'day');
        let day5 = day0.add(5, 'day');
        var days = [day0.format('dddd, MMMM DD'), day1.format('dddd, MMMM DD'), day2.format('dddd, MMMM DD'), day3.format('dddd, MMMM DD'), day4.format('dddd, MMMM DD'), day5.format('dddd, MMMM DD')];
        for(i = 0; i<5; i++){
            document.getElementById("day" + (i+1)).innerHTML = days[i];
        }
    })}
    
    function renderCities() {
        cityList.innerHTML = "";
        cityCountSpan.textContent = cities.length;
      
        for (let i = 0; i < cities.length; i++) {
          let city = cities[i];
      
          let li = document.createElement("li");
          li.textContent = city;
          li.setAttribute("data-index", i);
      
          let button = document.createElement("button");
          button.textContent = "Remove";
      
          li.appendChild(button);
          cityList.appendChild(li);
        }
      }
      
      function init() {
        let storedCities = JSON.parse(localStorage.getItem("cities"));
      
        if (storedCities !== null) {
          cities = storedCities;
        }
      
        renderCities();
      }
      
      function storeCities() {
        localStorage.setItem("cities", JSON.stringify(cities));
      }
      
      cityForm.addEventListener("submit", function(event) {
        event.preventDefault();
      
       let cityText = cityName.value.trim();
      
        if (cityText === "") {
          return;
        }
      
        cities.push(cityText);
        cityName.value = "";
      
        storeCities();
        renderCities();
        latAndLonData(cityText);

      });
      searchButton.addEventListener("click", function(event) {
        event.preventDefault();
      
       let cityText = cityName.value.trim();
      
        if (cityText === "") {
          return;
        }
      
        cities.push(cityText);
        cityName.value = "";
      
        storeCities();
        renderCities();
        latAndLonData(cityText);


      });
      
      cityList.addEventListener("click", function(event) {
        let element = event.target;
        if (element.matches("button") === true) {
          let index = element.parentElement.getAttribute("data-index");
          cities.splice(index, 1);
          storeCities();
          renderCities();
        }
      });
      
      init()
      