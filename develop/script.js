
$("#currentDateAndTime")[0].textContent = moment().format('LLLL');
$("#forecastOneDate")[0].textContent = moment().add(1, 'd').format('ddd, MMM DD');
$("#forecastTwoDate")[0].textContent = moment().add(2, 'd').format('ddd, MMM DD');
$("#forecastThreeDate")[0].textContent = moment().add(3, 'd').format('ddd, MMM DD');
$("#forecastFourDate")[0].textContent = moment().add(4, 'd').format('ddd, MMM DD');
$("#forecastFiveDate")[0].textContent = moment().add(5, 'd').format('ddd, MMM DD');

var currentCity = "";
var searchedCity = "";
var previousCities = [];
var previousCitiesList = $("#previousCities")[0];
var previousCitiesButtons = $(".button")[0];

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&appid=0d98e0477d04a50c6eee875a618c9c74"


function search(event){
    event.preventDefault();
    var searchedCity = $(".form-control")[0].value;
    if (!(searchedCity === "")){
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&appid=0d98e0477d04a50c6eee875a618c9c74",
            method: "GET"
            })
            .then(function(response) {
                console.log(response);
                var lon = parseInt(response.coord.lon);
                var lat = parseInt(response.coord.lat);
            $.ajax({
                url: "http://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&appid=0d98e0477d04a50c6eee875a618c9c74",
                method: "GET"
                })
                .then(function(responseOneCall) {
                    console.log(responseOneCall);
                    $("#cityName").html(response.name);
                    $("#cityLocation").html(response.sys.country);
                    var tempK = parseInt(responseOneCall.current.temp);
                    var tempC = Math.round(((tempK - 273.15)*(9/5))+32);
                    $("#currentTemp").text("Temperature " + tempC + " °F");
                    $("#currentWindSpeed").text("Wind Speed: " + responseOneCall.current.wind_speed + " mph");
                    $("#currentHumidity").text("Humidity: " + responseOneCall.current.humidity + " %");
                    $("#currentUvIndex").text("UV Index: " + responseOneCall.current.uvi);
                    $("#forecastOneForecast").text(responseOneCall.daily[0].weather[0].description);
                    $("#forecastOneTemp").text("Temp: Max: " + Math.round(((responseOneCall.daily[0].temp.max - 273.15)*(9/5))+32) + "°F, Min: " + Math.round(((responseOneCall.daily[0].temp.min - 273.15)*(9/5))+32) + "°F");
                    $("#forecastOneHumidity").text("Humidity: " + responseOneCall.daily[0].humidity + "%");
                    $("#forecastTwoForecast").text(responseOneCall.daily[1].weather[0].description);
                    $("#forecastTwoTemp").text("Temp: Max: " + Math.round(((responseOneCall.daily[1].temp.max - 273.15)*(9/5))+32) + "°F, Min: " + Math.round(((responseOneCall.daily[1].temp.min - 273.15)*(9/5))+32) + "°F");
                    $("#forecastTwoHumidity").text("Humidity: " + responseOneCall.daily[1].humidity + "%");
                    $("#forecastThreeForecast").text(responseOneCall.daily[2].weather[0].description);
                    $("#forecastThreeTemp").text("Temp: Max: " + Math.round(((responseOneCall.daily[2].temp.max - 273.15)*(9/5))+32) + "°F, Min: " + Math.round(((responseOneCall.daily[2].temp.min - 273.15)*(9/5))+32) + "°F");
                    $("#forecastThreeHumidity").text("Humidity: " + responseOneCall.daily[2].humidity + "%");
                    $("#forecastFourForecast").text(responseOneCall.daily[3].weather[0].description);
                    $("#forecastFourTemp").text("Temp: Max: " + Math.round(((responseOneCall.daily[3].temp.max - 273.15)*(9/5))+32) + "°F, Min: " + Math.round(((responseOneCall.daily[3].temp.min - 273.15)*(9/5))+32) + "°F");
                    $("#forecastFourHumidity").text("Humidity: " + responseOneCall.daily[3].humidity + "%");
                    $("#forecastFiveForecast").text(responseOneCall.daily[4].weather[0].description);
                    $("#forecastFiveTemp").text("Temp: Max: " + Math.round(((responseOneCall.daily[4].temp.max - 273.15)*(9/5))+32) + "°F, Min: " + Math.round(((responseOneCall.daily[4].temp.min - 273.15)*(9/5))+32) + "°F");
                    $("#forecastFiveHumidity").text("Humidity: " + responseOneCall.daily[4].humidity + "%");
                })
            });
    previousCities.push(searchedCity);
    var test = $("<button/>", {"class":"button btn-primary", type:"button", "id":"previousCity"});
    test[0].textContent = searchedCity;
    previousCitiesList.append(test[0]);
    $(".form-control")[0].value = "";
    } else {
        alert("You need to enter a city name.");
    };
}

$("#searchBtn").on('click', search);
$("#previousCity").on('click', console.log('previous'));