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
var currentDate = moment().format('l');
var future1 =  moment().add(1, 'days').format('l');
var future2 =  moment().add(2, 'days').format('l');
var future3 =  moment().add(3, 'days').format('l');
var future4 =  moment().add(4, 'days').format('l');
var future5 =  moment().add(5, 'days').format('l');

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

    fiveDayFinalUrl = fiveDayUrl + userCity + APIKey + unitMeasurement;

    fetch(fiveDayFinalUrl)
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
        $('#5-day-display').replaceWith('<h3 id="5-day-display">5-Day Forecast:</h3>');
        //5 day blue boxes
        $('#five-day-forecast').replaceWith('<div class="card forecast-mini-card" style="width: 10rem;"><div class="card-body"><h5 class="card-title" id = "future-date0">Date Here</h5><p>Temp: <span id="future-temp0"></span></p><p>Wind: <span id="future-wind0"></span></p><p>Humidity: <span id="future-humidity0"></span></p></div></div><div class="card forecast-mini-card" style="width: 10rem;"><div class="card-body"><h5 class="card-title" id = "future-date1">Date Here</h5><p>Temp: <span id="future-temp1"></span></p><p>Wind: <span id="future-wind1"></span></p><p>Humidity: <span id="future-humidity1"></span></p></div></div><div class="card forecast-mini-card" style="width: 10rem;"><div class="card-body"><h5 class="card-title" id = "future-date2">Date Here</h5><p>Temp: <span id="future-temp2"></span></p><p>Wind: <span id="future-wind2"></span></p><p>Humidity: <span id="future-humidity2"></span></p></div></div><div class="card forecast-mini-card" style="width: 10rem;"><div class="card-body"><h5 class="card-title" id = "future-date3">Date Here</h5><p>Temp: <span id="future-temp3"></span></p><p>Wind: <span id="future-wind3"></span></p><p>Humidity: <span id="future-humidity3"></span></p></div></div><div class="card forecast-mini-card" style="width: 10rem;"><div class="card-body"><h5 class="card-title" id = "future-date4">Date Here</h5><p>Temp: <span id="future-temp4"></span></p><p>Wind: <span id="future-wind4"></span></p><p>Humidity: <span id="future-humidity4"></span></p></div></div>')

//Future Day 1
            document.getElementById('future-date0').replaceWith(future1); 
            document.getElementById('future-temp0').replaceWith(data.list[0].main.temp); 
            document.getElementById('future-wind0').replaceWith(data.list[0].wind.speed + " MPH"); 
            document.getElementById('future-humidity0').replaceWith(data.list[0].main.humidity + "%"); 
//Future Day 2
            document.getElementById('future-date1').replaceWith(future2); 
            document.getElementById('future-temp1').replaceWith(data.list[1].main.temp); 
            document.getElementById('future-wind1').replaceWith(data.list[1].wind.speed + " MPH"); 
            document.getElementById('future-humidity1').replaceWith(data.list[1].main.humidity + "%"); 
//Future Day 1
            document.getElementById('future-date2').replaceWith(future3); 
            document.getElementById('future-temp2').replaceWith(data.list[2].main.temp); 
            document.getElementById('future-wind2').replaceWith(data.list[2].wind.speed + " MPH"); 
            document.getElementById('future-humidity2').replaceWith(data.list[2].main.humidity + "%"); 
//Future Day 1
            document.getElementById('future-date3').replaceWith(future4); 
            document.getElementById('future-temp3').replaceWith(data.list[3].main.temp); 
            document.getElementById('future-wind3').replaceWith(data.list[3].wind.speed + " MPH"); 
            document.getElementById('future-humidity3').replaceWith(data.list[3].main.humidity + "%"); 
//Future Day 1
            document.getElementById('future-date4').replaceWith(future5); 
            document.getElementById('future-temp4').replaceWith(data.list[4].main.temp); 
            document.getElementById('future-wind4').replaceWith(data.list[4].wind.speed + " MPH"); 
            document.getElementById('future-humidity4').replaceWith(data.list[4].main.humidity + "%"); 
})};

function saveSearch() {
    var savedCities = JSON.parse(localStorage.getItem("savedCities") || "[]");

    savedCities.push(userCity);
    localStorage.setItem("savedCities", JSON.stringify(savedCities));
    displaySearch();

    // $('ul').html=""
    function displaySearch(){
    $('ul').append('<li class="list-group-item"><button class ="city-button" data-city = "' + savedCities[savedCities.length-1] + '">'+ savedCities[savedCities.length-1] + '</button></li>') //do i need to add the /n.. probs, why is 
};

}




searchBtn.addEventListener('click', submitSearch);


//need to have the link that uses different variables throughout it, like API key and input city
