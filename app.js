const apiKey = "bd5e378503939ddaee76f12ad7a97608";

async function fetchWeather(city = "Istanbul") {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();

    
    document.getElementById("cityName").textContent = `${data.name} 📍`;

   
    const now = new Date();
    const dateOptions = { day: 'numeric', month: 'short', weekday: 'short' };
    document.getElementById("date").textContent = now.toLocaleDateString('tr-TR', dateOptions);

    document.getElementById("temp").textContent = Math.round(data.main.temp);
    document.getElementById("humidity").textContent = data.main.humidity + "%";
    document.getElementById("visibility").textContent = (data.visibility / 1000).toFixed(1) + "km";
    document.getElementById("pressure").textContent = data.main.pressure + "hPa";
    document.getElementById("wind").textContent = data.wind.speed + " m/s";
    document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    document.getElementById("feels_like").textContent = Math.round(data.main.feels_like);
document.getElementById("temp_min").textContent = Math.round(data.main.temp_min);
document.getElementById("temp_max").textContent = Math.round(data.main.temp_max);

const sunriseTime = new Date(data.sys.sunrise * 1000);
const sunsetTime = new Date(data.sys.sunset * 1000);
document.getElementById("sunrise").textContent = sunriseTime.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
document.getElementById("sunset").textContent = sunsetTime.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

  } catch (error) {
    console.error("HATA!!!:", error);
  }
}


document.getElementById("searchInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    fetchWeather(event.target.value);
  }
});


fetchWeather();
