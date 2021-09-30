var APIKey = "&appid=efbd70459a14a736bd41d17e5170f50b";
var userInput = document.getElementById('city-name');
var searchBtn = document.getElementById('city-search');
var userCity;
var starterUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
var unitMeasurement = "&units=imperial";
var finalUrl;

//using moment to get date
//Setting current time as a global function
var currentDate = moment().format("MMM Do YY");
console.log(currentDate);

function submitSearch(e){
    userCity = userInput.value; //works
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
    console.log(data);
    document.getElementById('city-display-name').innerHTML = userCity + " (" + currentDate + ")";
    document.getElementById('today-temp').innerHTML = data.main.temp;
    document.getElementById('today-wind').innerHTML = data.wind.speed + " MPH";
    document.getElementById('today-humidity').innerHTML = data.main.humidity;
    document.getElementById('today-uvi').innerHTML = data.main.uvi;
    })
    console.log(finalUrl); //confirmed works
    // now begin to display and style?

};


searchBtn.addEventListener('click', submitSearch);


//need to have the link that uses different variables throughout it, like API key and input city
