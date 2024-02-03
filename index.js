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
      })
      .catch((error) => {
        console.error("Lerreur est : \n" + error);
      });
  }
}
