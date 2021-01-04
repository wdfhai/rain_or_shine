
const currentCity = "";
const searchedCity = "";
const previousCities = [];
const previousCitiesList = $("#previousCities")[0];
const previousCitiesButtons = $("#previousCitiesButtons");
const storedCities = [];

const queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&appid=0d98e0477d04a50c6eee875a618c9c74"

function previousSearches(){
    if (storedCities.length > 0){
        previousCitiesButtons.empty();
        storedCities.forEach(function(item){
            const dynBtn = $("<div/>", {"class":"button btn-lg mb-2", type:"button", "id":"previousCity"});
            dynBtn[0].textContent = item;
            previousCitiesButtons.append(dynBtn);
        })
    } else {
        console.log('no previous searches');
    }
}

function search(){
    const searchedCity = ($(".form-control")[0].value).toUpperCase();
    console.log(searchedCity)
    if (searchedCity === ""){
        alert("You need to enter a city name.");
    } else {
        if (!(storedCities.includes(searchedCity))){
            storedCities.push(searchedCity);
        } else {
            alert('City previously searched');
            $(".form-control")[0].value = "";
            return;
        };
        console.log(storedCities);
        previousSearches();
        $(".form-control")[0].value = "";
        ajax(searchedCity);
    };
};



function ajax(searchedCity){
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&appid=0d98e0477d04a50c6eee875a618c9c74",
        method: "GET"
        })
        .then(function(response) {
            if (response === null){
                alert("not found")
            } else {
                const lon = parseInt(response.coord.lon);
                const lat = parseInt(response.coord.lat);
            $.ajax({
                url: "http://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&appid=0d98e0477d04a50c6eee875a618c9c74",
                method: "GET"
                })
                .then(function(responseOneCall) {
                    $("#cityName").html(response.name);
                    $("#cityLocation").html(response.sys.country);
                    const tempK = parseInt(responseOneCall.current.temp);
                    const tempC = Math.round(((tempK - 273.15)*(9/5))+32);
                    const icon = responseOneCall.current.weather[0].icon;
                    const utcOffset = ((responseOneCall.timezone_offset)/60);
                    $("#currentDateAndTime")[0].textContent = moment().utcOffset(utcOffset).format('LLLL');
                    $("#currentWeather").attr("src", "http://openweathermap.org/img/wn/"+icon+"@2x.png");
                    $("#currentTemp").text("Temperature " + tempC + " °F");
                    $("#currentWindSpeed").text("Wind Speed: " + responseOneCall.current.wind_speed + " mph");
                    $("#currentHumidity").text("Humidity: " + responseOneCall.current.humidity + " %");
                    const uviValue = responseOneCall.current.uvi;
                    const uviBtn = $("<button/>", {"class":"btn-sm", type:"button", "id":"uviValueBtn"});
                    uviBtn[0].textContent = uviValue;
                    uviBtn[0].disabled = true;
                    $("#currentUvIndex").empty();
                    if (uviValue <= 2){
                        uviBtn[0].style.backgroundColor = 'lightgreen';
                        $("#currentUvIndex").append("UV Index: ",uviBtn[0]);
                    } else if ((uviValue >= 2) && (uviValue <= 5)) {
                        uviBtn[0].style.backgroundColor = 'yellow';
                        $("#currentUvIndex").append("UV Index: ",uviBtn[0]);
                    } else if ((uviValue >= 6) && (uviValue <= 7)){
                        uviBtn[0].style.backgroundColor = 'orange';
                        $("#currentUvIndex").append("UV Index: ",uviBtn[0]);
                    } else if ((uviValue >= 8) && (uviValue <= 10)) {
                        uviBtn[0].style.backgroundColor = 'red';
                        $("#currentUvIndex").append("UV Index: ",uviBtn[0]);
                    } else {
                        uviBtn[0].style.backgroundColor = 'violet';
                        $("#currentUvIndex").append("UV Index: ",uviBtn[0]);
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
            };
        })
};


function repeatSearch (){
    const searchedCity = $(this)[0].textContent;
    ajax(searchedCity);
};


$("#searchBtn").on('click', search);

$('body').on('click', '.btn-lg', repeatSearch);
