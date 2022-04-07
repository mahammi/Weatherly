const key = "eabfde39a035c674d3d35dfcda3180be"
const weatherInfo = document.querySelector(".weather-info");
const searchButton = document.querySelector("button");

const getWeather = () => {
    let userEntry = document.querySelector("input").value.toLowerCase();
    let weatherData = {
        url:`https://api.openweathermap.org/data/2.5/weather?q=${userEntry}&appid=${key}`,
    }

    fetch(weatherData.url)
        .then((data)=>data.json())
        .then((data)=>displayData(data))
        .catch(()=>errorMessage());

    function errorMessage(){
        weatherInfo.innerHTML = `<h2>The city "${userEntry}" could not be found. Please try again!<h2>`;
    }
}

const updateIcon = (data) => {
    let weatherID = data.weather[0].main;

    switch(weatherID){
        case 'Thunderstorm':
            document.body.style.backgroundImage = "url('/images/thunderstorm.jpg')";
            document.querySelector(".icon").src ="/icons/thunderstorm.png";
            break;
        case 'Drizzle':
        case 'Rain':
            document.body.style.backgroundImage = "url('/images/rain.jpg')";
            document.querySelector(".icon").src ="/icons/rain.png";
            break;
        case 'Snow':
            document.body.style.backgroundImage = "url('/images/snow.jpg')";
            document.querySelector(".icon").src ="/icons/snow.png";
            break;
        case 'Mist':
        case 'Smoke':
        case 'Haze':
        case 'Fog':
        case 'Sand':
        case 'Ash':
        case 'Squall':
        case 'Tornado':
            document.body.style.backgroundImage = "url('/images/atmospheric.jpg')";
            document.querySelector(".icon").src ="/icons/atmosphere.png";
            break;
        case 'Clear':
            document.body.style.backgroundImage = "url('/images/clear.jpg')";
            document.querySelector(".icon").src ="/icons/clear.png";
            break;
        case 'Clouds':
            document.body.style.backgroundImage = "url('/images/cloud.jpg')";
            document.querySelector(".icon").src ="/icons/cloudy.png";
            break;
        default:
            document.body.style.backgroundImage = "url('/images/clear.jpg')";
            break;
    }
}

const displayData = (data) =>{
    console.log(data);
    let condition = data.weather[0].main;
    let temp = Math.round(data.main.temp - 273.15); 
    updateIcon(data);
    weatherInfo.innerHTML = `<h1>${data.name}, ${data.sys.country}<h1>
                                <h2>${temp}°C</h2>
                                <h2>${condition}</h2>`
}

searchButton.addEventListener("click", getWeather);
