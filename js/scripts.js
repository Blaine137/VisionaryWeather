/* NEED TO FIND AN ALTERNATIVE TO GET COORDINATES FROM CITY NAME */

//options for navigator.geolocation.getCurrentPosition. 
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

// gets ands sets the weather for a locations.
// elementTemp and elementWind are dom elements. coordinates is an array of lat and long for the location we are retrieving weather for.
let getWeather = ( coordinates, elementTemp, elementFeelsLike, elementWind, elementVisibility, elementHumidity, elementSunrise, elementSunset,  elementCondition, elementAir, elementWeatherImg ) => {

  var data = null;

  var xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {

    if ( this.readyState === this.DONE ) {
      
      //data is object/array that contains weather information for a given location
      let data = Object.entries( JSON.parse( this.responseText ) ); 
      console.log(data);

      //temp
      let tempData = Object.entries( data[ 2 ][ 1 ] );
      let currentTemp = parseInt( tempData[ 0 ][ 1 ] );
      elementTemp.innerHTML = currentTemp + "&deg outside. ";

      //feels like
      let feelsLike = parseInt( data[ 3 ][ 1 ].value );
      elementFeelsLike.innerHTML = "Feels Like " + feelsLike + "&deg";

      //wind speed
      let currentWindSpeed = data[ 4 ] [1 ].value;
      elementWind.innerHTML = "Wind speed is " + parseInt( currentWindSpeed ) + " mph";

      //visibility
      let visibility = "visibility distance is " + parseInt(data[5][1].value) + " miles";
      elementVisibility.innerHTML = visibility;

      //humidity
      let humidity = "Humidity level is " + data[6][1].value + "&percnt;";
      elementHumidity.innerHTML = humidity;

      //sunrise
      let sunrise = "Sunrise at " + data[7][1].value;
      elementSunrise.innerHTML = sunrise;

      //sunset 
      let sunset = "Sunset at " + data[8][1].value;
      elementSunset.innerHTML = sunset;

      //weather code
      let weatherCondition = data[9][1].value;
      elementCondition.innerHTML =  weatherCondition.replace("_", " ");

      //air quality
      let airQuality = "Air Quality is " + data[10][1].value;
      elementAir.innerHTML = airQuality;
      
      // ----- set image of current weather -----

        //the weather code is the name of the corresponding image
        //if its a weather img that has day/night versions
        if ( weatherCondition == "partly_cloudy" || weatherCondition == "mostly_clear" || weatherCondition == "clear" ){

          let currentHour = now.getHours();

          //if it is after 8pm amd before 6am
          if(currentHour < 6 && currentHour > 20){

            //night 
            elementWeatherImg.src = "images/climacell/color/" + weatherCondition + "_night.svg";

          } else {

            //day
            elementWeatherImg.src = "images/climacell/color/" + weatherCondition + "_day.svg";

          }//else if (day or night)

        } else {

          //no day night versions of image
          elementWeatherImg.src = "images/climacell/color/" + weatherCondition + ".svg";

        }//else if(weather condition = ...)

      // ----- end of set image of current weather -----

      

    }//if readystate

  });//readystate event

  let fields = "temp,wind_speed,weather_code,feels_like,epa_health_concern,visibility,sunrise,sunset,humidity"

  //get weather for given coordinates
  xhr.open( "GET", "https://api.climacell.co/v3/weather/realtime?lat=" + coordinates[ 0 ] + "&lon="+ coordinates[ 1 ]+ "&unit_system=us&fields=" + fields + "&apikey=" + weatherApiKey );

  xhr.send( data );

}

//  Get user coordinates based on user position. requires user to have allowed the website to access current position
let getCurrentLocation = ( ) => { 

  navigator.geolocation.getCurrentPosition( success, error, options ); 

}//getCoordinates()

//navigator.geolocation.getCurrentPosition if was able to get position then get weather and city name for that position
let success = ( pos ) => { 

  //get lat and long of current location
  let coordinates = [pos.coords.latitude.toString( ), pos.coords.longitude.toString( ) ]; 

  getCityName( coordinates, document.getElementById('currName') );
  getWeather( coordinates, document.getElementById('currTemp'), document.getElementById('currFeelsLike') , document.getElementById('currWindSpeed'), document.getElementById('currVisibility'), document.getElementById("currHumidity"), document.getElementById('currSunrise'), document.getElementById('currSunset'),  document.getElementById('currCondition'),document.getElementById("currAirQuality"), document.getElementById('currWeatherImage') ); 
  return; 

} //success()

//navigator.geolocation.getCurrentPosition was unable to get position so notify the user
let error = ( err ) => { 

  console.warn( `ERROR( ${ err.code } ): ${err.message}` ); 
  
}//error()

