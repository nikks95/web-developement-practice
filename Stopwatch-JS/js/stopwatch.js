var counter = 0;
var myTimer;
var flag = -1;
const RESUME_CLOCK = 1;
const PAUSE_CLOCK = 2;
const STOP_CLOCK  = 3;
let seconds = (value)=> {
    return Math.floor(value);
}
let minute = (value)=>{
    return Math.floor(seconds(value)/60);
}
let hour = (value) => {
    return Math.floor(minute(value)/60);
}
let update = (value) =>{
   
    let sechtml  = document.getElementById("sec-display");
    let minhtml  = document.getElementById("min-display");
    let hrhtml   = document.getElementById("hr-display");
 
    sechtml.innerHTML  = seconds(value)%60;
    minhtml.innerHTML  = minute(value)%60;
    hrhtml.innerHTML   = hour(value)%60;
}
function startStopwatch(){
    if(flag===RESUME_CLOCK){
        counter++;
        update(counter);
    }
    else if(flag===PAUSE_CLOCK){
        
    }
    else if(flag==STOP_CLOCK){
        counter=0;
        update(counter);
      
    }
}
let start = () => {
    if(flag!==RESUME_CLOCK){
        flag = RESUME_CLOCK;
        myTimer = setInterval(startStopwatch,1000);
    }
}
let pause = () => {
    flag = PAUSE_CLOCK;
}
let stop = () => {
    flag = STOP_CLOCK;
    clearInterval(myTimer);
    counter = 0;
    update(counter);
}
document.getElementById("start-btn").onclick = function() {start();}
document.getElementById("pause-btn").onclick = function() {pause();}
document.getElementById("reset-btn").onclick = function() {stop();}