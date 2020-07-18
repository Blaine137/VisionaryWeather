var data = null;

var xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(JSON.parse(this.responseText));
  }
});

xhr.open("GET", "https://api.climacell.co/v3/weather/realtime?lat=33.4473&lon=84.1469&unit_system=us&fields=temp,precipitation,precipitation_type&apikey=L3g9oaDS5EfduhTAcmPrVxbFSRjOJyrX");

xhr.send(data);