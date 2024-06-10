// Povolenie pre pristup polohy:
navigator.geolocation.getCurrentPosition(async (position) => {
  const { latitude, longitude } = position.coords;
  // Skladanie a zasielanie HTTPS requestu pre data do API:
  const apiKey = "a5e9e2ff64c04ebf84761702242805";
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`
  );
  const data = await response.json();
  const response1 = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=3`
  );
  const data1 = await response1.json();

  // Vyberanie dat z toho .json suboru:
  const temperature = data.current.temp_c;
  document.getElementById("CurentTemp").textContent = ` ${temperature}°C`;

  const CityName = data.location.name;
  document.getElementById("CurentCityName").textContent = ` ${CityName}`;

  const CurentWeather = data.current.condition.text;
  document.getElementById("CurentWeather").textContent = ` ${CurentWeather}`;

  const IconCurent = data.current.condition.icon;
  document.getElementById("CurentIcon").src = ` ${IconCurent}`;

  const UvIndicator = data.current.uv;
  document.getElementById("uvIndicator").textContent = ` ${UvIndicator}`;

  const windIndicator = data.current.wind_kph;
  document.getElementById("windIndicator").textContent = ` ${windIndicator}`;

  const pressureIndicator = data.current.pressure_mb;
  document.getElementById(
    "pressureIndicator"
  ).textContent = ` ${pressureIndicator}hPa`;

  const humidityIndicator = data.current.humidity;
  document.getElementById(
    "humidityIndicator"
  ).textContent = ` ${humidityIndicator}`;

  const weatherfure1 = data1.forecast.forecastday.date;
  document.getElementsByClassName("HourTime").textContent = ` ${weatherfure1}`;

  try {
    // Vezmeme vsetky hodinove hodnoty co maju byt dnes
    const hourlyData = data1.forecast.forecastday[0].hour;

    // Momentalna hodina
    const currentTime = new Date().getHours();

    // Zfiltrujeme hodnoty podla toho, aka hodina je a ktore ostavaju z dna
    const filteredHourlyData = hourlyData.filter(hour => {
      const hourTime = parseInt(hour.time.split(' ')[1].split(':')[0]);
      return hourTime >= currentTime && hourTime < currentTime + 8; 
    });

    const hourlyForecastContainer = document.getElementById('hourly-forecast-container');

    // Vytvorime HTML Hodnoty pre boxy pomocou cyklu
    filteredHourlyData.forEach((hour, index) => {
      const time = hour.time.split(' ')[1]; // Zoberieme iba cas, bez datumu
      const icon = hour.condition.icon.replace('/images/');
      const tempC = hour.temp_c;

      // Zadanie hodnot do boxu
      const hourBox = document.createElement('div');
      hourBox.className = 'hour-box';

      hourBox.innerHTML = `
        <p class="HourTime">${time}</p>
        <img src="${icon}" class="IconHourIcon" />
        <p class="iconHourTemp">${tempC}℃</p>
      `;

      // Odoslanie boxov do HTML
      hourlyForecastContainer.appendChild(hourBox);
    });
    
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
});