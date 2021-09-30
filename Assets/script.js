var APIKey = "&appid=efbd70459a14a736bd41d17e5170f50b";
var userInput = document.getElementById('city-name');
var searchBtn = document.getElementById('city-search');
var userCity;
var starterUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
var unitMeasurement = "&units=imperial";
var finalUrl;
var fiveDayUrl = 'httPs://api.openweathermap.org/data/2.5/forecast?q=';

var clicked = false;

//using moment to get date
//Setting current time as a global function
var currentDate = moment().format("MMM Do YY");

function submitSearch(e){
    userCity = userInput.value; //works
    saveSearch();
    getAPI(e);
}

function getAPI(e) {
 // Use preventDefault() to stop the form submitting
    e.preventDefault();
 // Assemble the full URL
    finalUrl = starterUrl + userCity + APIKey + unitMeasurement;

    fetch(finalUrl)
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {// Use the console to examine the response
        $('#display-today').replaceWith('<div id = "city-card"><h2 id="city-display-name"></h2><p>Temp: <span id="today-temp"></span></p><p>Wind: <span id="today-wind"></span></p><p>Humidity: <span id="today-humidity"></span></p><p>UVI Index: <span id="today-uvi"></span></p></div>');
    document.getElementById('city-display-name').innerHTML = userCity + " (" + currentDate + ")";
    document.getElementById('today-temp').innerHTML = data.main.temp + '°F';
    document.getElementById('today-wind').innerHTML = data.wind.speed + " MPH";
    document.getElementById('today-humidity').innerHTML = data.main.humidity + "%";
    document.getElementById('today-uvi').innerHTML = data.main.uvi; //nope, doesn't work
    })

    fiveDayFinalUrl = fiveDayUrl + userCity + APIKey;

    fetch(fiveDayFinalUrl)
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {// Use the console to examine the response
        $('#five-day-forecast').append('<div class="card forecast-mini-card" style="width: 10rem;"><div class="card-body"><h5 class="card-title" id = "future-date">Date Here</h5><p>Temp: <span id="future-temp"></span></p><p>Wind: <span id="future-wind"></span></p><p>Humidity: <span id="future-humidity"></span></p></div></div>')
    // document.getElementById('future-date').innerHTML = currentDate; //need to change to future date
    // document.getElementById('future-temp').innerHTML = data.main.temp; //need future temp
    // document.getElementById('future-wind').innerHTML = data.wind.speed + " MPH"; //need future wind
    // document.getElementById('future-humidity').innerHTML = data.main.humidity + "%"; //need future humidity
    })


};

function saveSearch() {
    var savedCities = JSON.parse(localStorage.getItem("savedCities") || "[]");

    savedCities.push(userCity);
    localStorage.setItem("savedCities", JSON.stringify(savedCities));
    displaySearch();

    // $('ul').html=""
    function displaySearch(){
    $('ul').append('<li class="list-group-item"><button class ="city-button" data-city = "' + savedCities[savedCities.length-1] + '">'+ savedCities[savedCities.length-1] + '</button></li>') //do i need to add the /n.. probs, why is 
};

console.log(savedCities);


}




searchBtn.addEventListener('click', submitSearch);


//need to have the link that uses different variables throughout it, like API key and input city
