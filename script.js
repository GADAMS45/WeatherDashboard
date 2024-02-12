var savedCities = JSON.parse(localStorage.getItem("cities")) || [];


function getCurrentWeather() {
    var cityInput = document.querySelector("#search-input").value;

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&units=imperial&appid=d938d2c4e83e9ab4e49b06abd7244def")
        .then(res => res.json())
        .then(data => {
            console.log(data)

            var alreadyExists = savedCities.includes(data.name);

            if(alreadyExists) {
                console.log("City already saved")
            } else {
                // save to local storage
                savedCities.push(data.name);
                localStorage.setItem("cities", JSON.stringify(savedCities))
            }

            // Render the data into the HTML
            document.querySelector("#city-name").textContent = data.name;

            document.querySelector("#current-icon").src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"

            document.querySelector("#current-temp").textContent = "Temp: " + data.main.temp

            document.querySelector("#current-wind").textContent = "Wind: " + data.wind.speed

            document.querySelector("#current-humidity").textContent = "Humidity: " + data.main.humidity


            getForecastWeather()


        })
}

function getForecastWeather() {
    var cityInput = document.querySelector("#search-input").value;

    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&units=imperial&appid=d938d2c4e83e9ab4e49b06abd7244def")
        .then(res => res.json())
        .then(data => {
            console.log(data)

            // handpick the data from list

            var selectedData = [
                data.list[4],
                data.list[12],
                data.list[20],
                data.list[28],
                data.list[36]
            ]

            console.log(selectedData)

            // Render the data into the HTML
            document.querySelector(".forecast-container").innerHTML = ""

            for (i = 0; i < 5; i++) {

                var newCard = document.createElement("div");
                newCard.classList.add('card');
                newCard.innerHTML = `
                <div class="card-header">
                    ${selectedData[i].dt_txt}
                    <img id="future-icon" src="https://openweathermap.org/img/wn/${selectedData[i].weather[0].icon}@2x.png"/>
                </div>
                <ul class="list-group list-group-flush">
                    <li id= "future-temp" class="list-group-item">Temp ${selectedData[i].main.temp}</li>
                    <li id= "future-wind" class="list-group-item">Wind ${selectedData[i].wind.speed}</li>
                    <li id="future-humidity" class="list-group-item">Humidity ${selectedData[i].main.humidity} </li>
                </ul>
                `
            
                document.querySelector(".forecast-container").append(newCard)
            }
            


        })
}


document.querySelector("#search-btn").addEventListener("click", getCurrentWeather);

function historyClick (event) {
    document.querySelector("#search-input").value = event.target.textContent;

    getCurrentWeather();
}



for(i =0; i < savedCities.length; i++) {
    var newButton = document.createElement("button");
    newButton.classList = "btn btn-outline-secondary w-100 my-1";
    newButton.textContent = savedCities[i]
    newButton.addEventListener('click', historyClick)

    document.querySelector(".search-history").append(newButton)
}