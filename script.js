function getCurrentWeather() {
    var cityInput = document.querySelector("#search-input").value;

        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&units=imperial&appid=d938d2c4e83e9ab4e49b06abd7244def")
            .then(res => res.json())
            .then(data => {
                console.log(data)

                // Render the data into the HTML
                document.querySelector("#city-name").textContent = data.name;

                document.querySelector("#current-temp").textContent = "Temp: " + data.main.temp

                document.querySelector("#current-wind").textContent = "Wind: " + data.wind.speed

                document.querySelector("#current-humidity").textContent = "Humidity: " + data.main.humidity


            })


            document.querySelector("#city-name").textContent = data.name;

                document.querySelector("#future-temp").textContent = "Temp: " + data.main.temp

                document.querySelector("#future-wind").textContent = "Wind: " + data.wind.speed

                document.querySelector("#future-humidity").textContent = "Humidity: " + data.main.humidity

}

document.querySelector("#search-btn").addEventListener("click", getCurrentWeather)