// importing the sass stylesheet for bundling
import "./../sass/styles.scss";
import { getJSONData } from "./Toolkit";

const CITY_LIST ="http://localhost:3000/cities.json";
let dropDownMenu, citiesJson;

// declaring all the variables that need to be filled with weather info
let sTemp,icon,sky, current, low, high, feelsLike, vis, km, humidity,percent,airP,hPa,wind,degree,windSpeed;





// ----------------------populate the drop down with cities. 
function popDrop(data){
    citiesJson = JSON.stringify(data);
    let cityListItem = JSON.parse(citiesJson);
    // ---itterates through the cities json file
    cityListItem.data.cities.forEach((e, index) => {
        // console.log(`${e.name}, ${e.province}`);
        // creates a new option for the drop down on every itteration. storing the index of the city as the value.
        let dropCity = document.createElement("option");
        dropCity.value = index;
        dropCity.textContent = `${e.name}, ${e.province}`;
        dropDownMenu.appendChild(dropCity);
    });
}

function getWeather(){
    
    
    // hooking up all the variables to be filled with JSON data to the HTML DOM elements 
    sTemp = document.getElementById("s-temp");
    icon = document.getElementById("icon");
    sky = document.getElementById("sky");
    current = document.getElementById("current");
    low = document.getElementById("low");
    high = document.getElementById("high");
    feelsLike = document.getElementById("feelsLike");
    vis = document.getElementById("s-vis");
    km = document.getElementById("km");
    humidity = document.getElementById("s-humid");
    percent = document.getElementById("percent");
    airP = document.getElementById("airP");
    hPa = document.getElementById("hPa");
    wind = document.getElementById("wind");
    degree = document.getElementById("degree");
    windSpeed= document.getElementById("windSpeed");

    
    
    //  grabs the value of the selected city
    let optionSelected = dropDownMenu.options[dropDownMenu.selectedIndex];
    let optionHtml = optionSelected.innerHTML;

    // stripping the province name from the selected info then using it to get the weather info from API
    let locationArray = optionHtml.split(",");
    let cityName = locationArray[0].trim();
    const WEATHER_JSON =`https://api.openweathermap.org/data/2.5/weather?q=${cityName},CA&appid=c62569daba1249f5420a17b2f0030224&units=metric`;
    getJSONData(WEATHER_JSON, e=>{  
        console.log(e);
        let weatherJson = JSON.stringify(e);
        let weatherparsed = JSON.parse(weatherJson);
        //----check to see if city exists
        if (weatherparsed.cod == "404"){
            // alert(`${weatherparsed.message}`);
            document.getElementById("location").innerHTML = `${weatherparsed.message}`;
        }else{
            current.innerHTML = `Current&nbsp; ${weatherparsed.main.temp}&deg;C`;
            low.innerHTML = `Low&nbsp; ${weatherparsed.main.temp_min}&deg;C `;
            high.innerHTML = `high&nbsp; ${weatherparsed.main.temp_max}&deg;C `;
            feelsLike.innerHTML = `Feels Like&nbsp; ${weatherparsed.main.feels_like}&deg;C &nbsp;`;
            sky.innerHTML = `${weatherparsed.weather[0].description.toUpperCase()}`;
            km.innerHTML = `${weatherparsed.visibility} &nbsp; KM`;
            percent.innerHTML = `${weatherparsed.main.humidity} &nbsp; %`;
            hPa.innerHTML = `${weatherparsed.main.pressure} &nbsp; hPa`;
            degree.innerHTML = `${weatherparsed.wind.deg}&deg;`;
            windSpeed.innerHTML = `${weatherparsed.wind.speed}&nbsp; km/h`;





            
            console.log("the city info is there");
        }
        console.log(weatherparsed);

        
    },onError);
    
    //setting the inner HTML of the div displaying the selected city
    document.getElementById("location").innerHTML= optionHtml;
    

    
    console.log(optionHtml);
}



function onError(e){
    console.log("*** Error has occurred during AJAX data retrival");
}

function main(){
    
    dropDownMenu = document.getElementById("s-drop-down-menu");

 


    document.addEventListener("DOMContentLoaded", getJSONData(CITY_LIST,popDrop, onError));
    dropDownMenu.addEventListener("change", e=>{
        if (e.target.id === "s-drop-down-menu"){
            getWeather();
        }
    });
    // let scName = selectedCity.querySelector("div:nth-child(3)");
    // console.log(scName);


    
    

//     getJSONData(CITY_LIST,popDrop, onError);
}
main();
