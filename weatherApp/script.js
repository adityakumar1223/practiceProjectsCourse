document.addEventListener("DOMContentLoaded", function (){

    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityName = document.getElementById("city-name");
    const temperature = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMsg = document.getElementById("error-message");

    const API_KEY  = "ce0b4219ae7f41b939c203c78077b949";

    getWeatherBtn.addEventListener("click", async ()=>{
        const city = cityInput.value.trim();
        if(!city) return; 

        //it may throw error
        //server/database is always in another continent so it takes time

        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            showError();
        }

    });

    async function fetchWeatherData(city){
        //fetches the weather data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

        const response = await fetch(url);
        console.log(typeof response);
        console.log("RESPONSE", response);

        if(!response.ok){
            throw new Error("City not found");
        };

        const data =  await response.json();
        return data;

    };

    function displayWeatherData(weatherData){
        //displays weather data
        console.log(weatherData);

        const {name, main, weather} = weatherData;
        cityName.textContent = name;


        //unlocking the display
        weatherInfo.classList.remove("hidden");
        errorMsg.classList.add("hidden");

        temperature.textContent = `Temperature : ${main.temp}`;
        descriptionDisplay.textContent = `Description : ${weather[0].description}`;
        
    };

    function showError(){
        weatherInfo.classList.add("hidden");
        errorMsg.classList.remove("hidden");
    };



});