import { apiKey } from "./apikey.js";

const key = apiKey();
const villeInput = document.querySelector("#villeInput");
document.addEventListener("change", chercherVille);

function chercherVille() {
  let city = document.getElementById("villeInput").value;
  if (city.length > 0) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric&lang=fr`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let icone = "";
        switch (data.weather[0].main) {
          case "Rain":
            icone = "rainy";
            break;
          case "Snow":
            icone = "cloudy_snowing";
            break;
          case "Clouds":
            icone = "cloud";
            break;
          default:
            icone = "sunny";
            break;
        }
        const iconeDiv = document.querySelector("#icone");
        iconeDiv.children[0].textContent = icone;

        const nameDiv = document.querySelector("#cityName");
        nameDiv.textContent = data.name;

        const nameDiv2 = document.querySelector("#city2");
        nameDiv2.textContent = data.name + "," + data.sys.country;
        const lon = document.querySelector("#lon");
        lon.textContent = data.coord.lon;
        const lat = document.querySelector("#lat");
        lat.textContent = data.coord.lat;
        const temp = document.querySelector("#temp");
        temp.textContent = data.main.temp;
        const ressenti = document.querySelector("#ressenti");
        ressenti.textContent = data.main.feels_like;
      })
      .catch((error) => {
        console.error("Lerreur est : \n" + error);
      });
  }
}
