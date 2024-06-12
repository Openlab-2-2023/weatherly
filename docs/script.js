//Loading Screen

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    document.getElementById("loading-screen").style.display = "none";
    document.getElementById("content").style.display = "block";
  }, 200);
});

//Hodiny (Navbar)

function updateClock() {
  const now = new Date();
  const options = {
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const formattedDate = now.toLocaleDateString("en-US", options).replace(",", "");

  document.getElementById("clock").textContent = formattedDate;
}

setInterval(updateClock, 1000);
updateClock();

// Funkcia na načítanie a aktualizáciu údajov o počasí pre dané mesto
async function fetchAndUpdateWeatherData(city) {
  try {
    const apiKey = "a5e9e2ff64c04ebf84761702242805";
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
    const data = await response.json();

    // Aktualizujte HTML s novými údajmi o počasí
    document.getElementById("CurentCityName").textContent = `${data.location.name}, ${data.location.country}`;
    document.getElementById("CurentTemp").textContent = `${data.current.temp_c}°C`;
    document.getElementById("CurentWeather").textContent = `${data.current.condition.text}`;
    document.getElementById("CurentIcon").src = `${data.current.condition.icon}`;
    document.getElementById("uvIndicator").textContent = `${data.current.uv}`;
    document.getElementById("windIndicator").textContent = `${data.current.wind_kph} kph`;
    document.getElementById("pressureIndicator").textContent = `${data.current.pressure_mb} hPa`;
    document.getElementById("humidityIndicator").textContent = `${data.current.humidity}%`;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

document.querySelector(".search-button").addEventListener("click", async () => {
  const cityName = document.querySelector(".search-input").value;
  document.querySelector(".search-input").value = "";
  await fetchAndUpdateWeatherData(cityName);
});

// Povolenie pre pristup polohy:
navigator.geolocation.getCurrentPosition(async (position) => {
  const { latitude, longitude } = position.coords;
  // Skladanie a zasielanie HTTPS requestu pre data do API:
  const apiKey = "a5e9e2ff64c04ebf84761702242805";
  const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`);
  const data = await response.json();
  const response1 = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=3`
  );
  const data1 = await response1.json();

  // Vyberanie dat z toho .json suboru:
  const temperature = data.current.temp_c;
  document.getElementById("CurentTemp").textContent = ` ${temperature}°C`;

  const CityName = data.location.name;
  const Country = data.location.country;
  document.getElementById("CurentCityName").textContent = ` ${CityName}, ${Country}`;
  const CurentWeather = data.current.condition.text;
  document.getElementById("CurentWeather").textContent = ` ${CurentWeather}`;
  const IconCurent = data.current.condition.icon;
  document.getElementById("CurentIcon").src = ` ${IconCurent}`;
  const UvIndicator = data.current.uv;
  document.getElementById("uvIndicator").textContent = ` ${UvIndicator}`;
  const windIndicator = data.current.wind_kph;
  document.getElementById("windIndicator").textContent = ` ${windIndicator}kph`;
  const pressureIndicator = data.current.pressure_mb;
  document.getElementById("pressureIndicator").textContent = ` ${pressureIndicator}hPa`;
  const humidityIndicator = data.current.humidity;
  document.getElementById("humidityIndicator").textContent = ` ${humidityIndicator}%`;
  const weatherfure1 = data1.forecast.forecastday.date;
  document.getElementsByClassName("HourTime").textContent = ` ${weatherfure1}`;

  ////////////////////////////////////////////////////////////////

  try {
    // Vezmeme vsetky hodinove hodnoty co maju byt dnes
    const hourlyData = data1.forecast.forecastday[0].hour;

    // Momentalna hodina
    const currentTime = new Date().getHours();

    // Zfiltrujeme hodnoty podla toho, aka hodina je a ktore ostavaju z dna
    const filteredHourlyData = hourlyData.filter((hour) => {
      const hourTime = parseInt(hour.time.split(" ")[1].split(":")[0]);
      return hourTime >= currentTime && hourTime < currentTime + 8;
    });

    const hourlyForecastContainer = document.getElementById("hourly-forecast-container");

    // Vytvorime HTML Hodnoty pre boxy pomocou cyklu
    filteredHourlyData.forEach((hour, index) => {
      const time = hour.time.split(" ")[1]; // Zoberieme iba cas, bez datumu
      const icon = hour.condition.icon.replace("/images/");
      const tempC = hour.temp_c;

      // Zadanie hodnot do boxu
      const hourBox = document.createElement("div");
      hourBox.className = "hour-box";

      hourBox.innerHTML = `
        <p class="HourTime">${time}</p>
        <img src="${icon}" class="IconHourIcon" />
        <p class="iconHourTemp">${tempC}℃</p>
      `;

      // Odoslanie boxov do HTML
      hourlyForecastContainer.appendChild(hourBox);
    });
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
});

try {
  const dailyData = data1.forecast.forecastday;
} catch (error) {
  console.error("Error fetching weather data:", error);
}
