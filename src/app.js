function showTemperature(response){
    console.log(response.data);
let temperatureNumber = document.querySelector("#temperature-number-now");
temperatureNumber.innerHTML = Math.round(response.data.main.temp);

let cityElement = document.querySelector("#city");
cityElement.innerHTML = response.data.name;

let descriptionStatus = document.querySelector("#temperature-status-now");
descriptionStatus.innerHTML = response.data.weather[0].description;

let humidityStatus = document.querySelector("#humidity-now");
humidityStatus.innerHTML = Math.round(response.data.main.humidity);

let windStatus = document.querySelector("#wind-now");
windStatus.innerHTML =Math.round(response.data.wind.speed);

}
let apiKey="338ad8d174dc01460bda54dd03bef62b";
let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;


axios.get(apiUrl).then(showTemperature);