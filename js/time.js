

// Set variable to current date and time
const now = new Date();
const currentHour = now.getHours();

if(currentHour < 24 && currentHour > 12){

    //add styles for nighttime

} else{

    //add styles for daytime
    if(document.querySelector('.jumbotron')){
        document.querySelector('.jumbotron').classList.add('dayTimeHeader');
    }

    if(document.querySelector('#searchBtn')){
        document.querySelector('#searchBtn').classList.add('dayTimeBtn'); //the button shrinks on hover for some reason
    }

    if(document.querySelector('#searchAddress')){
        document.querySelector('#searchAddress').classList.add('dayTimeSearchAddress');
    }

    if(document.querySelector('.card-header')){
        document.querySelector('.card-header').classList.add('dayTimeCardHeader');
    }

    if(document.querySelector('#currName')){
        document.querySelector('#currName').classList.add('dayTimeCardButton');
    }

}