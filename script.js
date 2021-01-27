// user types, clicks search
// search happens, add to history
// load most recent into display

//  This is our API key. Add your own API key between the ""
var APIKey = "886712791a5989b3234e47cdd0cb5a55";
var city = $("#city");
var historyStorageKeyName = "history";

$(document).ready(() => {
  // add a click handler to the search button
  // to search for the city
  $('button').on("click", function (event) {
    $("<img>").hide();
    event.preventDefault();
    
    var cityToSearchFor = city.val();
    if (cityToSearchFor === null || cityToSearchFor.trim() === '') {
      alert('Please select a city to search for.');
    }
    else {
      addSearchToHistory(cityToSearchFor);
      renderSearchHistory();
      displayCityWeather(cityToSearchFor);
    }
  });

  // display the search history
  renderSearchHistory();

  // get the weather for the most recent
  // item in the history
  var history = JSON.parse(localStorage.getItem(historyStorageKeyName));
  displayCityWeather(history[history.length - 1]);
});

// Add a city to the search history in local storage
function addSearchToHistory(cityName) {
  var history = JSON.parse(localStorage.getItem(historyStorageKeyName));

  // if no history, create a new one
  if (history === null) {
    history = [];
  }

  // add the cityName to the search history
  history.push(cityName);

  // commit the history to local storage
  localStorage.setItem(historyStorageKeyName, JSON.stringify(history));
}

// get the list of cities previously searched for and render a list.
// Atlanta will always be in our history, deal with it.
function renderSearchHistory() {
  var history = JSON.parse(localStorage.getItem(historyStorageKeyName));

  if (history === null) {
    history = [];
    history.push('Atlanta');
    localStorage.setItem(historyStorageKeyName, JSON.stringify(history));
  }

  $('#city-history').empty();

  history.forEach(cityName => {
    var a = $("<li>");
    a.addClass("list-group-item");
    a.attr("data-name", cityName);
    a.text(cityName);
    a.on("click", function(event){
      var cityName = event.target.getAttribute("data-name");
      displayCityWeather(cityName);
    });
    $("#city-history").prepend(a);
  });
}

function displayCityWeather(cityName) {
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey + "&units=imperial";
  
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    
    console.log("This is the temp:" + response.list[0].main.temp);//This is the temperature
    document.getElementById("temperature").innerHTML = response.list[0].main.temp;

    //display the humidity
    $("#Humidity").text(response.list[0].main.humidity);

    //display the wind speed
    $("#speed").text(response.list[0].wind.speed);
    var currentDate = new Date(response.list[0].dt * 1000);
    console.log("This is the currentdate: " + currentDate);
    var day0 = currentDate.getDate();
    console.log(day0);
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    document.getElementById("locationName").innerHTML = response.city.name + " " + month + "/" + day0 + "/" + year;
    $('#weatherimg').attr("src", "https://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png");

    // Set the date for each 5 day forecast
    var day1 = (day0) + 1
    $('#date-1').html(month + "/" + day1 + "/" + year);
    var day2 = (day1) + 1
    $('#date-2').html(month + "/" + day2 + "/" + year);
    var day3 = (day2) + 1
    $('#date-3').html(month + "/" + day3 + "/" + year);
    var day4 = (day3) + 1
    $('#date-4').html(month + "/" + day4 + "/" + year);
    var day5 = (day4) + 1
    $('#date-5').html(month + "/" + day5 + "/" + year);

    //Set the temperate for each 5 day forecast:

    $("#1").html(response.list[1].main.temp)
    $("#2").html(response.list[2].main.temp)
    $("#3").html(response.list[3].main.temp)
    $("#4").html(response.list[4].main.temp)
    $("#5").html(response.list[5].main.temp)

    for (var i = 1; i <= 5; i++) {
      // $($(".white")[i]).html(response.list[i].main.humidity);
      console.log(response.list[i].main.humidity);
    }

    $(".white-1").html(response.list[1].main.humidity);
    $(".white-2").html(response.list[2].main.humidity);
    $(".white-3").html(response.list[3].main.humidity);
    $(".white-4").html(response.list[4].main.humidity);
    $(".white-5").html(response.list[5].main.humidity);
    // iterate through the fist to the last image:
    $("#img1").attr("src", "https://openweathermap.org/img/wn/" + response.list[1].weather[0].icon + "@2x.png");
    $("#img2").attr("src", "https://openweathermap.org/img/wn/" + response.list[2].weather[0].icon + "@2x.png");
    $("#img3").attr("src", "https://openweathermap.org/img/wn/" + response.list[3].weather[0].icon + "@2x.png");
    $("#img4").attr("src", "https://openweathermap.org/img/wn/" + response.list[4].weather[0].icon + "@2x.png");
    $("#img5").attr("src", "https://openweathermap.org/img/wn/" + response.list[5].weather[0].icon + "@2x.png");

    //set the UVindex here:
    var lat = response.city.coord.lat;
    console.log("this is the last:" + lat);
    var lon = response.city.coord.lon;
    console.log("this is the last:" + lon);
    var UVvalue = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
    console.log("This is the uv value: " + UVvalue);


    var queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
    $.ajax({
      url: queryURL2,
      method: "GET"
    }).then(function (response) {
      console.log("This is the uv-index: " + response.value);
      $("#UVindex").html(response.value);
    });
  });
}