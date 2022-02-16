function formatDate(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10){
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10){
    minutes = `0${minutes}`;
    }
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day = days[date.getDay()];
    return `${day}, ${hours}:${minutes}`;
}

function displayForecast(response){
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    
    let forecastHTML = "";
    forecast.forEach(function(forecastDay){
    forecastHTML = `
    <div id="forecast-row" class="row">
        <div class="col-4">
            <div class="forecast-date">Tomorrow's Weather</div> 
        </div>
        <div class="col-4">
                <img 
                    src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
                    alt=""
                    id="forecast-icon"
                />
                </div>
            <div class="col-4">
                <div id="forecast-temp"> <span class="forecast-temp-max">${Math.round(forecastDay.temp.max)}°C </span>  |  <span class="forecast-temp-min">${Math.round(forecastDay.temp.min)}°C </span></div>
                </div>
         </div>
 `;
 forecastElement.innerHTML=forecastHTML;
});
}

function getForecast(coordinates){
let apiKey="338ad8d174dc01460bda54dd03bef62b";
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}


function showTemperature(response){

      
celsiusTemperature = response.data.main.temp;
let temperatureNumber = document.querySelector("#temperature-number-now");
temperatureNumber.innerHTML = Math.round(celsiusTemperature);

function updateHeading(newheading) {
let heading = document.querySelector("#emoji");
heading.innerHTML = newheading;
}
function changeBackground(color) {
document.body.style.background = color;
}
function changeCard(cardColor){
document.getElementById("info").style.background = cardColor;
}

function changeIcon(iconColor){
document.getElementById("icon").style.background = iconColor;
}

if (celsiusTemperature <= 11) {
    updateHeading  `🥶`;
    changeBackground `radial-gradient(circle at 10% 20%, rgb(242, 235, 243) 0%, rgb(234, 241, 249) 90.1%`;
    changeCard `linear-gradient(to bottom, #f3e7e9 0%, #b6cff5 160%, #b6cff5 250%)`;
    changeIcon `rgb(206, 216, 245)`;

  } else {
    if (celsiusTemperature >= 12 & celsiusTemperature < 24 ) {
        updateHeading  `☺️`;
        changeBackground `linear-gradient(111.5deg, rgb(228, 247, 255) 21.9%, rgb(255, 216, 194) 92.2%`;
        changeCard `linear-gradient(to bottom, #fff1eb 0%, #ace0f9 100%)`;
        changeIcon `rgb(192, 228, 240)`;
 
    } else {
        updateHeading `😎`;
        changeBackground `radial-gradient(circle at 10% 20%, rgb(209, 231, 235) 7.4%, rgb(238, 219, 199) 51.4%,rgb(255, 109, 58) 180.2%, rgb(255, 159, 122) 82.6%`;
        changeCard `linear-gradient(111.4deg, rgb(209, 231, 235) 7.4%, rgb(238, 219, 199) 51.4%, rgb(255, 159, 122) 82.6%, rgb(255, 109, 58) 160.2%`;
        changeIcon `rgb(243, 210, 182)`;
    }
  }

let cityElement = document.querySelector("#city");
cityElement.innerHTML = response.data.name;

let descriptionStatus = document.querySelector("#temperature-status-now");
descriptionStatus.innerHTML = response.data.weather[0].description;

let humidityStatus = document.querySelector("#humidity-now");
humidityStatus.innerHTML = Math.round(response.data.main.humidity);

let windStatus = document.querySelector("#wind-now");
windStatus.innerHTML =Math.round(response.data.wind.speed);

let dateElement = document.querySelector("#date");
dateElement.innerHTML = formatDate(response.data.dt * 1000);

let iconElement = document.querySelector("#icon"); 
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`); 
iconElement.setAttribute("alt", response.data.weather[0].description);

getForecast(response.data.coord);

}

function searchCity(city){
   let apiKey="338ad8d174dc01460bda54dd03bef62b";
   let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event){
    event.preventDefault();
    let city = document.querySelector("#search-city-input").value;
    searchCity(city);
}

function searchLocation(position){
    let apiKey ="338ad8d174dc01460bda54dd03bef62b";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);
}
    
function getCurrenLocation(event){
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}
    
let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrenLocation);

function displayFahrenheitTemperature(event){
    event.preventDefault();
    let temperatureNumber = document.querySelector("#temperature-number-now");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureNumber.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event){
    event.preventDefault();
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
    let temperatureNumber = document.querySelector("#temperature-number-now");
    temperatureNumber.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature =null;

let form = document.querySelector("#search-form");
form.addEventListener("submit",handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchCity("New York");