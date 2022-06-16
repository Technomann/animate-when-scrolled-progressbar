
let progressText = document.getElementById('progress-text');
let fadeables = document.querySelectorAll('.fader');
let progressBar = document.getElementById('progress');
let train = document.getElementById('animation-image');

let value = 500; // START COUNTING FROM - MUST MATCH WITH HTML INNERTEXT VALUE FROM #progress-text

// WE WANT TO INCREMENT WITH A RANDOM VALUE ON EVERY DIFFERENT PAGE LOAD
const randomIncrementMaximum = 8050; 
const randomIncrementMinimum = 8000;
let incrementalValue = Math.floor(Math.random() * (randomIncrementMaximum - randomIncrementMinimum + 1)) + randomIncrementMinimum; // VALUE TO INCREMENT WITH

var interval; // NEED TO SAVE INTERVAL SO WE CAN STOP RUNNING AFTER ANIMATION FINISHED

const speed = 8; // MILLISECONDS - HOW OFTEN WE SHOULD INCREMENT THE VALUE
const goal = 2262692; //FINAL VALUE TO SHOW
const goalPercentageOfProgressbar = 80;
const maximumProgressBarHeight = 13; // PROGRESS BAR SHOULD BE THIS HIGH BY THE END OF ANIMATION (PX)
const trainLeftShift = 40; // BY DEFAULT THE TRAINS IS SHIFTED TO THE RIGHT TO NOT BE SEEN (VW)

function RunProgressBar(){
    interval = setInterval(IncreaseProgressValue, speed);
}

function IncreaseProgressValue(){
    if(value < goal){
        value += incrementalValue;

        const ratio = value / goal;
        
        const width = ratio * goalPercentageOfProgressbar; // MAKING PROGRESS BAR WIDER
        progressBar.style.width = width.toString() + "%";
        
        const left = trainLeftShift - ratio * trainLeftShift; // POSITIONING TRAIN 
        train.style.left = left.toString() + "vw";
        
        const height = (ratio); // MAKING PROGRESS BAR HIGHER
        progressBar.style.height = height * maximumProgressBarHeight + "px";
        
        SetFading(ratio);
    }else{
        value = goal;
        clearInterval(interval);

        train.style.left = "0";
        progressBar.style.width = "100%";
        progressBar.style.height = "13px";
        
        SetFading(1.0);
    }

    progressText.innerText = MakeNumbersDecimal(value.toString());
}

// WE ADD ' ' AFTER EVERY 3 NUMBER
function MakeNumbersDecimal(valueAsString){
    let out = "";
    let counter = 0;

    for(let i = valueAsString.length - 1; i >= 0; --i){
        if(counter == 3){
            counter = 0;
            out += " ";
        }
        counter++;
        out += valueAsString[i];
    }

    return out.split('').reverse().join('');
}

// FADING IN THE ELEMENTS WITH .fader CLASS
function SetFading(opacity){
    for(let i = 0; i < fadeables.length; ++i)
        fadeables[i].style.opacity = opacity.toString();
}

// UNCOMMENT THIS BRANCH IN PRODUCTION - this originally starts animation when scrolled to the animation container
/*if($(document.body).hasClass('PAGE_CLASS_NAME')){ // REPLACE 'PAGE_CLASS_NAME' WITH A CLASS NAME OF THE APGE THE ANIMATION SHOULD START ON
    $(window).scroll(function() {
    var hT = $('#train-container').offset().top,
        hH = $('#train-container').outerHeight(),
        wH = $(window).height(),
        wS = $(this).scrollTop();
        
    if ((wS > (hT+hH-wH)) && trainAnimCanStart)
        RunProgressBar();
 });
}*/

// COMMENT THIS FUNCTION IN PRODUCTION MODE - this originally starts animation on DOM is loaded
(function(){
    RunProgressBar();
})();

/*By @retirem - 16.06.2022.*/
