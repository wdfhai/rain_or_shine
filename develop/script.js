
$("#currentDateAndTime")[0].textContent = moment().format('LLLL');
$("#forecastOneDate")[0].textContent = moment().add(1, 'd').format('ddd, MMM DD');
$("#forecastTwoDate")[0].textContent = moment().add(2, 'd').format('ddd, MMM DD');
$("#forecastThreeDate")[0].textContent = moment().add(3, 'd').format('ddd, MMM DD');
$("#forecastFourDate")[0].textContent = moment().add(4, 'd').format('ddd, MMM DD');
$("#forecastFiveDate")[0].textContent = moment().add(5, 'd').format('ddd, MMM DD');

var currentCity = "";
var previousCities = [];

var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&appid=0d98e0477d04a50c6eee875a618c9c74"


function search(event){
    event.preventDefault();
    var searchedCity = $(".form-control")[0].value;
    if (!(searchedCity === "")){
    previousCities.push(searchedCity);
    console.log(searchedCity);
    console.log(previousCities);
    } else {
        alert("You need to enter a city name");
    };
}

$("#searchBtn").on('click', search);