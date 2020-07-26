/*

DAYTIME COLOR PALETTE:

    Blue Violet: #541388
    Dogwood Rose: #D90368
    eggshell: #F1E9DA
    Space Cadet: #2E294E
    Cyber Yellow: #FFD400

NIGHTTIME COLOR PALETTE:

    Black Coral: #495867
    Ruby Red: #A31621
    Medium Turquoise: #4DCCBD
    Dark Green: #002500
    Dark Orange: #FF8811


*/

// Set variable to current date and time
const now = new Date();
const currentHour = now.getHours();
console.log(currentHour)
if(currentHour < 24 && currentHour > 12){

    //add styles for nighttime
    if(document.querySelector('.jumbotron')){
        document.querySelector('.jumbotron').style.backgroundImage = 'linear-gradient(to right, #002500, #495867 )';
        document.querySelector('.jumbotron').style.color = '#A31621';
    }
} else{

    //add styles for daytime

}