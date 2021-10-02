var APIKey = "&appid=efbd70459a14a736bd41d17e5170f50b";
var userInput = document.getElementById('city-name');
var searchBtn = document.getElementById('city-search');
var userCity;
var starterUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
var unitMeasurement = "&units=imperial";
var finalUrl;
var fiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?q=";
var fiveDayFinalUrl;


//using moment to get date
//Setting current time as a global function
var currentDate = moment().format('l');
var future0 =  moment().add(1, 'days').format('l');
var future1 =  moment().add(2, 'days').format('l');
var future2 =  moment().add(3, 'days').format('l');
var future3 =  moment().add(4, 'days').format('l');
var future4 =  moment().add(5, 'days').format('l');


function submitSearch(e){
    userCity = userInput.value; //works
    saveSearch();
    getAPIcurrent(e);
}

function getAPIcurrent(e) {
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

    document.getElementById('city-display-name').innerHTML = userCity + " (" + currentDate + ")" + '<img src="http://openweathermap.org/img/w/' + data.weather[0].icon + '.png"></img>';
    document.getElementById('today-temp').innerHTML = data.main.temp + '°F';
    document.getElementById('today-wind').innerHTML = data.wind.speed + " MPH";
    document.getElementById('today-humidity').innerHTML = data.main.humidity + "%";
    document.getElementById('today-uvi').innerHTML = data.main.uvi; //nope, doesn't work
    getAPIfuture(e);
})

};

function getAPIfuture(e){
    e.preventDefault();
    console.log(userCity);

    fiveDayFinalUrl = fiveDayUrl + userCity + APIKey + unitMeasurement;

    console.log(fiveDayFinalUrl);

    fetch(fiveDayFinalUrl)
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
        $('#5-day-display').replaceWith('<h3 id="5-day-display">5-Day Forecast:</h3>');
        //5 day blue boxes
        $('#five-day-forecast').replaceWith(`<div class="card forecast-mini-card" style="width: 10rem;"><div class="card-body"><h5 class="card-title" id = "future-date0">Date Here</h5><p>Temp: <span id="future-temp0"></span></p><p>Wind: <span id="future-wind0"></span></p><p>Humidity: <span id="future-humidity0"></span></p></div></div><div class="card forecast-mini-card" style="width: 10rem;"><div class="card-body"><h5 class="card-title" id = "future-date1">Date Here</h5><p>Temp: <span id="future-temp1"></span></p><p>Wind: <span id="future-wind1"></span></p><p>Humidity: <span id="future-humidity1"></span></p></div></div><div class="card forecast-mini-card" style="width: 10rem;"><div class="card-body"><h5 class="card-title" id = "future-date2">Date Here</h5><p>Temp: <span id="future-temp2"></span></p><p>Wind: <span id="future-wind2"></span></p><p>Humidity: <span id="future-humidity2"></span></p></div></div><div class="card forecast-mini-card" style="width: 10rem;"><div class="card-body"><h5 class="card-title" id = "future-date3">Date Here</h5><p>Temp: <span id="future-temp3"></span></p><p>Wind: <span id="future-wind3"></span></p><p>Humidity: <span id="future-humidity3"></span></p></div></div><div class="card forecast-mini-card" style="width: 10rem;"><div class="card-body"><h5 class="card-title" id = "future-date4">Date Here</h5><p>Temp: <span id="future-temp4"></span></p><p>Wind: <span id="future-wind4"></span></p><p>Humidity: <span id="future-humidity4"></span></p></div></div>`)

// //Future Day 1
            $('#future-date0').text(future0); 
            $('#future-temp0').text(data.list[0].main.temp); 
            $('#future-wind0').text(data.list[0].wind.speed + " MPH"); 
            $('#future-humidity0').text(data.list[0].main.humidity + "%"); 
//Future Day 2
            $('#future-date1').text(future1); 
            $('#future-temp1').text(data.list[1].main.temp); 
            $('#future-wind1').text(data.list[1].wind.speed + " MPH"); 
            $('#future-humidity1').text(data.list[1].main.humidity + "%"); 
//Future Day 3
            $('#future-date2').text(future2); 
            $('#future-temp2').text(data.list[2].main.temp); 
            $('#future-wind2').text(data.list[2].wind.speed + " MPH"); 
            $('#future-humidity2').text(data.list[2].main.humidity + "%"); 
//Future Day 4
            $('#future-date3').text(future3); 
            $('#future-temp3').text(data.list[3].main.temp); 
            $('#future-wind3').text(data.list[3].wind.speed + " MPH"); 
            $('#future-humidity3').text(data.list[3].main.humidity + "%"); 
//Future Day 5
            $('#future-date4').text(future4); 
            $('#future-temp4').text(data.list[4].main.temp); 
            $('#future-wind4').text(data.list[4].wind.speed + " MPH"); 
            $('#future-humidity4').text(data.list[4].main.humidity + "%"); 
})
};

function saveSearch() {
    var savedCities = JSON.parse(localStorage.getItem("savedCities") || "[]");

    savedCities.push(userCity);
    localStorage.setItem("savedCities", JSON.stringify(savedCities));
    displaySearch();

    // $('ul').html=""
    function displaySearch(){
        $('ul').append('<li class="list-group-item"><button class ="city-button" data-city = "' + savedCities[savedCities.length-1] + '">'+ savedCities[savedCities.length-1] + '</button></li>');
    };

}

function parentClick (e){
    userCity = $(this).data('city')
    getAPIcurrent(e);
}

searchBtn.addEventListener('click', submitSearch);
$('#search-parent').on("click", "[data-city]", parentClick)
