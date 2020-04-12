const icons = document.querySelector('.icon');
const myTemperature = document.querySelector('.temp h2');
const condition = document.querySelector('.condition h2');
const mylocation = document.querySelector('.location h2');
const Kelvin = 273;
const KEY = "fc74dbde0f52ac2bdd10e4ad70dc0b61";
const time = document.getElementById('time');
const date = document.getElementById('date');

const weather ={};
weather.temperature = {
    unit: 'celsius'
}
//check whether browser support geolocation
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition);
}else{
    alert('Browser does not support geolocation');
}
//get current position
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude,longitude);
}
// get weather condition of current position
function getWeather(latitude,longitude){
    let API = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${KEY}`;
    console.log(API);
    fetch(API)
        .then(function(response){
            let data = response.json();
            return data;
            
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - Kelvin);
            weather.condition = data.weather[0].description;
            weather.icons = data.weather[0].icon; 
            weather.city = data.name;
            weather.country = data.sys.country;

        })
        .then(function(){
            showWeather();
        })
}
function showWeather(){
    icons.innerHTML = `<img src='icons/${weather.icons}.png'/>`;
    myTemperature.innerHTML = `${weather.temperature.value}&deg;<span>C<span/>`;
    condition.innerHTML = weather.condition;
    mylocation.innerHTML = `${weather.city},${weather.country}`;
}
function showTime(){
    let today =  new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

    const aMpM = hour >= 12 ? 'PM' : 'AM';
    //hour = hour%12 || 12; 
    time.innerHTML = `${hour}<span>:<span/>${addZero(min)}<span>:<span/>${addZero(sec)}`;
    setTimeout(showTime, 1000);
}
function addZero(number){
    return(parseInt(number, 10) < 10 ? '0' : '') + number;
}
function showDate(){
    let today = new Date(),
    day = today.getDate(),
    month = today.getMonth() + 1,
    year = today.getFullYear();

    date.innerHTML = `${day}<span>:<span/>${month}<span>:<span/>${year}`

}
showTime();
showDate();