// importing the sass stylesheet for bundling
import "./../sass/styles.scss";
import { getJSONData } from "./Toolkit";

const CITY_LIST ="http://localhost:3000/cities.json";
let dropDownMenu;

function popDrop(data){
    let citiesJson = JSON.stringify(data);
    let cityListItem = JSON.parse(citiesJson);
    // console.log(cityListItem.data.cities[3].province);
    cityListItem.data.cities.forEach(e => {
        console.log(`${e.name}, ${e.province}`);
        let dropCity = document.createElement("option");
        dropCity.className = "g-drop-city";
        dropCity.textContent = `${e.name}, ${e.province}`;
        dropDownMenu.appendChild(dropCity);
    });
 
    // console.log(cityListItem.data.cities.length);
    //     let dropCity = document.createElement("div");
    //     dropCity.className = "s-drop_city";
    //     dropCity.innerHTML = `${cityListItem.data.cities[i].name}, ${cityListItem.data.cities[i].province}`;
    //     document.dropDownMenu.appendChild(dropCity);
    // }


}




function onError(e){
    console.log("*** Error has occurred during AJAX data retrival");
}

function main(){
    dropDownMenu = document.getElementById("s-drop-down-menu");

    document.addEventListener("DOMContentLoaded", getJSONData(CITY_LIST,popDrop, onError));

//     getJSONData(CITY_LIST,popDrop, onError);
}
main();
