async function getUrlEndpoint() {
    const response = await fetch("http://localhost:3000/villes");
    const action = await response.json();

    afficherVilles (action);
}
   const cetiesSelect= document.getElementById("Region");
 function afficherVilles (villes) {
   
    // 2. Then run your loop for the rest of the cities from the database
    for (let i = 0; i < villes.length; i++) {
        const article = villes[i];
        const option = document.createElement("option");
        option.value = article.id;
        option.textContent = article.nom;
        cetiesSelect.appendChild(option);
    }

    if (villes.length > 0){
      getWeatherData(villes[0]);
    }

    cetiesSelect.addEventListener("change", async function(event) {
      const selectionChanges = villes.find(v => v.id === event.target.value);
      
      getWeatherData(selectionChanges)   
   });
 }

   

 async function getWeatherData (ville) {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${ville.lat}&longitude=${ville.lon}&current_weather=true`);
      const data = await response.json();

     
     showWeather(ville, data);
     
     console.log(data);
   }


   function showWeather (position, weather) {
      const location = document.querySelector(".locationText");
      location.innerHTML = "";
      const createLocation = document.createElement("p");
      createLocation.innerText = `${position.nom}`;
      location.appendChild(createLocation);

       const temperature = document.querySelector(".temperatureText");
       temperature.innerHTML= "";
       const createTemperature = document.createElement("p");
       createTemperature.innerText = `${weather.current_weather.temperature} ${weather.current_weather_units.temperature}`;
       temperature.appendChild(createTemperature);    
       
       const wind = document.querySelector(".windText");
       wind.innerHTML= "";
       const createWind = document.createElement("p");
       createWind.innerText = `${weather.current_weather.windspeed} ${weather.current_weather_units.windspeed}`;
       wind.appendChild(createWind);

        const coordination = document.querySelector(".coordinationText");
        coordination.innerHTML= "";
       const createCoordination = document.createElement("p");
       createCoordination.innerText = `${weather.timezone} `;
       coordination.appendChild(createCoordination);

   }

getUrlEndpoint();