var APIKey = "&appid=efbd70459a14a736bd41d17e5170f50b";
var userInput = document.getElementById('city-name');
var searchBtn = document.getElementById('city-search');
var userCity;
var starterUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
var unitMeasurement = "&units=imperial";
var finalUrl;

function submitSearch(e){
    userCity = userInput.value; //works
    fetchResults(e);
}

function fetchResults(e) {
 // Use preventDefault() to stop the form submitting
 e.preventDefault();

 // Assemble the full URL
 finalUrl = starterUrl + userCity + APIKey + unitMeasurement;

 console.log(finalUrl); //confirmed works
}


searchBtn.addEventListener('click', submitSearch);


//need to have the link that uses different variables throughout it, like API key and input city
