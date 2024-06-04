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
});