//gets the name of a city based on the lat and long coordinates and displays it
//elementName is dom element where the city Name is to be displayed
let getCityName = ( coordinates, elementName ) => { 

  let xhr = new XMLHttpRequest( ); 
  let lat = coordinates[ 0 ]; 
  let lng = coordinates[ 1 ]; 

  xhr.open( 'GET', "https://us1.locationiq.com/v1/reverse.php?key=" + locationIQKey + "&lat=" + lat + "&lon=" + lng + "&format=json", true ); 
  xhr.send( ); 
  xhr.addEventListener( "readystatechange", processRequest, false ); 

  function processRequest( e ) { 
      

      if ( xhr.readyState == 4 && xhr.status == 200 ) { 

          let response = JSON.parse( xhr.responseText ); 

          //get city and state
          let city = response.address.city; 
          let state = response.address.state;

          //set current location to city and state name
          let displayCityName = document.getElementById('currName');
          elementName.innerHTML = city + ", " + state;

          return; 

      } 
      
  }//processRequest()

}//gitCity()

//used to keep track of cards and allow bootstrap accordion to work.
let cardId = 0;

let getCoordsByCity = ( address ) => {

  //https://us1.locationiq.com/v1/search.php?key=YOUR_PRIVATE_TOKEN&q=SEARCH_STRING&format=json
  let xhr = new XMLHttpRequest( ); 

  xhr.open( 'GET', "https://us1.locationiq.com/v1/search.php?key=" + locationIQKey + "&q=" + address + "&format=json", true ); 
  xhr.send( ); 
  xhr.addEventListener( "readystatechange", processRequest, false ); 

  function processRequest( e ) { 
      

      if ( xhr.readyState == 4 && xhr.status == 200 ) { 

          let response = JSON.parse( xhr.responseText ); 

          //the closest location found based on the  location name entered by the user. may not be the same location enter if it was entered wrong
          let location = response[0].display_name; 

          //this will be used for calling the get weather function.
          let locationCoord = [ response[0].lat, response[0].lon ];

          //gets the next card id.
          cardId++;
          
        let newCard = `
        <div class="card">

          <div class="card-header" id="heading${cardId}">

            <h2 class="mb-0">

              <button id="Name${cardId}" class="btn btn-link btn-block text-left cardBtn" type="button" data-toggle="collapse" data-target="#collapse${cardId}" aria-controls="collapse${cardId}">
                ${location}
              </button>

            </h2>

          </div>
      
          <div id="collapse${cardId}" class="collapse" aria-labelledby="heading${cardId}" data-parent="#accordionExample">

            <div class="card-body text-center">

              <img class="weatherImg image-responsive" id="weatherImage${cardId}" alt="Image representing current weather conditions">
              <p> <span id="Temp${cardId}"></span> <span id="feelsLike${cardId}"></span> </p>   
              <p id="condition${cardId}"></p>
              
              <div class="row">

              <div class="col-sm-6">

                <p id="windSpeed${cardId}"></p>
                <p id="humidity${cardId}"></p>
                <p id="airQuality${cardId}"></p>

              </div>

              <div class="col-sm-6">
                
                <p id="sunrise${cardId}"></p>
                <p id="sunset${cardId}"></p>
                <p id="visibility${cardId}"></p>

              </div>

            </div>

            </div>

          </div>

        </div>
          `; //adds a new card on submit (still need to make aria-controls somehow dYnamic)

          //adds the card to the accordion
          document.querySelector('.accordion').innerHTML += newCard; 
          //coordinates, elementTemp, elementFeelsLike, elementWind, elementVisibility, elementHumidity, elementSunrise, elementSunset,  elementCondition, elementAir, elementWeatherImg
          getWeather( locationCoord, document.querySelector('#Temp' + cardId), document.querySelector('#feelsLike' + cardId),  document.querySelector( '#windSpeed' + cardId ), document.querySelector( '#visibility' + cardId ), document.querySelector( '#humidity' + cardId ), document.querySelector( '#sunrise' + cardId ), document.querySelector( '#sunset' + cardId ), document.querySelector( '#condition' + cardId ), document.querySelector( '#airQuality' + cardId ),  document.querySelector( '#weatherImage' + cardId ) );

          return; 

      } 
      
  }//processRequest()

}//getCoordsByCity

//if the search btn is present add click listener that will run function to get weather for entered city name.
if( document.querySelector( '#searchBtn' ) ) {

  document.querySelector( '#searchBtn' ).addEventListener( 'click', ( ) => {

    getCoordsByCity(document.querySelector( '#searchAddress' ).value );
  
  } );

}//if(search btn)

//get and sets weather for current location. requires user to allow website to use current location
getCurrentLocation();


