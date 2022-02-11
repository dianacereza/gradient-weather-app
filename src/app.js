function showTemperature(response){
let temperatureNumber = document.querySelector("#temperature-number-now");
temperatureNumber.innerHTML = Math.round(response.data.main.temp);

let cityElement = document.querySelector("#city");
cityElement.innerHTML = response.data.name;
}
let apiKey="338ad8d174dc01460bda54dd03bef62b";
let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;


axios.get(apiUrl).then(showTemperature);