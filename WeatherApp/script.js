function login() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    if (username === "admin" && password === "1234") { 
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('weather-app').style.display = 'block';
    } else {
        alert("Invalid username or password!");
    }
}

async function updateWeather() {
    let location = document.getElementById("location-input").value;
    let apiKey = "4bfafed8a53dd6ac18047d2095a85fd7";  // Replace with your actual API key - 51cbbf3b388c2b7c667ccef0c7c35be9
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        if (data.cod !== 200) {  
            alert(`Error: ${data.message}`);
            return;
        }

        // Get country flag
        let countryCode = data.sys.country.toLowerCase();
        let countryFlag = `https://flagcdn.com/w40/${countryCode}.png`;

        // Update UI
        document.querySelector(".weather-city").innerHTML = `${data.name}, ${data.sys.country} <img src="${countryFlag}" width="40" height="30">`;
        document.querySelector(".weather-temp").textContent = `${data.main.temp}°C`;
        document.querySelector(".weather-desc").textContent = data.weather[0].description;
        document.querySelector(".weather-wind").textContent = `Wind: ${data.wind.speed} km/h`;
    } catch (error) {
        alert("Network error! Please check your internet connection.");
    }
}

function updateDate() {
    let today = new Date();
    let options = { weekday: "long", month: "long", day: "numeric" };
    document.querySelector(".date-dayname").textContent = today.toLocaleDateString("en-US", options);
}
