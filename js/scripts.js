/* NEED TO FIND AN ALTERNATIVE TO GET COORDINATES FROM CITY NAME */

//options for navigator.geolocation.getCurrentPosition. 
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

// gets ands sets the weather for a locations.
// elementTemp and elementWind are dom elements. coordinates is an array of lat and long for the location we are retrieving weather for.
let getWeather = ( coordinates, elementTemp, elementWind) => {

  var data = null;

  var xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {

    if ( this.readyState === this.DONE ) {
   
      //data is object/array that contains weather information for a given location
      let data = Object.entries( JSON.parse( this.responseText ) ); 
      console.log(data[0]);

      //gets the location temp
      let tempData = Object.entries( data[ 2 ][ 1 ] );
      let currentTemp = tempData[ 0 ][ 1 ] + " " + tempData[ 1 ][ 1 ];

      //set the location temp
      elementTemp.innerHTML = "Current Temp: " + currentTemp;

      //gets the current wind speed
      let windSpeedData = Object.entries(data[ 3 ][ 1 ] );
      let currentWindSpeed = windSpeedData[ 0 ] [1 ] + " " + windSpeedData[ 1 ][ 1 ];

      //set the location wind speed
      elementWind.innerHTML = "Wind Speed: " + currentWindSpeed;
      
    }

  });

  //get weather for given coordinates
  xhr.open( "GET", "https://api.climacell.co/v3/weather/realtime?lat=" + coordinates[ 0 ] + "&lon="+ coordinates[ 1 ]+ "&unit_system=us&fields=temp,wind_speed,precipitation,precipitation_type&apikey=L3g9oaDS5EfduhTAcmPrVxbFSRjOJyrX" );

  xhr.send( data );

}

//if the search btn is present add click listener that will run function to get weather for entered city name.
if( document.querySelector( '.searchBtn' ) ){

  document.querySelector( '.searchBtn' ).addEventListener( 'click', ( ) => {

    navigator.geolocation.getCurrentPosition( success, error, options );
  
  } );

}//if(search btn)

//  Get user coordinates based on user position. requires user to have allowed the website to access current position
function getCoordinates( ) { 


  navigator.geolocation.getCurrentPosition( success, error, options ); 

}//getCoordinates()

//navigator.geolocation.getCurrentPosition if was able to get position then get weather and city name for that position
function success( pos ) { 

  //get lat and long of current location
  let coordinates = [pos.coords.latitude.toString( ), pos.coords.longitude.toString( ) ]; 

  //getCity( coordinates );
  getWeather( coordinates, document.getElementById('currTemp'), document.getElementById('currWindSpeed') ); 
  return; 

} //success()

//navigator.geolocation.getCurrentPosition was unable to get position so notify the user
function error( err ) { 

  console.warn( `ERROR( ${ err.code } ): ${err.message}` ); 
  
}//error()

//gets the name of a city based on the lat and long coordinates and displays it
//elementName is dom element where the city Name is to be displayed
function getCity( coordinates, elementName ) { 

  let xhr = new XMLHttpRequest( ); 
  let lat = coordinates[ 0 ]; 
  let lng = coordinates[ 1 ]; 

  // Paste your LocationIQ token below. 
  xhr.open( 'GET', "https://us1.locationiq.com/v1/reverse.php?key=77182bb535389d&lat=" + lat + "&lon=" + lng + "&format=json", true ); 
  xhr.send( ); 
  xhr.onreadystatechange = processRequest; 
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

//starts get weather for current location
//lat=33.4473&lon=84.1469
getWeather([33.4473, 84.1469], document.getElementById('mcdonoughTemp'), document.getElementById('mcdonoughWindSpeed') );

getCoordinates();


