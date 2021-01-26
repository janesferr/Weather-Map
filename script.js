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
      var day = currentDate.getDate();
      console.log(day);
      var month = currentDate.getMonth() + 1;
      var year = currentDate.getFullYear();
      document.getElementById("locationName").innerHTML = response.city.name + " " + month + "/" + day + "/" + year;
      $('#weatherimg').attr("src", "https://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png");
      $('#date-1').html(response.list[1].dt * 1000);
      




    });
  }
  else {
    // there was NO currentCityWeather, do something...
    alert("There is no data");
  }
}
function addfiveDay(){


}