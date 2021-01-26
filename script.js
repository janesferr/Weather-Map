//  This is our API key. Add your own API key between the ""
var APIKey = "886712791a5989b3234e47cdd0cb5a55";
var city = $("#city");
var currentCityweather = [];


//       $(document).ready(() => {
$('button').on("click", function (event) {
  event.preventDefault();
  //get the info from the input and put it into an empty string
  var cityone = city.val();
  showCurrent(cityone);
  setCity();
})

function showCurrent(currentWeather) {

  currentCityweather.push(currentWeather);

  localStorage.setItem("currentWeather", JSON.stringify(currentCityweather));

  document.getElementById("city").innerHTML = JSON.parse(localStorage.getItem("currentCityweather"));
  console.log(currentCityweather);

  $('#button-views').empty();

  for (var i = 0; i < currentCityweather.length; i++) {
    var a = $("<button>");
    a.addClass("weather");
    a.attr("data-name", currentCityweather[i]);
    a.attr("class", "list-group-item")
    a.text(currentCityweather[i]);

  }
  $("#buttons-view").append(a);

}

function setCity(currentDate) {
  if (currentCityweather) {
    // document.getElementById("recentlocation").innerHTML = currentCityweather;
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + currentCityweather + "&appid=" + APIKey + "&units=imperial";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      // console.log(response);
      // console.log("this is the city name: " + response.city.name);
      document.getElementById("recentlocation").innerHTML = response.city.name;
      // document.getElementById("locationName").innerHTML = response.city.name;

      console.log("This is the temp:" + response.list[0].main.temp);//This is the temperature
      document.getElementById("temperature").innerHTML = response.list[0].main.temp;

      //display the humidity
      document.querySelectorAll("Humidity").innerHTML = response.list[0].main.humidity;
      //display the wind speed
      document.getElementById("speed").innerHTML = response.list[0].wind.speed;
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

      for(var i=1; i <=5; i++){
        console.log("This is the temp for each day:" + response.list[i].main.temp);
      }
      
        $("#1").html(response.list[1].main.temp)
        $("#2").html(response.list[2].main.temp)
        $("#3").html(response.list[3].main.temp)
        $("#4").html(response.list[4].main.temp)
        $("#5").html(response.list[5].main.temp)
        
      


      




    });
  }
  else {
    // there was NO currentCityWeather, do something...
    alert("There is no data");
  }
}
