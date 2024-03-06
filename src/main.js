// importing the sass stylesheet for bundling
import "./../sass/styles.scss";
import { getJSONData } from "./Toolkit";
import "./../css/weather-icons.min.css";
import "./../css/weather-icons-wind.min.css";

import { Spinner } from "spin.js";
import "spin.js/spin.css";

const CITY_LIST ="http://localhost:3000/cities.json";
// variables to do the dropdown menu work. 
let dropDownMenu, citiesJson;

// declaring all the variables that need to be filled with weather info
let icon,sky, current, low, high, feelsLike, km, percent,hPa,wind,degree,windSpeed, location;
let city;
let loadingOverlay;
let spinner = new Spinner({ color: "#FFFFFF", lines: 12 }).spin(document.querySelector(".g-loading-overlay"));




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
    // turn off initial loading overlay
    loadingOverlay.style.display = "none";
}
    
function grabUserSelect(){
    //  grabs the value of the city selected by user
    let optionSelected = dropDownMenu.options[dropDownMenu.selectedIndex];
    let optionHtml = optionSelected.innerHTML;
    // stripping the province name from the selected info then using it to get the weather info from API
    let locationArray = optionHtml.split(",");
    let cityName = locationArray[0].trim();
    location.innerHTML = optionSelected.innerHTML;
    // save user selection to local storage
    window.localStorage.setItem("location",locationArray);
    
    return cityName;

}

function displayWeather(city){
    
    const WEATHER_JSON =`https://api.openweathermap.org/data/2.5/weather?q=${city},CA&appid=c62569daba1249f5420a17b2f0030224&units=metric`;

    getJSONData(WEATHER_JSON, e=>{  
        let weatherJson = JSON.stringify(e);
        let weatherparsed = JSON.parse(weatherJson);
        //----check to see if city data exists
        if (weatherparsed.cod == "404"){
            alert(`${weatherparsed.message}`);
            document.getElementById("sky").innerHTML= `${weatherparsed.message}`;
            document.getElementById("location").innerHTML = `${weatherparsed.message}`;
            document.getElementById("s-weather-details").style.display = "none";
            icon.innerHTML = "";
        }else{
            //setting all the weather infor of the city selected
            document.getElementById("s-weather-details").style.display = "flex";
            current.innerHTML = `Current&nbsp; ${weatherparsed.main.temp}&deg;C`;
            low.innerHTML = `Low&nbsp; ${weatherparsed.main.temp_min}&deg;C `;
            high.innerHTML = `high&nbsp; ${weatherparsed.main.temp_max}&deg;C `;
            feelsLike.innerHTML = `Feels Like&nbsp; ${weatherparsed.main.feels_like}&deg;C &nbsp;`;
            sky.innerHTML = `${weatherparsed.weather[0].description.toUpperCase()}`;
            km.innerHTML = `${weatherparsed.visibility / 1000} &nbsp; KM`;
            percent.innerHTML = `${weatherparsed.main.humidity} &nbsp;%`;
            hPa.innerHTML = `${weatherparsed.main.pressure} &nbsp; hPa`;
            degree.innerHTML =`${weatherparsed.wind.deg}&deg;`;
            windSpeed.innerHTML =`${weatherparsed.wind.speed} km/hr`;

            // setting the wind and main weather icons to reflect the chosen weather conditions
            wind.innerHTML =` <i class="wi wi-wind towards-${weatherparsed.wind.deg}-deg"></i> Wind`;
            icon.innerHTML =`<i class="wi wi-owm-${weatherparsed.weather[0].id}"></i>`;
            

            //changes the color of the text back to black after loaded;
            document.querySelector("body").style.color = "black";
        


        }

        
    },onError);
    
}



function onError(e){
    console.log("*** Error has occurred during AJAX data retrival");
}

function main(){
    
    // hooking up all the variables to be filled with JSON data to the HTML DOM elements 
    icon = document.getElementById("icon");
    sky = document.getElementById("sky");
    current = document.getElementById("current");
    low = document.getElementById("low");
    high = document.getElementById("high");
    feelsLike = document.getElementById("feelsLike");
    km = document.getElementById("km");
    percent = document.getElementById("percent");
    hPa = document.getElementById("hPa");
    wind = document.getElementById("windTitle");
    degree = document.getElementById("degree");
    windSpeed= document.getElementById("windSpeed");
    location = document.getElementById("location");

    loadingOverlay = document.querySelector(".g-loading-overlay");
    dropDownMenu = document.getElementById("s-drop-down-menu");

    document.addEventListener("DOMContentLoaded", function(){
        // check local storage to see if there is a city saved
        if (localStorage.getItem("location") == null){
            city = "notfound";
            displayWeather(city);
        } else {
            // if there is a city in local storage display the name and province and pass the city to display weather
            let SavedCity = localStorage.getItem("location");
            let justTheCity = SavedCity.split(",");
            city = justTheCity[0].trim("");  
            location.innerHTML = SavedCity;
            displayWeather(city);
        }
        getJSONData(CITY_LIST,popDrop, onError);
    }
    );

    // event listener for when user selects a city 
    dropDownMenu.addEventListener("change", e=>{
        if (e.target.id === "s-drop-down-menu"){
            // grey out text when drop down option changed
            document.querySelector("body").style.color = "grey";
            city = grabUserSelect();
            displayWeather(city);       
        }
        
    });
}
main();
