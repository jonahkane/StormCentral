// I created a 2nd java script document to test a few theories without completely destroying the code that i had built in my first script.js file
// once i had the page working, deleted script.js file, script2.js remained, i left it incorporated as titled.


// declaring variables here
let currentDay = dayjs();
let degSymbol = `\u00B0`;
let apiKey = "26aab995b68ef9eaae3c5d668d386911";
let cityInput = document.querySelector("#city-text");
let cityForm = document.querySelector("#city-form");
let searchButton = document.querySelector("#search-btn");
let cityList = document.querySelector('#city-list');
let cityCountSpan = document.querySelector('#city-count');
let clickMeEl = document.querySelector("#city-list-buttons");
let cities = [];

// function that starts the list of previously searched cities and turns them into buttons that can be clicked to display weather data again
function renderCities() {
    cityList.innerHTML = '';
    cityCountSpan.textContent = cities.length;
    for (var i = 0; i < cities.length; i++) {
    var city = cities[i];
    var clickMe = document.createElement("button");
    clickMe.textContent = city;
    clickMe.classList = "previous-searches btn btn-secondary m-1";
    clickMe.setAttribute("data-city", city);
    clickMe.setAttribute("data-index", i);
    clickMe.setAttribute("type", "submit");
    cityList.appendChild(clickMe);
}
}
// pulling list of cities from local storage
function init () {
    let storedCities = JSON.parse(localStorage.getItem("cities"));
    if (storedCities !== null) {
        cities = storedCities;
    }
    // sends data to function called render cities
    renderCities();
}
// storing data to local storage to be pulled later
function storeCities () {
    localStorage.setItem("cities", JSON.stringify(cities));
}

// running a function when the user submits a search
function userSubmission (event) {
event.preventDefault()

let cityText = cityInput.value;

if (cityText === "") {
    return;
}
cities.push(cityText);
cityInput.value = "";
// the input city value is taken by this function and sent to the following 3 functions
latAndLonData(cityText);
storeCities();
renderCities();
};

// the city that the user inputs is then run through the openweathermap api to obtain lat and lon data.

function latAndLonData(cityName) {
    let geoAPI = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}` 
    fetch(geoAPI)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data);
// here we are storing lat and lon data as variables  
        console.log((data[0].lat));
        let lat = data[0].lat;
        let lon = data[0].lon;
        // and then we pass that data into the current weather function
        currentWeather (lat, lon);
    })}
    // using the lat and lon data found in the previous function/api call, we input the coordinates into a new function and API call which pulls weather data for us
    // this api was ONLY for "current weather data" and NOT forecast data
    function currentWeather (lat, lon){
        let weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
        fetch(weatherAPI)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            // here we are disecting the data from the API pull and assigning variable names to the specific pieces of data we want
            let location = data.name;
            let temp = data.main.temp;
            let humidity = data.main.humidity;
            let wind = data.wind.speed; 
            let description = data.weather[0].description;
            let icon = data.weather[0].icon;
            let weatherIcon = "https://openweathermap.org/img/wn/" + icon + ".png";
            let date = currentDay.format('dddd, MMMM DD')
  
            // here we are taking the data that we pulled from the API (and our assigned variables) and displaying that information within our page
            $('#current-date').text(" " + date);
            $('#location').text(location + ":");
            $('#weather-conditions').text("Current conditions: " + description);
            document.querySelector("#icon").src = weatherIcon;
            $('#temperature').text("Temperature: " + Math.floor(temp) + degSymbol + "F");
            $('#humidity').text("Humidity: " + humidity + "%");
            $('#wind-speed').text("Wind speed: " + wind + "mph");
            
            // we are also taking that same lat and lon data provided above and sending to our next function
            fiveDayWeather (lat, lon);
  
        })}
// once again using the lat and lon data from above we enter into a new api pull which gives us weather data for the next 5 days over 3 hour increments
        function fiveDayWeather (lat, lon) {
            let weatherAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
            fetch(weatherAPI)
            .then(function(response){
                return response.json()
            })
            .then(function(data){
                console.log(data);
        // i felt my code was getting too jumbled so I used a for loop to iterate across the 5 days forecast needed for this project.  
        // the index and index increments here are also adjusted to account for the 3 hour increments of data provided with the API call
        // if i simply used i<5 and i++, my five "days" would have been weather data at 3 hours, 6 hours, 9 hours, 12 hours and 15 hours
        // to adjust, i increased my index by 8 units, or 24 hours each time
                for(i = 0; i<40; i+=8){
                    document.getElementById("day" + (i+8) + "Temp").innerHTML = "High Temp: " + Math.floor(data.list[i].main.temp_max) + degSymbol;
                    document.getElementById("day" + (i+8) + "Hum").innerHTML = "Humidity: " + Math.floor(data.list[i].main.humidity) + "%";
                    document.getElementById("day" + (i+8) + "Description").innerHTML = "Conditions: " + data.list[i].weather[0].description;
                    document.getElementById("day" + (i+8) + "Wind").innerHTML = "Wind Speed: " + data.list[i].wind.speed + "MPH";
                    document.getElementById("img" + (i+8)).src = "https://openweathermap.org/img/wn/"+
                    data.list[i].weather[0].icon
                    +".png";
                }
        // here I am using Day JS to populate today's date and then adding 1 day each time to get "tomorow's date" and the following days
                let day0 = dayjs();
                let day1 = day0.add(1, 'day');
                let day2 = day0.add(2, 'day');
                let day3 = day0.add(3, 'day');
                let day4 = day0.add(4, 'day');
                let day5 = day0.add(5, 'day');
                var days = [day0.format('dddd, MMMM DD'), day1.format('dddd, MMMM DD'), day2.format('dddd, MMMM DD'), day3.format('dddd, MMMM DD'), day4.format('dddd, MMMM DD'), day5.format('dddd, MMMM DD')];
                for(i = 0; i<5; i++){
                    // here i am displaying the day adn date at the top of each weather forecast card
                    document.getElementById("day" + (i+1)).innerHTML = days[i];
                    
                }
            })}
        
            // this function displays the weather data when the user clicks on a city name in the list of previously searched cities, takes the city name, feeds it 
            // back into the latandlondata function and starts all over again with the process
  let displayPastSearch = function(event) {
    let city = event.target.getAttribute("data-city")
    latAndLonData(city);
  }
  
  // I did not like the blank page when a user would visit the site, so i created a default view that would render when the page was fully loaded.  
//   i chose minneapolis simply because of where i live.
  function DefaultView () {
    document.getElementById("search-btn").defaultValue = "Minneapolis";
    latAndLonData("Minneapolis");
  }
  
init();
// adding event listeners.  
// this one is for when the user clicks the previously searched cities.  it will call the function to displaypastsearch and render the data to the forecast fields
document.getElementById("city-list").addEventListener("click", displayPastSearch);
// this function is for when the user searches for a city.  it allows the user to click the button (or hit enter on the keyboard) and then
// it will run the city name thorugh the functions listed above to pull all weather data and save the city to the list of previous searches
document.getElementById("search-btn").addEventListener("click", userSubmission)