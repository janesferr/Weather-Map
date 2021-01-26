//  This is our API key. Add your own API key between the ""
//  This is our API key. Add your own API key between the ""
var APIKey = "886712791a5989b3234e47cdd0cb5a55";
var city = $("#city");
var currentCityweather = [];

//       $(document).ready(() => {
$('button').on("click", function(event) {
  event.preventDefault();
  //get the info from the input and put it into an empty string
  var cityone = city.val();
  showCurrent(cityone);
  setCity();
})

function showCurrent(currentWeather) {

currentCityweather.push(currentWeather);

  localStorage.setItem("currentWeather", JSON.stringify( currentCityweather ) );

  document.getElementById("city").innerHTML = JSON.parse( localStorage.getItem("currentCityweather") );
  console.log(currentCityweather);

}

function setCity(){
if (currentCityweather !== null) {

// document.getElementById("recentlocation").innerHTML = currentCityweather;
queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + currentCityweather + "&appid=" + APIKey;
}

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
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
      var currentDate = new Date(response.list[0].dt*1000);
      console.log("This is the currentdate: "+ currentDate);
      var day = currentDate.getDate();
      console.log(day); 
      var month = currentDate.getMonth() + 1;
      var year = currentDate.getFullYear();
      document.getElementById("locationName").innerHTML = response.city.name + " "  + month + "/" + day + "/" + year;

       
     });
   
    }