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
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    let day = days[date.getDay()];
    return `${day}, ${hours}:${minutes}`;
}

function displayForecast(){
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = `
    <div id="forecast-row" class="row">
        <div class="col-3">
            <div class="forecast-date">Tomorrow´s Weather 👉</div> 
        </div>
            <div class="col-3"></div>
                <div class="col-3">
                        <div class="forecast-temp"> <span class="forecast-temp-max">17° </span> | <span class="forecast-temp-min">7°</span></div>
                </div>
            <div class="col-3">
                <img src="http://openweathermap.org/img/wn/10d@2x.png" 
                    alt=""
                    id="forecast-icon"
                    />
                </div>
         </div>
 `;
}

function showTemperature(response){

celsiusTemperature = response.data.main.temp;
let temperatureNumber = document.querySelector("#temperature-number-now");
temperatureNumber.innerHTML = Math.round(celsiusTemperature);

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

displayForecast();
searchCity("New York");