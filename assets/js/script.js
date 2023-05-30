function latLongData(cityName) {
  let geoAPI =
    "https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}";
  fetch(geoAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data[0].lat);
      let lat = data[0].lat;
      let lon = data[0].lon;
      currentWeather(lat, lon);
    });
}

function currentWeather(lat, lon) {
  let weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  fetch(weatherAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let location = data.name;
      let temp = data.main.temp;
      let humidity = data.main.humidity;
      let wind = data.wind.speed;
      let description = data.weather[0].description;
      let icon = data.weather[0].icon;
      let weatherIcon = "https://openweathermap.org/img/wn/" + icon + ".png";
      let date = currentDay.format("dddd, MMMM DD");
      $("#current-date").text(" " + date);
      $("#location").text(location + ":");
      $("#weather-conditions").text("Current conditions: " + description);
      document.querySelector("#icon").src = weatherIcon;
      $("#temperature").text(
        "Temperature: " + Math.floor(temp) + degSymbol + "F"
      );
      $("#humidity").text("Humidity: " + humidity + "%");
      $("#wind-speed").text("Wind speed: " + wind + "mph");
      fiveDayForecast(lat, lon);
    });
}

function fiveDayForecast(lat, lon) {
  let weatherAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  fetch(weatherAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (i = 0; i < 40; i += 8) {
        document.getElementById("day" + (i + 8) + "Temp").innerHTML =
          "High Temp: " + Math.floor(data.list[i].main.temp_max) + degSymbol;
        document.getElementById("day" + (i + 8) + "Hum").innerHTML =
          "Humidity: " + Math.floor(data.list[i].main.humidity) + "%";
        document.getElementById("day" + (i + 8) + "Description").innerHTML =
          "Conditions: " + data.list[i].weather[0].description;
        document.getElementById("day" + (i + 8) + "Wind").innerHTML =
          "Wind Speed: " + data.list[i].wind.speed + "MPH";
        document.getElementById("img" + (i + 8)).src =
          "https://openweathermap.org/img/wn/" +
          data.list[i].weather[0].icon +
          ".png";
      }
      let day0 = dayjs();
      let day1 = day0.add(1, "day");
      let day2 = day0.add(2, "day");
      let day3 = day0.add(3, "day");
      let day4 = day0.add(4, "day");
      let day5 = day0.add(5, "day");
      var days = [
        day0.format("dddd, MMMM DD"),
        day1.format("dddd, MMMM DD"),
        day2.format("dddd, MMMM DD"),
        day3.format("dddd, MMMM DD"),
        day4.format("dddd, MMMM DD"),
        day5.format("dddd, MMMM DD"),
      ];
      for (i = 0; i < 5; i++) {
        document.getElementById("day" + (i + 1)).innerHTML = days[i];
      }
    });
}

let displayPastSearch = function (event) {
  let city = event.target.getAttribute("data-city");
  latAndLonData(city);
};

function defaultView() {
  document.getElementById("submit-btn").defaultValue = "Minneapolis";
  latLongData("Minneapolis");
}

init();

document
  .getElementById("city-list")
  .addEventListener("click", displayPastSearch);
document.getElementById("search-btn").addEventListener("click", userSubmission);
