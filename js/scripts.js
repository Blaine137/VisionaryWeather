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