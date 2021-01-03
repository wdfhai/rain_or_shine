
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
                    var icon = responseOneCall.current.weather[0].icon;
                    var utcOffset = ((responseOneCall.timezone_offset)/60);
                    console.log(utcOffset);
                    $("#currentDateAndTime")[0].textContent = moment().utcOffset(utcOffset).format('LLLL');
                    $("#currentWeather").attr("src", "http://openweathermap.org/img/wn/"+icon+"@2x.png");
                    $("#currentTemp").text("Temperature " + tempC + " °F");
                    $("#currentWindSpeed").text("Wind Speed: " + responseOneCall.current.wind_speed + " mph");
                    $("#currentHumidity").text("Humidity: " + responseOneCall.current.humidity + " %");
                    var uviValue = responseOneCall.current.uvi;
                    var uviBtn = $("<button/>", {"class":"btn-sm", type:"button", "id":"uviValueBtn"});
                    uviBtn[0].textContent = uviValue;
                    uviBtn[0].disabled = true;
                    if (uviValue <= 2){
                        uviBtn[0].style.backgroundColor = 'lightgreen';
                        $("#currentUvIndex").append(uviBtn[0]);
                    } else if ((uviValue >= 2) && (uviValue <= 5)) {
                        uviBtn[0].style.backgroundColor = 'yellow';
                        $("#currentUvIndex").append(uviBtn[0]);
                    } else if ((uviValue >= 6) && (uviValue <= 7)){
                        uviBtn[0].style.backgroundColor = 'orange';
                        $("#currentUvIndex").append(uviBtn[0]);
                    } else if ((uviValue >= 8) && (uviValue <= 10)) {
                        uviBtn[0].style.backgroundColor = 'red';
                        $("#currentUvIndex").append(uviBtn[0]);
                    } else {
                        uviBtn[0].style.backgroundColor = 'violet';
                        $("#currentUvIndex").append(uviBtn[0]);
                    };
                    $("#fiveDayForecast")[0].style.display = "flex";
                    $("#forecastOneDate")[0].textContent = moment().utcOffset(utcOffset).add(1, 'd').format('ddd, MMM DD');
                    $("#forecastOneWeather").attr("src", "http://openweathermap.org/img/wn/"+responseOneCall.daily[0].weather[0].icon+"@2x.png");
                    $("#forecastOneTemp").text("Temp: Max: " + Math.round(((responseOneCall.daily[0].temp.max - 273.15)*(9/5))+32) + "°F, Min: " + Math.round(((responseOneCall.daily[0].temp.min - 273.15)*(9/5))+32) + "°F");
                    $("#forecastOneHumidity").text("Humidity: " + responseOneCall.daily[0].humidity + "%");
                    $("#forecastTwoDate")[0].textContent = moment().utcOffset(utcOffset).add(2, 'd').format('ddd, MMM DD');
                    $("#forecastTwoWeather").attr("src", "http://openweathermap.org/img/wn/"+responseOneCall.daily[1].weather[0].icon+"@2x.png");
                    $("#forecastTwoTemp").text("Temp: Max: " + Math.round(((responseOneCall.daily[1].temp.max - 273.15)*(9/5))+32) + "°F, Min: " + Math.round(((responseOneCall.daily[1].temp.min - 273.15)*(9/5))+32) + "°F");
                    $("#forecastTwoHumidity").text("Humidity: " + responseOneCall.daily[1].humidity + "%");
                    $("#forecastThreeDate")[0].textContent = moment().utcOffset(utcOffset).add(3, 'd').format('ddd, MMM DD');
                    $("#forecastThreeWeather").attr("src", "http://openweathermap.org/img/wn/"+responseOneCall.daily[2].weather[0].icon+"@2x.png");
                    $("#forecastThreeTemp").text("Temp: Max: " + Math.round(((responseOneCall.daily[2].temp.max - 273.15)*(9/5))+32) + "°F, Min: " + Math.round(((responseOneCall.daily[2].temp.min - 273.15)*(9/5))+32) + "°F");
                    $("#forecastThreeHumidity").text("Humidity: " + responseOneCall.daily[2].humidity + "%");
                    $("#forecastFourDate")[0].textContent = moment().utcOffset(utcOffset).add(4, 'd').format('ddd, MMM DD');
                    $("#forecastFourWeather").attr("src", "http://openweathermap.org/img/wn/"+responseOneCall.daily[3].weather[0].icon+"@2x.png");
                    $("#forecastFourTemp").text("Temp: Max: " + Math.round(((responseOneCall.daily[3].temp.max - 273.15)*(9/5))+32) + "°F, Min: " + Math.round(((responseOneCall.daily[3].temp.min - 273.15)*(9/5))+32) + "°F");
                    $("#forecastFourHumidity").text("Humidity: " + responseOneCall.daily[3].humidity + "%");
                    $("#forecastFiveDate")[0].textContent = moment().utcOffset(utcOffset).add(5, 'd').format('ddd, MMM DD');
                    $("#forecastFiveWeather").attr("src", "http://openweathermap.org/img/wn/"+responseOneCall.daily[4].weather[0].icon+"@2x.png");
                    $("#forecastFiveTemp").text("Temp: Max: " + Math.round(((responseOneCall.daily[4].temp.max - 273.15)*(9/5))+32) + "°F, Min: " + Math.round(((responseOneCall.daily[4].temp.min - 273.15)*(9/5))+32) + "°F");
                    $("#forecastFiveHumidity").text("Humidity: " + responseOneCall.daily[4].humidity + "%");
                })
            });
    previousCities.push(searchedCity);
    $("#previousContainer")[0].style.display = "block";
    var dynBtn = $("<div/>", {"class":"button btn-info btn-lg mb-2", type:"button", "id":"previousCity"});
    dynBtn[0].textContent = searchedCity;
    previousCitiesList.append(dynBtn[0]);
    $(".form-control")[0].value = "";
    // icons();
    } else {
        alert("You need to enter a city name.");
    };
}

// function icons (){
//     var cW = $("#currentWeather")[0];
//     var cWT = cW.textContent;
//     var cWTA = cWT.split("");
//     console.log(cWT);
//     console.log(cWTA);
// }

$("#searchBtn").on('click', search);
$("#previousCity").on('click', console.log('previous'));