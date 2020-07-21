
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

window.addEventListener('load', () => {
  var data = null;

  var xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      let data = Object.entries(JSON.parse(this.responseText)); //all of the data needed
      console.log(data)
        //gets the current temp
      let tempData = Object.entries(data[2][1]);
      let currentTemp = tempData[0][1] + " " + tempData[1][1];
      document.querySelector('.mcdonoughTemp').innerHTML = "Current Temp: " + currentTemp;

        //gets the current wind speed
      let windSpeedData = Object.entries(data[3][1]);
      let currentWindSpeed = windSpeedData[0][1] + " " + windSpeedData[1][1];
      document.querySelector('.mcdonoughwindspeed').innerHTML = "Wind Speed: " + currentWindSpeed;
      
    }
  });

  xhr.open("GET", "https://api.climacell.co/v3/weather/realtime?lat=33.4473&lon=84.1469&unit_system=us&fields=temp,wind_speed,precipitation,precipitation_type&apikey=L3g9oaDS5EfduhTAcmPrVxbFSRjOJyrX");

  xhr.send(data);
  
});

if(document.querySelector('.searchBtn')){

  document.querySelector('.searchBtn').addEventListener('click', () => {

    let geo = navigator.geolocation;
    geo.getCurrentPosition(success, error, options);
  
  });

}



// Step 1: Get user coordinates 
function getCoordintes() { 
  var options = { 
      enableHighAccuracy: true, 
      timeout: 5000, 
      maximumAge: 0 
  };  

  navigator.geolocation.getCurrentPosition(success, error, options); 
} 

function success(pos) { 
  console.log('position: ', pos)
  var crd = pos.coords; 
  var lat = crd.latitude.toString(); 
  var lng = crd.longitude.toString(); 
  var coordinates = [lat, lng]; 
  console.log(`Latitude: ${lat}, Longitude: ${lng}`); 
  getCity(coordinates); 
  return; 

} 

function error(err) { 
  console.warn(`ERROR(${err.code}): ${err.message}`); 
}

// Step 2: Get city name 
function getCity(coordinates) { 
  var xhr = new XMLHttpRequest(); 
  var lat = coordinates[0]; 
  var lng = coordinates[1]; 

  // Paste your LocationIQ token below. 
  xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=77182bb535389d&lat=" + lat + "&lon=" + lng + "&format=json", true); 
  xhr.send(); 
  xhr.onreadystatechange = processRequest; 
  xhr.addEventListener("readystatechange", processRequest, false); 

  function processRequest(e) { 
      if (xhr.readyState == 4 && xhr.status == 200) { 
          var response = JSON.parse(xhr.responseText); 
          var city = response.address.city; //gets city and to get state replace city with state
          console.log('current city: ', city)
          return; 
      } 
  } 
} 

getCoordintes();


