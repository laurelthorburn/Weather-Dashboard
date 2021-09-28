var APIKey = "efbd70459a14a736bd41d17e5170f50b";
var city;
var userInput = document.getElementById('city-name');
var searchBtn = document.getElementById('city-search');

function runWeather (){
    userCity = userInput.value;
    console.log(userCity);
}

searchBtn.addEventListener('click', runWeather);