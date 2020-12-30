
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
                    $("#currentTemp").text("Temperature " + tempC + " °C");
                    $("#currentWindSpeed").text("Wind Speed: " + responseOneCall.current.wind_speed + " mph");
                    $("#currentHumidity").text("Humidity: " + responseOneCall.current.humidity + " %");
                    $("#currentUvIndex").text("UV Index: " + responseOneCall.current.uvi);
                })
            });
    previousCities.push(searchedCity);
    var test = $("<button/>", {"class":"button", type:"button", "id":"previousCity"} );
    test[0].textContent = searchedCity;
    previousCitiesList.append(test[0]);
    $(".form-control")[0].value = "";
    } else {
        alert("You need to enter a city name.");
    };
}

$("#searchBtn").on('click', search);
$("#previousCity").on('click', console.log('previous'));