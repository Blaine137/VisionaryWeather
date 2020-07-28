

// Set variable to current date and time
const now = new Date();
const currentHour = now.getHours();

//if it is after 8pm amd before 6am
if( currentHour < 6 || currentHour > 20 ){
    console.log("night")
    //add styles for nighttime
    /*if(document.querySelector('.jumbotron')){
        document.querySelector('.jumbotron').classList.add('nightTimeHeader');
    }*/

    if(document.querySelector('footer')){
        document.querySelector('footer').classList.add('nightTimeFooter');
    }

    if(document.querySelector('#searchBtn')){
        document.querySelector('#searchBtn').classList.add('nightTimeBtn'); //the button shrinks on hover for some reason
    }

    if(document.querySelector('#searchAddress')){
        document.querySelector('#searchAddress').classList.add('nightTimeSearchAddress');
    }

    if(document.querySelector('.card-header')){
        document.querySelector('.card-header').classList.add('nightTimeCardHeader');
    }

    if(document.querySelector('#currName')){
        document.querySelector('#currName').classList.add('nightTimeCardButton');
    }
    if( document.querySelector('body') ) {
        document.querySelector('body').classList.add('nightTimeBackground');
    }  
    if( document.querySelector('.card-body') ) {
        document.querySelector('.card-body').classList.add('nightTimeCardBg');
    }
    

} else{
    console.log("day");
    //add styles for daytime
    /*if(document.querySelector('.jumbotron')){
        document.querySelector('.jumbotron').classList.add('dayTimeHeader');
    }*/

    if(document.querySelector('footer')){
        document.querySelector('footer').classList.add('dayTimeFooter');
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
    if( document.querySelector('.card-body') ) {
        document.querySelector('.card-body').classList.add('dayTimeCardBg');
    }

    if(document.querySelector('#currName')){
        document.querySelector('#currName').classList.add('dayTimeCardButton');
    }

}